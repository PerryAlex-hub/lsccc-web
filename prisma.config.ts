import { loadEnvConfig } from "@next/env";
import { defineConfig } from "prisma/config";

// Match Next.js environment loading, including the ignored .env.local file.
loadEnvConfig(process.cwd());

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  // Offline schema validation and generation do not need a database URL.
  datasource: {
    url: process.env.DATABASE_URL ?? "",
  },
});
