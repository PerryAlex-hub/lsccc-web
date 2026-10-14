import { getPageMetadata } from "@/lib/cms/public";
import type { Metadata } from "next";
import { InteriorPage } from "@/components/ui/interior-page";
import {
  CallingIntroduction,
  CallingChecklist,
  CallingAdvice,
  CallingNavigation,
} from "@/components/emergency/calling-guide";
import { destinations } from "@/lib/navigation";

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("/before-you-call");
}

export default function BeforeYouCallPage() {
  return (
    <InteriorPage
      cmsPath="/before-you-call"
      title="Before You Call"
      description="Know the information that helps an emergency call agent understand your incident and location."
      breadcrumbs={[
        { label: "Safety Resources", href: destinations.safety },
        { label: "Before You Call" },
      ]}
      nodeId="21:374"
    >
      <CallingIntroduction />
      <CallingChecklist />
      <CallingAdvice />
      <CallingNavigation />
    </InteriorPage>
  );
}
