import { getPageMetadata } from "@/lib/cms/public";
import type { Metadata } from "next";
import { InteriorPage } from "@/components/ui/interior-page";
import {
  EmergencyContacts,
  WhenToCall,
  EmergencyReporting,
  EmergencyQuestions,
} from "@/components/emergency/sections";

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("/emergency-services");
}

export default function EmergencyServicesPage() {
  return (
    <InteriorPage
      cmsPath="/emergency-services"
      title="Emergency Services"
      description="For emergencies requiring immediate help, call the Lagos State emergency lines."
      breadcrumbs={[{ label: "Emergency Services" }]}
      nodeId="19:112"
    >
      <EmergencyContacts />
      <WhenToCall />
      <EmergencyReporting />
      <EmergencyQuestions />
    </InteriorPage>
  );
}
