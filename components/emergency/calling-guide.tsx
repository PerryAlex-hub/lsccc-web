import { Section, SectionIntro } from "@/components/ui/section";
import { ActionLink, TextLink } from "@/components/ui/text-link";
import { callingDetails } from "@/lib/content/emergency";
import { destinations } from "@/lib/navigation";

export function CallingIntroduction() {
  return (
    <Section
      nodeId="21:378"
      className="grid items-center gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16"
    >
      <SectionIntro
        eyebrow="EMERGENCY REPORTING GUIDE"
        title={"Start with where you are.\nThen explain what happened."}
        titleClassName="text-[clamp(1.65rem,2.6vw,2.25rem)] leading-[1.3]"
      >
        <p className="text-base leading-8 text-muted">
          When reporting an emergency, give the call agent clear information.
          Answer their questions and follow their guidance.
        </p>
      </SectionIntro>
      <aside className="flex flex-col gap-4 border-l-2 border-gold bg-navy p-7 text-white sm:p-9">
        <h2 className="text-xs font-bold tracking-wider text-gold">
          LAGOS EMERGENCY LINES
        </h2>
        <p className="text-4xl font-bold leading-[1.5] tabular-nums sm:text-5xl">
          <a href="tel:112" className="hover:underline">
            112
          </a>{" "}
          /{" "}
          <a href="tel:767" className="hover:underline">
            767
          </a>
        </p>
        <p className="text-sm leading-7 text-white/80">
          Call for emergencies requiring immediate assistance.
        </p>
      </aside>
    </Section>
  );
}

export function CallingChecklist() {
  return (
    <Section tone="paper" nodeId="21:388" className="space-y-8 lg:space-y-10">
      <SectionIntro
        eyebrow="HAVE THESE DETAILS READY"
        title="Four things to tell the call agent."
        titleClassName="text-[clamp(1.65rem,2.6vw,2.25rem)] leading-[1.3]"
      />
      <ol className="divide-y divide-border border border-border bg-white">
        {callingDetails.map((detail, index) => (
          <li
            key={detail.title}
            className="grid items-start gap-5 p-6 sm:grid-cols-[48px_minmax(0,1fr)] sm:p-8 lg:grid-cols-[48px_minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-8"
          >
            <span className="text-3xl font-semibold leading-10 tabular-nums text-blue">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="space-y-4">
              <h3 className="text-xl font-bold leading-8 text-navy">
                {detail.title}
              </h3>
              <p
                className={`text-base leading-6 text-muted ${index === 0 || index === 2 ? "xl:min-h-12" : ""}`}
              >
                {detail.description}
              </p>
            </div>
            <p className="border-l-2 border-gold bg-paper p-5 text-sm font-medium leading-7 text-navy sm:col-start-2 lg:col-start-auto">
              {detail.prompt}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

export function CallingAdvice() {
  return (
    <Section nodeId="21:419" className="grid items-start gap-6 md:grid-cols-2">
      <div className="space-y-5 bg-navy p-8 text-white">
        <SectionIntro
          eyebrow="DURING THE CALL"
          title={"Listen. Answer.\nFollow the agent’s guidance."}
          titleClassName="text-[clamp(1.65rem,2.6vw,2.25rem)] leading-[1.3]"
          dark
          gap={20}
        >
          <p className="text-[17px] leading-[26px]">
            The call agent may ask questions to clarify the location and
            incident. Keep your responses clear and let them guide the
            conversation.
          </p>
        </SectionIntro>
      </div>
      <div className="space-y-5 bg-paper p-8">
        <SectionIntro
          eyebrow="KEEP THE LINES AVAILABLE"
          title={"Emergency lines are\nfor real emergencies."}
          titleClassName="text-[clamp(1.65rem,2.6vw,2.25rem)] leading-[1.3]"
          gap={20}
        >
          <p className="text-base leading-8 text-muted">
            Avoid prank calls. For general government feedback or a
            non-emergency enquiry, use the Contact &amp; Enquiries page.
          </p>
        </SectionIntro>
        <TextLink href={destinations.contact} className="text-sm text-navy">
          Contact &amp; Enquiries <span aria-hidden="true">→</span>
        </TextLink>
      </div>
    </Section>
  );
}

export function CallingNavigation() {
  return (
    <nav
      aria-label="More emergency information"
      className="bg-paper"
      data-node-id="21:430"
    >
      <div className="site-container flex flex-col gap-4 py-10 sm:flex-row">
        <ActionLink
          href={destinations.safety}
          className="bg-navy text-white sm:w-[300px]"
        >
          <span aria-hidden="true" className="mr-2">
            ←
          </span>{" "}
          Safety resources
        </ActionLink>
        <ActionLink
          href={destinations.emergency}
          className="border border-border bg-white text-navy sm:w-[320px]"
        >
          Emergency services{" "}
          <span aria-hidden="true" className="ml-2">
            →
          </span>
        </ActionLink>
      </div>
    </nav>
  );
}
