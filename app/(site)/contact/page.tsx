import type { Metadata } from "next";
import { InteriorPage } from "@/components/ui/interior-page";
import {
  EmergencyPriority,
  ContactEnquiries,
  ContactRoutes,
} from "@/components/contact/sections";

export const metadata: Metadata = {
  title: "Contact & Enquiries",
  description:
    "Find the right route for general enquiries, media requests and government feedback.",
};

export default function ContactPage() {
  return (
    <InteriorPage
      title="Contact & Enquiries"
      description="Find the right route for general enquiries, media requests and government feedback."
      breadcrumbs={[{ label: "Contact" }]}
      nodeId="20:310"
    >
      <EmergencyPriority />
      <ContactEnquiries />
      <ContactRoutes />
    </InteriorPage>
  );
}
