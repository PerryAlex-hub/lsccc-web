import "server-only";
import type { EmailBrand } from "./templates";

export function getEmailBrand(): EmailBrand {
  const appUrl = process.env.APP_URL;
  if (!appUrl) {
    throw new Error("APP_URL is not configured.");
  }
  return {
    appUrl,
    logoUrl:
      process.env.EMAIL_LOGO_URL ||
      new URL("/images/lsccc/lsccc-emblem.jpg", appUrl).toString(),
  };
}
