import {
  createMailTransport,
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
  const transport = createMailTransport();
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
