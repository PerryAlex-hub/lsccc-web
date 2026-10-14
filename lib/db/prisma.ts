import "server-only";
import type { PrismaClient } from "@prisma/client";
import { createDatabaseClient } from "./client";

const databaseGlobal = globalThis as unknown as {
  lscccPrisma?: PrismaClient;
};

// Lazy initialization keeps static builds independent of Neon credentials.
export function getDatabase() {
  databaseGlobal.lscccPrisma ??= createDatabaseClient();
  return databaseGlobal.lscccPrisma;
}
