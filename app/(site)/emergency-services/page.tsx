import type { Metadata } from "next";
import { InteriorPage } from "@/components/ui/interior-page";
import {
  EmergencyContacts,
  WhenToCall,
  EmergencyReporting,
  EmergencyQuestions,
} from "@/components/emergency/sections";

export const metadata: Metadata = {
  title: "Emergency Services",
  description:
    "Call 112 or 767 for emergency assistance in Lagos State. Learn when to call and what information to give.",
};

export default function EmergencyServicesPage() {
  return (
    <InteriorPage
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
