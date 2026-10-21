import "server-only";
import { prisma } from "../db/prisma";
import { AuthError } from "./errors";
import { normalizedEmail } from "./validation";
import { createToken, hashToken } from "./crypto";
import { authEmailConfigured, authLink, sendAuthEmail } from "./email";
import { rateLimit } from "./rate-limit";
import type { UserRole } from "@prisma/client";
import { getEmailBrand } from "../email/brand";
import { invitationEmail } from "../email/templates";

export async function listTeam() {
  return {
    users: await prisma.user.findMany({
      select: { id: true, name: true, email: true, role: true, status: true },
      orderBy: { createdAt: "asc" },
    }),
    invitations: await prisma.invitation.findMany({
      where: { acceptedAt: null },
      select: {
        id: true,
        email: true,
        role: true,
        expiresAt: true,
        revokedAt: true,
      },
      orderBy: { createdAt: "desc" },
    }),
  };
}

export async function inviteStaff(
  actorId: string,
  input: Record<string, unknown>,
) {
  const email = normalizedEmail(input.email);
  const role = input.role;
  if (!email || (role !== "ADMINISTRATOR" && role !== "EDITOR")) {
    throw new AuthError(422, "Enter a valid email and role.");
  }
  await rateLimit("team-invite", actorId, 20, 60);
  const token = createToken();
  const setupUrl = authLink("/admin/accept-invitation", token);
  await prisma.$transaction(async (tx) => {
    await tx.$executeRaw`SELECT pg_advisory_xact_lock(48392017)`;
    const actor = await tx.user.findUnique({ where: { id: actorId } });
    if (actor?.role !== "ADMINISTRATOR" || actor.status !== "ACTIVE") {
      throw new AuthError(403, "Administrator access is required.");
    }
    if (await tx.user.findUnique({ where: { email } })) {
      throw new AuthError(
        409,
        "This staff account already exists. Manage its access below.",
      );
    }
    const data = {
      email,
      role: role as UserRole,
      inviterId: actorId,
      tokenHash: hashToken(token),
      expiresAt: new Date(Date.now() + 24 * 60 * 60000),
      acceptedAt: null,
      acceptedById: null,
      revokedAt: null,
    };
    const invitation = await tx.invitation.upsert({
      where: { email },
      create: data,
      update: data,
    });
    await tx.auditLog.create({
      data: {
        actorId,
        action: "invitation.created",
        entityType: "Invitation",
        entityId: invitation.id,
      },
    });
  });
  if (!authEmailConfigured()) {
    return {
      message:
        "Invitation created. Email delivery is not configured; no email was sent.",
      setupUrl,
    };
  }
  try {
    await sendAuthEmail(
      email,
      invitationEmail(getEmailBrand(), setupUrl, role),
    );
    return { message: "Invitation email accepted for delivery." };
  } catch {
    return {
      message: "Invitation created, but email delivery failed.",
      setupUrl,
    };
  }
}

export async function changeAccess(
  actorId: string,
  input: Record<string, unknown>,
) {
  if (typeof input.id !== "string" || !/^[a-f0-9-]{36}$/.test(input.id)) {
    throw new AuthError(422, "Select a staff member.");
  }
  await prisma.$transaction(async (tx) => {
    await tx.$executeRaw`SELECT pg_advisory_xact_lock(48392017)`;
    const actor = await tx.user.findUnique({ where: { id: actorId } });
    if (actor?.role !== "ADMINISTRATOR" || actor.status !== "ACTIVE") {
      throw new AuthError(403, "Administrator access is required.");
    }
    if (input.action === "revoke") {
      const invitation = await tx.invitation.updateMany({
        where: { id: input.id as string, acceptedAt: null },
        data: { revokedAt: new Date() },
      });
      if (!invitation.count) {
        throw new AuthError(404, "Invitation is unavailable.");
      }
    } else {
      await tx.$queryRaw`SELECT "id" FROM "User" WHERE "id" = ${input.id as string}::uuid FOR UPDATE`;
      const target = await tx.user.findUnique({
        where: { id: input.id as string },
      });
      if (!target) {
        throw new AuthError(404, "Staff member is unavailable.");
      }
      const role = input.role === undefined ? target.role : input.role;
      const status = input.status === undefined ? target.status : input.status;
      if (
        (role !== "EDITOR" && role !== "ADMINISTRATOR") ||
        (status !== "ACTIVE" && status !== "DEACTIVATED")
      ) {
        throw new AuthError(422, "Choose a valid role and status.");
      }
      if (
        target.role === "ADMINISTRATOR" &&
        target.status === "ACTIVE" &&
        (role !== "ADMINISTRATOR" || status !== "ACTIVE") &&
        (await tx.user.count({
          where: { role: "ADMINISTRATOR", status: "ACTIVE" },
        })) <= 1
      ) {
        throw new AuthError(409, "Keep at least one active administrator.");
      }
      await tx.user.update({
        where: { id: target.id },
        data: { role, status },
      });
      await tx.session.deleteMany({ where: { userId: target.id } });
    }
    await tx.auditLog.create({
      data: {
        actorId,
        action: "access.changed",
        entityType: input.action === "revoke" ? "Invitation" : "User",
        entityId: input.id as string,
      },
    });
  });
  return { message: "Staff access updated." };
}
