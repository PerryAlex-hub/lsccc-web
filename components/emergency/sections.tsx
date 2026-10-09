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
    <Section nodeId="19:116" className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        {["112", "767"].map((number) => (
          <div
            key={number}
            className="flex flex-col items-start gap-4 bg-navy p-7 text-white sm:p-9"
          >
            <h2 className="text-eyebrow font-bold text-gold">
              TOLL-FREE EMERGENCY LINE
            </h2>
            <p className="text-[64px] font-extrabold leading-[1.5] sm:text-[88px]">
              {number}
            </p>
            <p className="text-[17px] leading-[26px]">
              For urgent incidents requiring emergency assistance.
            </p>
            <ActionLink
              href={`tel:${number}`}
              className="w-full bg-gold px-4 py-4 text-navy sm:w-[260px]"
              ariaLabel={`Call emergency line ${number}`}
            >
              Call {number}{" "}
              <span aria-hidden="true" className="ml-2">
                ↗
              </span>
            </ActionLink>
          </div>
        ))}
      </div>
      <p className="text-[13px] leading-[19px] text-muted">
        Both numbers are published emergency contacts for Lagos State. Keep
        these lines available for real emergencies.
      </p>
    </Section>
  );
}

export function WhenToCall() {
  return (
    <Section tone="paper" nodeId="19:131" className="space-y-6">
      <SectionIntro
        eyebrow="WHEN TO CALL"
        title="Report incidents that need urgent assistance."
        titleClassName="text-[28px] leading-[1.5] sm:text-[32px]"
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
    <Section tone="navy" nodeId="19:148" className="space-y-7">
      <SectionIntro
        eyebrow="REPORTING AN EMERGENCY"
        title="Clear information helps responders reach you."
        titleClassName="text-[26px] leading-[1.45] sm:text-[30px]"
        dark
        gap={28}
      />
      <ol className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
        {reportingSteps.map((step, index) => (
          <li key={step.title} className="space-y-4">
            <p className="text-[26px] font-extrabold leading-[38px] text-gold">
              {String(index + 1).padStart(2, "0")}
            </p>
            <h3 className="text-xl font-bold leading-[30px]">{step.title}</h3>
            <p className="text-[15px] leading-[23px]">{step.description}</p>
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
          titleClassName="text-[26px] leading-[1.5] sm:text-[30px]"
        />
        {emergencyQuestions.map((item, index) => (
          <details
            key={item.question}
            open
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
      <aside className="flex flex-col gap-5 bg-gold p-7 text-ink">
        <h2 className="text-eyebrow font-bold">BEFORE YOU CALL</h2>
        <h3 className="text-[28px] font-extrabold leading-[42px]">
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
