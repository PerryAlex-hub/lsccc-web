import { getPageMetadata } from "@/lib/cms/public";
import type { Metadata } from "next";
import { InteriorPage } from "@/components/ui/interior-page";
import {
  EmergencyPriority,
  ContactEnquiries,
  ContactRoutes,
} from "@/components/contact/sections";

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("/contact");
}

export default function ContactPage() {
  return (
    <InteriorPage
      image="operations"
      cmsPath="/contact"
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
