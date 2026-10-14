import "server-only";
import {
  sendTransactionalEmail,
  mailTransportConfigured,
} from "../email/transport";

export function authEmailConfigured() {
  return !!process.env.AUTH_FROM_EMAIL && mailTransportConfigured();
}

export function authLink(path: string, token: string) {
  const base = process.env.APP_URL;
  if (!base) {
    throw new Error("APP_URL is not configured.");
  }
  const url = new URL(path, base);
  if (
    url.protocol !== "https:" &&
    !(
      url.protocol === "http:" &&
      ["localhost", "127.0.0.1"].includes(url.hostname)
    )
  ) {
    throw new Error("APP_URL must use HTTPS.");
  }
  url.searchParams.set("token", token);
  return url.toString();
}

export async function sendAuthEmail(
  email: string,
  subject: string,
  text: string,
) {
  if (!authEmailConfigured()) {
    throw new Error("Staff email delivery is not configured.");
  }
  await sendTransactionalEmail({
    from: { email: process.env.AUTH_FROM_EMAIL!, name: "LSCCC administration" },
    to: { email },
    subject,
    text,
  });
}
