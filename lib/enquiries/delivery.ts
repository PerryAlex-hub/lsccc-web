import nodemailer from "nodemailer";
import type { Enquiry } from "./schema";

export function emailDeliveryConfigured() {
  return Boolean(
    process.env.CONTACT_TO_EMAIL &&
    process.env.CONTACT_FROM_EMAIL &&
    process.env.SMTP_HOST &&
    process.env.SMTP_USER &&
    process.env.SMTP_PASSWORD,
  );
}

export async function deliverEnquiry(enquiry: Enquiry) {
  const port = Number(process.env.SMTP_PORT || 587);
  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    requireTLS: port !== 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
    disableFileAccess: true,
    disableUrlAccess: true,
  });
  const result = await transport.sendMail({
    from: process.env.CONTACT_FROM_EMAIL,
    to: process.env.CONTACT_TO_EMAIL,
    replyTo: { name: enquiry.name, address: enquiry.email },
    subject: `LSCCC enquiry: ${enquiry.subject}`,
    text: [
      `Name: ${enquiry.name}`,
      `Email: ${enquiry.email}`,
      `Topic: ${enquiry.topic}`,
      `Phone: ${enquiry.phone || "Not provided"}`,
      "",
      enquiry.message,
    ].join("\n"),
  });
  if (!result.accepted.length || result.rejected.length) {
    throw new Error("Enquiry delivery was not accepted.");
  }
}
