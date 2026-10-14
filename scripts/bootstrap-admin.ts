import { loadEnvConfig } from "@next/env";
import { createDatabaseClient } from "../lib/db/client";
import { hashPassword } from "../lib/auth/crypto";
import {
  normalizedEmail,
  validName,
  validPassword,
} from "../lib/auth/validation";

loadEnvConfig(process.cwd());

async function bootstrap() {
  const email = normalizedEmail(process.env.BOOTSTRAP_ADMIN_EMAIL);
  const name = process.env.BOOTSTRAP_ADMIN_NAME;
  const password = process.env.BOOTSTRAP_ADMIN_PASSWORD;
  if (!email || !validName(name) || !validPassword(password)) {
    throw new Error(
      "Configure the private bootstrap name, email and a 15–128 character password.",
    );
  }
  const database = createDatabaseClient();
  try {
    const passwordHash = await hashPassword(password);
    await database.$transaction(async (tx) => {
      await tx.$executeRaw`SELECT pg_advisory_xact_lock(48392017)`;
      if (await tx.user.count()) {
        throw new Error("Bootstrap is disabled once a staff account exists.");
      }
      await tx.user.create({
        data: { name: name.trim(), email, passwordHash, role: "ADMINISTRATOR" },
      });
    });
    console.log(
      "Initial administrator created. Remove the bootstrap variables from the private environment file.",
    );
  } finally {
    await database.$disconnect();
  }
}

bootstrap().catch(() => {
  console.error(
    "Bootstrap failed: check private setup values and ensure no staff account already exists. Credentials were not printed.",
  );
  process.exitCode = 1;
});
