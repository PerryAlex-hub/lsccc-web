import { Section, SectionIntro, InfoCard } from "@/components/ui/section";
import { ActionLink } from "@/components/ui/text-link";
import { enquiryRoutes } from "@/lib/content/contact";
import { destinations } from "@/lib/navigation";
import { EnquiryForm } from "./enquiry-form";
import { ContactDetails } from "./contact-details";

export function EmergencyPriority() {
  return (
    <aside
      className="border-b border-gold/30 bg-gold/10 text-navy"
      data-node-id="20:314"
    >
      <div className="site-container flex flex-col items-start gap-6 py-6 lg:flex-row lg:items-center">
        <div className="flex-1 space-y-3">
          <h2 className="text-eyebrow font-bold">NEED EMERGENCY ASSISTANCE?</h2>
          <p className="text-xl font-bold leading-8">
            Call{" "}
            <a href="tel:112" className="hover:underline">
              112
            </a>{" "}
            or{" "}
            <a href="tel:767" className="hover:underline">
              767
            </a>{" "}
            for immediate help.
          </p>
          <p className="text-sm leading-[21px]">
            The general enquiry form below is for non-emergency messages.
          </p>
        </div>
        <ActionLink
          href={destinations.emergency}
          className="w-full bg-navy text-white lg:w-[308px]"
        >
          Emergency services{" "}
          <span aria-hidden="true" className="ml-2">
            →
          </span>
        </ActionLink>
      </div>
    </aside>
  );
}

export function ContactEnquiries() {
  return (
    <Section
      nodeId="20:322"
      className="grid items-start gap-10 lg:grid-cols-[1fr_1.35fr] lg:gap-16"
    >
      <ContactDetails />
      <EnquiryForm />
    </Section>
  );
}

export function ContactRoutes() {
  return (
    <Section tone="paper" nodeId="20:372" className="space-y-6">
      <SectionIntro
        eyebrow="BEFORE YOU SEND"
        title="Choose the right route for your message."
        titleClassName="text-[clamp(1.65rem,2.6vw,2.25rem)] leading-[1.3]"
      />
      <div className="grid items-start gap-6 md:grid-cols-2 xl:grid-cols-3">
        {enquiryRoutes.map((route) => (
          <InfoCard key={route.title} title={route.title}>
            <p>{route.description}</p>
          </InfoCard>
        ))}
      </div>
    </Section>
  );
}
