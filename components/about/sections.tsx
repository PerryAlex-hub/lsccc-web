import { Photograph } from "@/components/ui/photograph";
import { Section, SectionIntro, InfoCard } from "@/components/ui/section";
import { TextLink } from "@/components/ui/text-link";
import { AgencyGrid } from "@/components/site/agency-grid";
import { assets } from "@/lib/assets";
import { mandates, operatingStages, milestones } from "@/lib/content/about";

const pageLinks = [
  { label: "Overview", href: "#overview" },
  { label: "Our mandate", href: "#mandate" },
  { label: "How we work", href: "#how-we-work" },
  { label: "Response partners", href: "#partners" },
  { label: "Management", href: "#management" },
] as const;

export function AboutOverview() {
  return (
    <>
      <nav
        aria-label="On this page"
        className="border-b border-border bg-paper"
      >
        <div className="site-container flex flex-wrap items-center gap-x-8 gap-y-2 py-4">
          <p className="mr-2 text-[11px] font-bold tracking-wider text-muted">
            IN THIS SECTION
          </p>
          {pageLinks.map((item) => (
            <TextLink
              key={item.href}
              href={item.href}
              className="py-3 text-xs text-navy"
            >
              {item.label}
            </TextLink>
          ))}
        </div>
      </nav>
      <Section
        id="overview"
        className="grid items-center gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16"
      >
        <div>
          <SectionIntro
            eyebrow="ABOUT LSCCC"
            title="The connection between an emergency call and the help it needs."
          >
            <p className="max-w-xl text-base leading-8 text-muted">
              Lagos State Command &amp; Control Centre serves as a central
              coordination hub for emergency services across the state. It
              brings call handling and interagency communication together so
              that incident information can reach the right response teams.
            </p>
          </SectionIntro>
          <div className="mt-8 border-l-2 border-gold pl-5">
            <p className="text-lg font-bold text-navy">
              One centre. A coordinated network.
            </p>
            <p className="mt-3 text-sm leading-7 text-muted">
              Emergency management, fire and rescue, ambulance, traffic and
              public safety agencies working together for Lagos.
            </p>
          </div>
        </div>
        <figure>
          <Photograph
            asset={assets.operations}
            className="aspect-[5/4]"
            sizes="(max-width: 1023px) 92vw, 48vw"
            preload
          />
          <figcaption className="mt-4 border-l-2 border-gold pl-4 text-xs leading-6 text-muted">
            Inside the centre: emergency call agents at work.
          </figcaption>
        </figure>
      </Section>
    </>
  );
}

export function AboutMandate() {
  return (
    <Section id="mandate" tone="paper" className="space-y-8 lg:space-y-10">
      <SectionIntro
        eyebrow="OUR MANDATE"
        title="Communication. Coordination. Public awareness."
      />
      <div className="grid gap-5 md:grid-cols-3">
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
      className="grid items-start gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20"
    >
      <SectionIntro
        eyebrow="HOW WE WORK"
        title="From the first call to coordinated communication."
      >
        <p className="max-w-lg text-base leading-8 text-muted">
          LSCCC coordinates the communication. Specialist response agencies
          provide the appropriate assistance on the ground.
        </p>
      </SectionIntro>
      <ol className="border-t border-border">
        {operatingStages.map((stage, index) => (
          <li
            key={stage}
            className="flex items-center gap-6 border-b border-border py-6"
          >
            <span className="flex size-11 shrink-0 items-center justify-center border border-border bg-paper text-sm font-bold tabular-nums text-blue">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="text-base font-bold leading-7 text-navy sm:text-lg">
              {stage}
            </h3>
          </li>
        ))}
      </ol>
    </Section>
  );
}

export function AboutPartners() {
  return (
    <Section id="partners" tone="paper" className="space-y-8 lg:space-y-10">
      <SectionIntro
        eyebrow="OUR RESPONSE NETWORK"
        title="Specialist agencies. A shared commitment to Lagos."
      >
        <p className="max-w-2xl text-base leading-8 text-muted">
          The centre coordinates with agencies across emergency management,
          healthcare, traffic, public safety, survivor support and social
          welfare.
        </p>
      </SectionIntro>
      <AgencyGrid />
    </Section>
  );
}

export function AboutManagement() {
  return (
    <Section
      id="management"
      className="grid items-start gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16"
    >
      <figure>
        <Photograph
          asset={assets.frscEngagement}
          className="aspect-[4/3]"
          sizes="(max-width: 1023px) 92vw, 42vw"
        />
        <figcaption className="mt-4 border-l-2 border-gold pl-4 text-xs leading-6 text-muted">
          LSCCC General Manager Femi Kennedy Giwa with the FRSC Lagos Sector
          Commander during their February 2026 engagement.
        </figcaption>
      </figure>
      <div>
        <SectionIntro
          eyebrow="MANAGEMENT & DEVELOPMENT"
          title="Mr. Femi Kennedy Giwa"
        >
          <p className="text-sm font-semibold leading-7 text-blue">
            General Manager, Lagos State Command &amp; Control Centre
          </p>
          <p className="text-base leading-8 text-muted">
            The General Manager represents the centre in institutional
            engagements focused on emergency coordination, road safety
            partnerships and the systems supporting interagency response.
          </p>
        </SectionIntro>
        <h3 className="mb-5 mt-8 text-lg font-bold text-navy">
          Institutional milestones
        </h3>
        <dl className="border-t border-border">
          {milestones.map((item) => (
            <div
              key={item.year}
              className="grid grid-cols-[4rem_1fr] gap-5 border-b border-border py-4 text-sm leading-7"
            >
              <dt className="font-bold tabular-nums text-blue">{item.year}</dt>
              <dd className="text-muted">{item.description}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}
