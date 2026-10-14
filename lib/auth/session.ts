import "server-only";
import { cookies } from "next/headers";
import { getDatabase } from "../db/prisma";
import { createToken, hashToken, isToken } from "./crypto";
import { AuthError } from "./errors";
import type { Prisma } from "@prisma/client";

export const sessionCookie =
  process.env.NODE_ENV === "production"
    ? "__Host-lsccc_session"
    : "lsccc_session";
const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};

export async function currentUser() {
  const token = (await cookies()).get(sessionCookie)?.value;
  if (!isToken(token)) {
    return null;
  }
  const session = await getDatabase().session.findUnique({
    where: { tokenHash: hashToken(token) },
    include: { user: true },
  });
  if (
    !session ||
    session.expiresAt <= new Date() ||
    session.user.status !== "ACTIVE"
  ) {
    return null;
  }
  return {
    id: session.user.id,
    name: session.user.name,
    email: session.user.email,
    role: session.user.role,
  };
}

export async function requireUser(administrator = false) {
  const user = await currentUser();
  if (!user) {
    throw new AuthError(401, "Please log in to continue.");
  }
  if (administrator && user.role !== "ADMINISTRATOR") {
    throw new AuthError(403, "Administrator access is required.");
  }
  return user;
}

export async function startSession(
  userId: string,
  database: Prisma.TransactionClient = getDatabase(),
) {
  const token = createToken();
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  await database.session.create({
    data: { userId, tokenHash: hashToken(token), expiresAt },
  });
  (await cookies()).set(sessionCookie, token, {
    ...cookieOptions,
    expires: expiresAt,
  });
}

export async function endSession() {
  const store = await cookies();
  const token = store.get(sessionCookie)?.value;
  if (isToken(token)) {
    await getDatabase().session.deleteMany({
      where: { tokenHash: hashToken(token) },
    });
  }
  store.set(sessionCookie, "", { ...cookieOptions, maxAge: 0 });
}
