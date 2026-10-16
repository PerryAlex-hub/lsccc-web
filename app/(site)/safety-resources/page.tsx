import { getSafetyResources } from "@/lib/cms/public";
import { getPageMetadata } from "@/lib/cms/public";
import type { Metadata } from "next";
import { InteriorPage } from "@/components/ui/interior-page";
import { ResourceExplorer } from "@/components/safety/resource-explorer";
import {
  FeaturedSafetyGuide,
  OfficialSafetyInformation,
} from "@/components/safety/sections";

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("/safety-resources");
}

export default async function SafetyResourcesPage() {
  return (
    <InteriorPage
      image="responderTraining"
      cmsPath="/safety-resources"
      title="Safety Resources"
      description="Find public safety topics and practical information for your household, workplace and community."
      breadcrumbs={[{ label: "Safety Resources" }]}
      nodeId="19:235"
    >
      <ResourceExplorer resources={await getSafetyResources()}>
        <FeaturedSafetyGuide />
      </ResourceExplorer>
      <OfficialSafetyInformation />
    </InteriorPage>
  );
}
