import "server-only";
import { prisma } from "../db/prisma";
import {
  hashPassword,
  verifyPassword,
  createToken,
  hashToken,
  isToken,
} from "./crypto";
import { normalizedEmail, validName, validPassword } from "./validation";
import { AuthError } from "./errors";
import { rateLimit } from "./rate-limit";
import { startSession } from "./session";
import { authEmailConfigured, authLink, sendAuthEmail } from "./email";
import { getEmailBrand } from "../email/brand";
import { passwordResetEmail } from "../email/templates";

export async function login(input: Record<string, unknown>) {
  const email = normalizedEmail(input.email);
  const password = input.password;
  if (
    !email ||
    typeof password !== "string" ||
    !password.length ||
    password.length > 128
  ) {
    throw new AuthError(422, "Enter your email and password.");
  }
  await rateLimit("login-global", "all", 300);
  await rateLimit("login-account", email, 10);
  const user = await prisma.user.findUnique({ where: { email } });
  const matches = await verifyPassword(password, user?.passwordHash || "");
  if (!matches || !user || user.status !== "ACTIVE") {
    throw new AuthError(401, "The email or password is incorrect.");
  }
  // Recheck under the same user-row lock used by deactivation/password reset.
  await prisma.$transaction(async (tx) => {
    await tx.$queryRaw`SELECT "id" FROM "User" WHERE "id" = ${user.id}::uuid FOR UPDATE`;
    const current = await tx.user.findUnique({ where: { id: user.id } });
    if (
      !current ||
      current.status !== "ACTIVE" ||
      current.passwordHash !== user.passwordHash
    ) {
      throw new AuthError(401, "The email or password is incorrect.");
    }
    await startSession(user.id, tx);
  });
  return { message: "Logged in." };
}

export async function invitationDetails(token: unknown) {
  if (!isToken(token)) {
    return { state: "invalid" };
  }
  const invitation = await prisma.invitation.findUnique({
    where: { tokenHash: hashToken(token) },
  });
  if (!invitation || invitation.revokedAt) {
    return { state: "invalid" };
  }
  if (invitation.acceptedAt) {
    return { state: "used" };
  }
  if (invitation.expiresAt <= new Date()) {
    return { state: "expired" };
  }
  return { state: "valid", email: invitation.email, role: invitation.role };
}

export async function acceptInvitation(input: Record<string, unknown>) {
  if (
    !isToken(input.token) ||
    !validName(input.name) ||
    !validPassword(input.password) ||
    input.password !== input.confirmation
  ) {
    throw new AuthError(
      422,
      "Enter your name and matching passwords of 15–128 characters.",
    );
  }
  await rateLimit("invitation-accept", input.token, 5);
  const tokenHash = hashToken(input.token);
  const passwordHash = await hashPassword(input.password);
  await prisma.$transaction(async (tx) => {
    await tx.$executeRaw`SELECT pg_advisory_xact_lock(48392017)`;
    await tx.$queryRaw`SELECT "id" FROM "Invitation" WHERE "tokenHash" = ${tokenHash} FOR UPDATE`;
    const invitation = await tx.invitation.findUnique({ where: { tokenHash } });
    if (
      !invitation ||
      invitation.acceptedAt ||
      invitation.revokedAt ||
      invitation.expiresAt <= new Date()
    ) {
      throw new AuthError(410, "This invitation is no longer available.");
    }
    const existing = await tx.user.findUnique({
      where: { email: invitation.email },
    });
    if (existing) {
      throw new AuthError(
        409,
        "An account already exists for this email. Please log in or reset its password.",
      );
    }
    const user = await tx.user.create({
      data: {
        name: (input.name as string).trim(),
        email: invitation.email,
        role: invitation.role,
        passwordHash,
      },
    });
    await tx.invitation.update({
      where: { id: invitation.id },
      data: { acceptedAt: new Date(), acceptedById: user.id },
    });
    await tx.auditLog.create({
      data: {
        actorId: user.id,
        action: "invitation.accepted",
        entityType: "User",
        entityId: user.id,
      },
    });
  });
  return { message: "Account created. You can now log in." };
}

export async function requestPasswordReset(input: Record<string, unknown>) {
  const email = normalizedEmail(input.email);
  if (!email) {
    throw new AuthError(422, "Enter a valid email address.");
  }
  await rateLimit("reset-global", "all", 100, 60);
  await rateLimit("reset-account", email, 3, 60);
  if (!authEmailConfigured()) {
    throw new AuthError(
      503,
      "Password recovery email is not configured yet. No email was sent.",
    );
  }
  const user = await prisma.user.findUnique({ where: { email } });
  if (user?.status === "ACTIVE") {
    const token = createToken();
    const link = authLink("/admin/reset-password", token);
    const record = await prisma.$transaction(async (tx) => {
      await tx.passwordResetToken.updateMany({
        where: { userId: user.id, usedAt: null },
        data: { usedAt: new Date() },
      });
      return tx.passwordResetToken.create({
        data: {
          userId: user.id,
          tokenHash: hashToken(token),
          expiresAt: new Date(Date.now() + 30 * 60000),
        },
      });
    });
    try {
      await sendAuthEmail(
        email,
        passwordResetEmail(getEmailBrand(), link, user.name),
      );
    } catch {
      await prisma.passwordResetToken.update({
        where: { id: record.id },
        data: { usedAt: new Date() },
      });
    }
  }
  return {
    message:
      "If an active account matches that email, a password reset link has been requested.",
  };
}

export async function resetDetails(token: unknown) {
  if (!isToken(token)) {
    return { valid: false };
  }
  const record = await prisma.passwordResetToken.findUnique({
    where: { tokenHash: hashToken(token) },
    include: { user: { select: { status: true } } },
  });
  return {
    valid:
      !!record &&
      !record.usedAt &&
      record.expiresAt > new Date() &&
      record.user.status === "ACTIVE",
  };
}

export async function resetPassword(input: Record<string, unknown>) {
  if (
    !isToken(input.token) ||
    !validPassword(input.password) ||
    input.password !== input.confirmation
  ) {
    throw new AuthError(422, "Use matching passwords of 15–128 characters.");
  }
  await rateLimit("reset-complete", input.token, 5);
  const tokenHash = hashToken(input.token);
  const passwordHash = await hashPassword(input.password);
  await prisma.$transaction(async (tx) => {
    const record = await tx.passwordResetToken.findUnique({
      where: { tokenHash },
    });
    if (!record) {
      throw new AuthError(410, "This reset link is no longer available.");
    }
    await tx.$queryRaw`SELECT "id" FROM "User" WHERE "id" = ${record.userId}::uuid FOR UPDATE`;
    const claimed = await tx.passwordResetToken.updateMany({
      where: { id: record.id, usedAt: null, expiresAt: { gt: new Date() } },
      data: { usedAt: new Date() },
    });
    const user = await tx.user.findUnique({ where: { id: record.userId } });
    if (!claimed.count || user?.status !== "ACTIVE") {
      throw new AuthError(410, "This reset link is no longer available.");
    }
    await tx.user.update({ where: { id: user.id }, data: { passwordHash } });
    await tx.session.deleteMany({ where: { userId: user.id } });
    await tx.passwordResetToken.updateMany({
      where: { userId: user.id, usedAt: null },
      data: { usedAt: new Date() },
    });
    await tx.auditLog.create({
      data: {
        actorId: user.id,
        action: "password.reset",
        entityType: "User",
        entityId: user.id,
      },
    });
  });
  return { message: "Password changed. Log in with your new password." };
}
