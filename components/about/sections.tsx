import { Photograph } from "@/components/ui/photograph";
import { Section, SectionIntro, InfoCard } from "@/components/ui/section";
import { TextLink } from "@/components/ui/text-link";
import { assets } from "@/lib/assets";
import {
  mandates,
  operatingStages,
  responsePartners,
  milestones,
} from "@/lib/content/about";

export function AboutOverview() {
  return (
    <Section
      id="overview"
      nodeId="18:71"
      className="grid items-start gap-10 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-12"
    >
      <nav
        aria-label="On this page"
        className="flex flex-col gap-5 bg-paper p-6"
      >
        <h2 className="text-[11px] font-bold leading-[17px] text-navy">
          IN THIS SECTION
        </h2>
        {[
          { label: "Overview", href: "#overview" },
          { label: "Our mandate", href: "#mandate" },
          { label: "How we work", href: "#how-we-work" },
          { label: "Response partners", href: "#partners" },
        ].map((item) => (
          <TextLink
            key={item.href}
            href={item.href}
            className="border-b border-border pb-5 text-sm font-medium text-muted first-of-type:font-bold first-of-type:text-navy"
          >
            {item.label} <span aria-hidden="true">→</span>
          </TextLink>
        ))}
      </nav>
      <div className="min-w-0 space-y-6">
        <SectionIntro eyebrow="ABOUT LSCCC" title="Role of the centre">
          <p className="text-[17px] leading-[26px] text-muted xl:min-h-[77px]">
            Lagos State Command &amp; Control Centre serves as a central
            coordination hub for emergency services across the state. It brings
            call handling and interagency communication together so that
            incident information can reach the right response teams.
          </p>
        </SectionIntro>
        <figure className="space-y-6">
          <Photograph
            asset={assets.operations}
            className="aspect-[984/380] min-h-48"
            sizes="(max-width: 1023px) 92vw, (max-width: 1440px) 68vw, 984px"
            nodeId="18:77"
            preload
          />
          <figcaption className="text-xs font-medium leading-[18px] text-muted">
            Inside the centre: emergency call agents at work.
          </figcaption>
        </figure>
      </div>
    </Section>
  );
}

export function AboutMandate() {
  return (
    <Section id="mandate" tone="paper" nodeId="18:89" className="space-y-6">
      <SectionIntro
        eyebrow="OUR MANDATE"
        title="Mandate and responsibilities"
      />
      <div className="grid items-start gap-6 md:grid-cols-2 xl:grid-cols-3">
        {mandates.map((item, index) => (
          <InfoCard
            key={item.title}
            title={item.title}
            number={String(index + 1).padStart(2, "0")}
          >
            <p>{item.description}</p>
          </InfoCard>
        ))}
      </div>
    </Section>
  );
}

export function AboutOperations() {
  return (
    <Section
      id="how-we-work"
      nodeId="18:108"
      className="grid items-start gap-8 lg:grid-cols-[560fr_688fr] xl:gap-16"
    >
      <SectionIntro
        eyebrow="HOW WE WORK"
        title="Operational coordination"
        gap={16}
      >
        <p className="text-[17px] leading-[26px] text-muted">
          LSCCC coordinates the communication. Specialist response agencies
          provide the appropriate assistance on the ground.
        </p>
      </SectionIntro>
      <ol className="flex flex-col gap-5 bg-paper p-8 text-[19px] font-bold leading-[29px]">
        {operatingStages.map((stage, index) => (
          <li key={stage} className="flex gap-3">
            <span>{String(index + 1).padStart(2, "0")}</span>
            <span>{stage}</span>
          </li>
        ))}
      </ol>
    </Section>
  );
}

export function AboutPartners() {
  return (
    <Section id="partners" tone="paper" nodeId="18:119" className="space-y-6">
      <SectionIntro
        eyebrow="A COORDINATED RESPONSE NETWORK"
        title="Partner response agencies"
      >
        <p className="text-[15px] leading-[22px] text-muted">
          The centre coordinates with agencies across emergency management,
          healthcare, traffic and public safety.
        </p>
      </SectionIntro>
      <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {responsePartners.map((partner) => (
          <div key={partner.name} className="space-y-3 bg-white p-5">
            <dt className="text-base font-bold leading-6 text-navy">
              {partner.name}
            </dt>
            <dd className="text-xs leading-[17.4px] text-muted xl:min-h-[38px]">
              {partner.role}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}

export function AboutManagement() {
  return (
    <section className="bg-paper" data-node-id="35:727">
      <div className="editorial-container grid gap-10 py-10 lg:grid-cols-[460fr_844fr] xl:py-12">
        <figure className="space-y-4">
          <Photograph
            asset={assets.frscEngagement}
            className="aspect-[460/280]"
            sizes="(max-width: 1023px) 92vw, (max-width: 1440px) 32vw, 460px"
            nodeId="35:730"
          />
          <figcaption className="text-[13px] leading-[18.85px] text-muted xl:min-h-16">
            LSCCC General Manager Femi Kennedy Giwa with the FRSC Lagos Sector
            Commander during their February 2026 engagement.
          </figcaption>
        </figure>
        <div className="flex flex-col gap-4">
          <SectionIntro
            eyebrow="MANAGEMENT & DEVELOPMENT"
            title="Mr. Femi Kennedy Giwa"
            titleClassName="text-[27px] leading-[39.15px]"
            gap={16}
          >
            <p className="text-[15px] font-semibold leading-[22px] text-navy">
              General Manager, Lagos State Command &amp; Control Centre
            </p>
            <p className="text-body text-muted xl:min-h-[76px]">
              The General Manager represents the centre in institutional
              engagements focused on emergency coordination, road safety
              partnerships and the systems supporting interagency response.
            </p>
          </SectionIntro>
          <div className="h-px bg-border" />
          <h3 className="text-lg font-bold leading-[27px] text-navy">
            Institutional milestones
          </h3>
          <dl className="flex flex-col gap-3">
            {milestones.map((item) => (
              <div
                key={item.year}
                className="grid grid-cols-[64px_1fr] gap-4 text-sm leading-[21px]"
              >
                <dt className="font-bold text-navy">{item.year}</dt>
                <dd className="text-muted">{item.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
