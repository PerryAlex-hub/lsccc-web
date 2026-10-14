import "server-only";
import { getDatabase } from "../db/prisma";
import { hashToken } from "./crypto";
import { AuthError } from "./errors";

export async function rateLimit(
  scope: string,
  identity: string,
  limit: number,
  minutes = 15,
) {
  const key = hashToken(`${scope}:${identity}`);
  const expiresAt = new Date(Date.now() + minutes * 60000);
  const rows = await getDatabase().$queryRaw<{ attempts: number }[]>`
    INSERT INTO "RateLimitBucket" ("key", "attempts", "expiresAt") VALUES (${key}, 1, ${expiresAt})
    ON CONFLICT ("key") DO UPDATE SET
      "attempts" = CASE WHEN "RateLimitBucket"."expiresAt" <= NOW() THEN 1 ELSE "RateLimitBucket"."attempts" + 1 END,
      "expiresAt" = CASE WHEN "RateLimitBucket"."expiresAt" <= NOW() THEN EXCLUDED."expiresAt" ELSE "RateLimitBucket"."expiresAt" END
    RETURNING "attempts"`;
  if (rows[0].attempts > limit) {
    throw new AuthError(429, "Too many attempts. Please try again later.");
  }
}
