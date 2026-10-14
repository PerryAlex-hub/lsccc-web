import { randomBytes, createHash, scrypt, timingSafeEqual } from "node:crypto";

const parameters = { N: 131072, r: 8, p: 1, maxmem: 256 * 1024 * 1024 };
let activeDerivations = 0;

function derive(password: string, salt: string) {
  if (activeDerivations >= 2) {
    return Promise.reject(new Error("Password processing is busy. Try again."));
  }
  activeDerivations++;
  return new Promise<Buffer>((resolve, reject) => {
    scrypt(password, salt, 64, parameters, (error, key) => {
      activeDerivations--;
      if (error) {
        reject(error);
      } else {
        resolve(key);
      }
    });
  });
}

export async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const key = await derive(password, salt);
  return `scrypt$131072$8$1$${salt}$${key.toString("hex")}`;
}

export async function verifyPassword(password: string, encoded: string) {
  const match = /^scrypt\$131072\$8\$1\$([a-f0-9]{32})\$([a-f0-9]{128})$/.exec(
    encoded,
  );
  // Perform the same expensive operation for nonexistent accounts.
  const salt = match?.[1] || "00000000000000000000000000000000";
  const actual = await derive(password, salt);
  const expected = Buffer.from(match?.[2] || "0".repeat(128), "hex");
  return timingSafeEqual(actual, expected) && !!match;
}

export function createToken() {
  return randomBytes(32).toString("base64url");
}

export function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export function isToken(token: unknown): token is string {
  return typeof token === "string" && /^[A-Za-z0-9_-]{43}$/.test(token);
}
