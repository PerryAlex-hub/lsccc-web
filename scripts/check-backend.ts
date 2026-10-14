import { loadEnvConfig } from "@next/env";
import { createDatabaseClient } from "../lib/db/client";
import { getStorageConfiguration } from "../lib/storage/client";
import {
  createMailTransport,
  mailTransportConfigured,
} from "../lib/email/transport";

loadEnvConfig(process.cwd());

async function check() {
  let incomplete = false;
  const database = createDatabaseClient();
  try {
    const counts = {
      categories: await database.category.count(),
      articles: await database.newsArticle.count(),
      media: await database.mediaAsset.count(),
      notices: await database.publicNotice.count(),
      resources: await database.safetyResource.count(),
      pages: await database.websitePage.count(),
      settings: await database.siteSettings.count(),
    };
    console.log("Database schema and content:", JSON.stringify(counts));
  } finally {
    await database.$disconnect();
  }
  try {
    getStorageConfiguration();
    console.log("Neon storage settings are present.");
  } catch {
    incomplete = true;
    console.log("Neon storage settings are incomplete.");
  }
  for (const [purpose, keys] of Object.entries({
    authenticationEmail: [
      "AUTH_FROM_EMAIL",
      "SMTP_HOST",
      "SMTP_USER",
      "SMTP_PASSWORD",
    ],
    enquiryEmail: [
      "CONTACT_TO_EMAIL",
      "CONTACT_FROM_EMAIL",
      "SMTP_HOST",
      "SMTP_USER",
      "SMTP_PASSWORD",
    ],
  })) {
    const missing = keys.filter((key) => !process.env[key]);
    if (missing.length) {
      incomplete = true;
      console.log(`${purpose}: missing ${missing.join(", ")}`);
    } else {
      console.log(`${purpose}: configured`);
    }
  }
  if (mailTransportConfigured()) {
    const transport = createMailTransport();
    try {
      await transport.verify();
      console.log(
        "SMTP connection and authentication succeeded. No email was sent.",
      );
    } catch {
      incomplete = true;
      console.log(
        "SMTP verification failed. Check the private email settings.",
      );
    } finally {
      transport.close();
    }
  }
  if (incomplete) {
    process.exitCode = 1;
  }
}

check().catch(() => {
  console.error("Backend check failed. No credentials were printed.");
  process.exitCode = 1;
});
