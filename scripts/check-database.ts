import { loadEnvConfig } from "@next/env";
import { createDatabaseClient } from "../lib/db/client";

loadEnvConfig(process.cwd());

async function check() {
  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL is missing. Add the Neon URL to .env.local.");
    process.exitCode = 1;
    return;
  }
  const database = createDatabaseClient();
  try {
    await database.$queryRaw`SELECT 1`;
    console.log("Neon connection succeeded.");
  } catch {
    console.error(
      "Neon connection failed. Verify the private database configuration.",
    );
    process.exitCode = 1;
  } finally {
    await database.$disconnect();
  }
}

check().catch(() => {
  console.error(
    "Database check could not start. Credentials have not been printed.",
  );
  process.exitCode = 1;
});
