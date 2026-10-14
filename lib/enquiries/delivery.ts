import {
  sendTransactionalEmail,
  mailTransportConfigured,
} from "../email/transport";
import type { Enquiry } from "./schema";

export function emailDeliveryConfigured() {
  return Boolean(
    process.env.CONTACT_TO_EMAIL &&
    process.env.CONTACT_FROM_EMAIL &&
    mailTransportConfigured(),
  );
}

export async function deliverEnquiry(enquiry: Enquiry) {
  if (!emailDeliveryConfigured()) {
    throw new Error("Enquiry email delivery is not configured.");
  }
  await sendTransactionalEmail({
    from: { email: process.env.CONTACT_FROM_EMAIL!, name: "LSCCC website" },
    to: { email: process.env.CONTACT_TO_EMAIL! },
    replyTo: { name: enquiry.name, email: enquiry.email },
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
}
