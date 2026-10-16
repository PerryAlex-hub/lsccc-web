import { Section, SectionIntro, InfoCard } from "@/components/ui/section";
import { ActionLink } from "@/components/ui/text-link";
import {
  incidentTypes,
  reportingSteps,
  emergencyQuestions,
} from "@/lib/content/emergency";
import { destinations } from "@/lib/navigation";

export function EmergencyContacts() {
  return (
    <Section className="grid items-center gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
      <SectionIntro
        eyebrow="EMERGENCY ASSISTANCE · 24 HOURS"
        title="Two numbers. One route to emergency help."
      >
        <p className="max-w-lg text-base leading-8 text-muted">
          For urgent incidents anywhere in Lagos State, call 112 or 767. Give
          your location, explain what happened and follow the call agent’s
          guidance.
        </p>
        <p className="text-sm leading-7 text-muted">
          Keep these lines available for real emergencies.
        </p>
      </SectionIntro>
      <div className="grid gap-px border border-border bg-border sm:grid-cols-2">
        {["112", "767"].map((number) => (
          <div
            key={number}
            className="flex flex-col items-start bg-paper p-7 sm:p-8"
          >
            <p className="text-[11px] font-bold tracking-wider text-blue">
              TOLL-FREE EMERGENCY LINE
            </p>
            <h2 className="my-5 text-6xl font-bold leading-none tabular-nums tracking-tight text-navy sm:text-7xl">
              {number}
            </h2>
            <p className="mb-6 text-sm leading-7 text-muted">
              For incidents requiring immediate assistance.
            </p>
            <ActionLink
              href={`tel:${number}`}
              className="mt-auto w-full justify-between bg-blue text-white"
              ariaLabel={`Call emergency line ${number}`}
            >
              Call {number}
              <span aria-hidden="true">↗</span>
            </ActionLink>
          </div>
        ))}
      </div>
    </Section>
  );
}

export function WhenToCall() {
  return (
    <Section tone="paper" nodeId="19:131" className="space-y-8 lg:space-y-10">
      <SectionIntro
        eyebrow="WHEN TO CALL"
        title="Report incidents that need urgent assistance."
        titleClassName="text-[clamp(1.65rem,2.6vw,2.25rem)] leading-[1.3]"
      />
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {incidentTypes.map((incident) => (
          <InfoCard
            key={incident.title}
            title={incident.title}
            accent={incident.accent}
          >
            <p>{incident.description}</p>
          </InfoCard>
        ))}
      </div>
      <p className="text-[13px] leading-[19px] text-muted">
        The call agent will assess the information and coordinate with the
        relevant response agency.
      </p>
    </Section>
  );
}

export function EmergencyReporting() {
  return (
    <Section tone="navy" nodeId="19:148" className="space-y-8 lg:space-y-10">
      <SectionIntro
        eyebrow="REPORTING AN EMERGENCY"
        title="Clear information helps responders reach you."
        titleClassName="text-[clamp(1.65rem,2.6vw,2.25rem)] leading-[1.3]"
        dark
        gap={28}
      />
      <ol className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
        {reportingSteps.map((step, index) => (
          <li
            key={step.title}
            className="space-y-4 border-t border-white/25 pt-6"
          >
            <p className="text-[26px] font-extrabold leading-[38px] text-gold">
              {String(index + 1).padStart(2, "0")}
            </p>
            <h3 className="text-xl font-bold leading-[30px]">{step.title}</h3>
            <p className="text-sm leading-7 text-white/80">
              {step.description}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

export function EmergencyQuestions() {
  return (
    <Section
      nodeId="19:168"
      className="grid items-start gap-10 lg:grid-cols-[880fr_384fr] xl:gap-12"
    >
      <div className="space-y-[22px]">
        <SectionIntro
          eyebrow="COMMON QUESTIONS"
          title="Know what to expect when you call."
          gap={22}
          titleClassName="text-[clamp(1.65rem,2.6vw,2.25rem)] leading-[1.3]"
        />
        {emergencyQuestions.map((item, index) => (
          <details
            key={item.question}
            open={index === 0}
            className="group border-b border-border pb-[22px]"
          >
            <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 text-[19px] font-bold leading-[29px] md:min-h-[29px] [&::-webkit-details-marker]:hidden">
              {item.question}
              <span aria-hidden="true" className="text-navy">
                <span className="group-open:hidden">+</span>
                <span className="hidden group-open:inline">−</span>
              </span>
            </summary>
            <p
              className={`mt-[22px] text-base leading-6 text-muted ${index === 0 ? "xl:min-h-12" : ""}`}
            >
              {item.answer}
            </p>
          </details>
        ))}
      </div>
      <aside className="flex flex-col gap-5 border-t-2 border-gold bg-paper p-7 text-navy">
        <h2 className="text-eyebrow font-bold">BEFORE YOU CALL</h2>
        <h3 className="text-[28px] font-bold leading-[1.3]">
          Your location
          <br />
          comes first.
        </h3>
        <p className="text-base leading-6">
          Knowing the address or a nearby landmark helps the call agent
          understand where assistance is needed.
        </p>
        <ActionLink
          href={destinations.beforeYouCall}
          className="bg-navy text-white"
        >
          Read the calling guide{" "}
          <span aria-hidden="true" className="ml-2">
            →
          </span>
        </ActionLink>
      </aside>
    </Section>
  );
}
