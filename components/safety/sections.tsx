import { Section, SectionIntro } from "@/components/ui/section";
import { ActionLink } from "@/components/ui/text-link";
import { LinkPanel } from "@/components/ui/link-panel";
import { callChecklist } from "@/lib/content/safety";
import { destinations } from "@/lib/navigation";
import { Photograph } from "@/components/ui/photograph";
import { assets } from "@/lib/assets";

export function FeaturedSafetyGuide() {
  return (
    <Section
      nodeId="19:247"
      className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-12"
    >
      <div className="flex flex-col items-start justify-center gap-6 border-l-2 border-gold bg-navy p-7 text-white sm:p-10">
        <h2 className="text-xs font-bold tracking-[0.14em] text-gold">
          FEATURED GUIDE / EMERGENCY REPORTING
        </h2>
        <p className="text-[clamp(1.8rem,3vw,2.5rem)] font-bold leading-[1.3] tracking-tight">
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
      <div className="flex flex-col bg-paper">
        <Photograph
          asset={assets.responderTraining}
          className="aspect-[16/8]"
          sizes="(max-width: 1023px) 92vw, 48vw"
        />
        <div className="space-y-5 p-6 sm:p-8">
          <h2 className="text-xs font-bold tracking-wider text-blue">
            HAVE THIS INFORMATION READY
          </h2>
          <ol className="divide-y divide-border">
            {callChecklist.map((item, index) => (
              <li
                key={item}
                className="flex items-start gap-5 py-4 text-base font-semibold leading-7 text-navy"
              >
                <span className="text-xs font-bold tabular-nums text-blue">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        </div>
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
        titleClassName="text-[clamp(1.65rem,2.6vw,2.25rem)] leading-[1.3]"
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
