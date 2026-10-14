import { getPageMetadata } from "@/lib/cms/public";
import type { Metadata } from "next";
import { InteriorPage } from "@/components/ui/interior-page";
import {
  AboutOverview,
  AboutMandate,
  AboutOperations,
  AboutPartners,
  AboutManagement,
} from "@/components/about/sections";

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("/about");
}

export default function AboutPage() {
  return (
    <InteriorPage
      cmsPath="/about"
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
