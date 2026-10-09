import type { Metadata } from "next";
import { InteriorPage } from "@/components/ui/interior-page";
import { ResourceExplorer } from "@/components/safety/resource-explorer";
import {
  FeaturedSafetyGuide,
  OfficialSafetyInformation,
} from "@/components/safety/sections";

export const metadata: Metadata = {
  title: "Safety Resources",
  description:
    "Browse fire safety, flood preparedness, road safety and emergency reporting resources.",
};

export default function SafetyResourcesPage() {
  return (
    <InteriorPage
      title="Safety Resources"
      description="Find public safety topics and practical information for your household, workplace and community."
      breadcrumbs={[{ label: "Safety Resources" }]}
      nodeId="19:235"
    >
      <ResourceExplorer>
        <FeaturedSafetyGuide />
      </ResourceExplorer>
      <OfficialSafetyInformation />
    </InteriorPage>
  );
}
