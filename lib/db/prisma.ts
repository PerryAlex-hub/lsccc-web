import "server-only";
import type { PrismaClient } from "@prisma/client";
import { createDatabaseClient } from "./client";

const databaseGlobal = globalThis as unknown as {
  lscccPrisma?: PrismaClient;
};

function getClient() {
  databaseGlobal.lscccPrisma ??= createDatabaseClient();
  return databaseGlobal.lscccPrisma;
}

// A Proxy defers connecting until the client is first used, so importing this
// module stays safe during static builds without Neon credentials. Methods are
// bound to the real client so Prisma's internal state isn't looked up on the proxy.
export const prisma = new Proxy({} as PrismaClient, {
  get(_target, property) {
    const client = getClient();
    const value = Reflect.get(client, property, client);
    return typeof value === "function" ? value.bind(client) : value;
  },
});
