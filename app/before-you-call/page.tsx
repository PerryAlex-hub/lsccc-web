import type { Metadata } from "next";
import { InteriorPage } from "@/components/ui/interior-page";
import {
  CallingIntroduction,
  CallingChecklist,
  CallingAdvice,
  CallingNavigation,
} from "@/components/emergency/calling-guide";
import { destinations } from "@/lib/navigation";

export const metadata: Metadata = {
  title: "Before You Call",
  description:
    "Have your location, incident details and callback number ready when calling 112 or 767.",
};

export default function BeforeYouCallPage() {
  return (
    <InteriorPage
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
