import type { Metadata } from "next";
import { InteriorPage } from "@/components/ui/interior-page";
import {
  AboutOverview,
  AboutMandate,
  AboutOperations,
  AboutPartners,
  AboutManagement,
} from "@/components/about/sections";

export const metadata: Metadata = {
  title: "About the Centre",
  description:
    "Our mandate, management, operations and partner response agencies.",
};

export default function AboutPage() {
  return (
    <InteriorPage
      title="About the Centre"
      description="Our role is to connect emergency communication, response agencies and the people who need help."
      breadcrumbs={[{ label: "About the Centre" }]}
      nodeId="18:67"
    >
      <AboutOverview />
      <AboutMandate />
      <AboutOperations />
      <AboutPartners />
      <AboutManagement />
    </InteriorPage>
  );
}
