import { Section, SectionIntro } from "@/components/ui/section";
import { ActionLink } from "@/components/ui/text-link";
import { LinkPanel } from "@/components/ui/link-panel";
import { callChecklist } from "@/lib/content/safety";
import { destinations } from "@/lib/navigation";

export function FeaturedSafetyGuide() {
  return (
    <Section nodeId="19:247" className="grid lg:grid-cols-[760fr_552fr]">
      <div className="flex flex-col items-start gap-6 bg-navy p-7 text-white sm:p-10">
        <h2 className="text-eyebrow font-bold text-gold">
          FEATURED GUIDE / EMERGENCY REPORTING
        </h2>
        <p className="text-[30px] font-extrabold leading-[1.5] sm:text-[36px]">
          A clearer call.
          <br />A better starting point.
        </p>
        <p className="text-[17px] leading-[26px]">
          Know what to tell the call agent: your location, what happened and how
          to reach you.
        </p>
        <ActionLink
          href={destinations.beforeYouCall}
          className="w-full bg-gold text-navy sm:w-[300px]"
        >
          Read: Before you call{" "}
          <span aria-hidden="true" className="ml-2">
            →
          </span>
        </ActionLink>
      </div>
      <div className="flex flex-col gap-[22px] bg-paper p-7 sm:p-10">
        <h2 className="text-eyebrow font-bold text-navy">
          HAVE THIS INFORMATION READY
        </h2>
        <ol className="space-y-[22px]">
          {callChecklist.map((item, index) => (
            <li
              key={item}
              className="flex gap-3 border-b border-border pb-[22px] text-[19px] font-bold leading-[29px] text-navy"
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <span>{item}</span>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}

export function OfficialSafetyInformation() {
  return (
    <Section
      tone="paper"
      nodeId="19:298"
      className="grid items-start gap-6 lg:grid-cols-[820fr_468fr]"
    >
      <SectionIntro
        eyebrow="OFFICIAL INFORMATION"
        title="Keep up with Lagos State guidance."
        titleClassName="text-[26px] leading-[1.5] sm:text-[28px]"
      >
        <p className="text-base leading-6 text-muted">
          For current advisories, agency contacts and public services, refer to
          the Lagos State government portal. Read centre updates in News &amp;
          Media.
        </p>
      </SectionIntro>
      <div className="[&>nav]:bg-white [&>nav]:p-6">
        <LinkPanel
          links={[
            {
              label: "Lagos State services",
              href: destinations.governmentServices,
            },
            { label: "News & public information", href: destinations.news },
            { label: "Emergency assistance", href: destinations.emergency },
          ]}
        />
      </div>
    </Section>
  );
}
