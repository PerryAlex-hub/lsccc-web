import { Section, SectionIntro, InfoCard } from "@/components/ui/section";
import { ActionLink, TextLink } from "@/components/ui/text-link";
import { enquiryRoutes } from "@/lib/content/contact";
import { destinations } from "@/lib/navigation";
import { EnquiryForm } from "./enquiry-form";

export function EmergencyPriority() {
  return (
    <aside className="bg-gold text-navy" data-node-id="20:314">
      <div className="site-container flex flex-col items-start gap-6 py-8 lg:flex-row lg:items-center">
        <div className="flex-1 space-y-3">
          <h2 className="text-eyebrow font-bold">NEED EMERGENCY ASSISTANCE?</h2>
          <p className="text-[24px] font-bold leading-9">
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
      className="grid items-start gap-10 lg:grid-cols-[800fr_464fr] xl:gap-12"
    >
      <EnquiryForm />
      <aside className="flex flex-col gap-6 bg-paper p-7">
        <h2 className="text-eyebrow font-bold text-navy">
          OTHER WAYS TO FIND HELP
        </h2>
        <div className="space-y-4 border-b border-border pb-6">
          <h3 className="text-[22px] font-bold leading-[33px]">
            Emergency assistance
          </h3>
          <p className="text-[38px] font-extrabold leading-[57px] text-navy">
            <a href="tel:112" className="hover:underline">
              112
            </a>{" "}
            /{" "}
            <a href="tel:767" className="hover:underline">
              767
            </a>
          </p>
          <p className="text-[15px] leading-[23px] text-muted">
            For emergencies requiring immediate assistance.
          </p>
        </div>
        <div className="space-y-4 border-b border-border pb-6">
          <h3 className="text-xl font-bold leading-[30px]">
            Government feedback
          </h3>
          <p className="text-[15px] leading-[23px] text-muted">
            For non-emergency feedback about Lagos State services, use Citizens
            Gate.
          </p>
          <ActionLink
            href={destinations.citizensGate}
            className="w-full bg-navy text-white sm:max-w-[320px]"
          >
            Open Citizens Gate <span aria-hidden="true">↗</span>
          </ActionLink>
        </div>
        <div className="space-y-4">
          <h3 className="text-xl font-bold leading-[30px]">
            Visit the state portal
          </h3>
          <p className="text-[15px] leading-[23px] text-muted">
            Find ministries, agencies and public services at lagosstate.gov.ng.
          </p>
          <TextLink
            href={destinations.governmentServices}
            className="text-sm text-navy"
          >
            Lagos State services <span aria-hidden="true">↗</span>
          </TextLink>
        </div>
      </aside>
    </Section>
  );
}

export function ContactRoutes() {
  return (
    <Section tone="paper" nodeId="20:372" className="space-y-6">
      <SectionIntro
        eyebrow="BEFORE YOU SEND"
        title="Choose the right route for your message."
        titleClassName="text-[26px] leading-[1.5] sm:text-[30px]"
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
