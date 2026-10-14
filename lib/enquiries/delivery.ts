import {
  sendTransactionalEmail,
  mailTransportConfigured,
} from "../email/transport";
import { enquiryTopics, type Enquiry } from "./schema";
import { getEmailBrand } from "../email/brand";
import { enquiryEmail } from "../email/templates";

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
    ...enquiryEmail(getEmailBrand(), {
      ...enquiry,
      topic:
        enquiryTopics.find((topic) => topic.value === enquiry.topic)?.label ||
        enquiry.topic,
    }),
  });
}
