import { Section, SectionIntro } from "@/components/ui/section";
import { ActionLink, TextLink } from "@/components/ui/text-link";
import { callingDetails } from "@/lib/content/emergency";
import { destinations } from "@/lib/navigation";

export function CallingIntroduction() {
  return (
    <Section
      nodeId="21:378"
      className="grid items-start gap-8 lg:grid-cols-[896fr_368fr] xl:gap-12"
    >
      <SectionIntro
        eyebrow="EMERGENCY REPORTING GUIDE"
        title={"Start with where you are.\nThen explain what happened."}
        titleClassName="text-[28px] leading-[1.5] sm:text-[34px]"
      >
        <p className="text-lg leading-[27px] text-muted">
          When reporting an emergency, give the call agent clear information.
          Answer their questions and follow their guidance.
        </p>
      </SectionIntro>
      <aside className="flex flex-col gap-4 bg-gold p-7 text-navy">
        <h2 className="text-eyebrow font-bold">LAGOS EMERGENCY LINES</h2>
        <p className="text-[38px] font-extrabold leading-[1.5] sm:text-[44px]">
          <a href="tel:112" className="hover:underline">
            112
          </a>{" "}
          /{" "}
          <a href="tel:767" className="hover:underline">
            767
          </a>
        </p>
        <p className="text-base leading-6">
          Call for emergencies requiring immediate assistance.
        </p>
      </aside>
    </Section>
  );
}

export function CallingChecklist() {
  return (
    <Section tone="paper" nodeId="21:388" className="space-y-6">
      <SectionIntro
        eyebrow="HAVE THESE DETAILS READY"
        title="Four things to tell the call agent."
        titleClassName="text-[28px] leading-[1.5] sm:text-[32px]"
      />
      <ol className="space-y-6">
        {callingDetails.map((detail, index) => (
          <li
            key={detail.title}
            className="grid items-start gap-7 bg-white p-7 sm:grid-cols-[64px_minmax(0,1fr)] xl:grid-cols-[76px_minmax(0,700fr)_minmax(0,396fr)] xl:pr-14"
          >
            <span className="text-[32px] font-extrabold leading-[46px] text-navy">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="space-y-4">
              <h3 className="text-[23px] font-bold leading-[35px]">
                {detail.title}
              </h3>
              <p
                className={`text-base leading-6 text-muted ${index === 0 || index === 2 ? "xl:min-h-12" : ""}`}
              >
                {detail.description}
              </p>
            </div>
            <p className="bg-paper p-5 text-[13px] font-medium leading-[19px] text-navy sm:col-start-2 xl:col-start-auto">
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
          titleClassName="text-[26px] leading-[1.5] sm:text-[29px]"
          dark
          gap={20}
        >
          <p className="text-[17px] leading-[26px] xl:min-h-[77px]">
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
          titleClassName="text-[26px] leading-[1.5] sm:text-[29px]"
          gap={20}
        >
          <p className="text-[17px] leading-[26px] text-muted">
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
