import "server-only";
import {
  createMailTransport,
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
  const transport = createMailTransport();
  try {
    const result = await transport.sendMail({
      from: process.env.AUTH_FROM_EMAIL,
      to: email,
      subject,
      text,
    });
    if (!result.accepted.length || result.rejected.length) {
      throw new Error("Email was not accepted.");
    }
  } finally {
    transport.close();
  }
}
