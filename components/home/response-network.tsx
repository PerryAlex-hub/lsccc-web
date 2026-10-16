import Image from "next/image";
import { TextLink } from "@/components/ui/text-link";
import { agencies } from "@/lib/home-content";
import { destinations } from "@/lib/navigation";
import { SectionHeading } from "./section-heading";

export function HomePartners() {
  return (
    <section
      id="home-partners"
      aria-labelledby="partners-title"
      className="editorial-container py-14 md:py-20"
    >
      <SectionHeading
        id="partners-title"
        eyebrow="ONE COORDINATED RESPONSE"
        title="Working together for a safer Lagos"
        description="LSCCC connects emergency calls with a network of specialist agencies, each bringing the expertise an incident requires."
        href={destinations.partners}
        linkLabel="Our response network"
      />
      <div className="grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
        {agencies.map((agency) => (
          <article
            key={agency.abbreviation}
            className="flex gap-5 bg-white p-6 sm:flex-col sm:p-8 xl:flex-row"
          >
            <div className="flex h-24 w-24 shrink-0 items-center justify-center self-start bg-white">
              <Image
                src={agency.logo}
                alt={`${agency.abbreviation} emblem`}
                width={96}
                height={96}
                className="h-24 w-24 object-contain"
              />
            </div>
            <div>
              <p className="mb-2 text-[11px] font-bold tracking-wide text-blue">
                {agency.abbreviation}
              </p>
              <h3 className="text-sm font-bold leading-6 text-navy">
                {agency.name}
              </h3>
              <p className="mt-3 text-xs leading-6 text-muted">
                {agency.description}
              </p>
            </div>
          </article>
        ))}
      </div>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-l-2 border-gold bg-paper px-5 py-4">
        <p className="text-sm leading-6 text-navy">
          Need emergency assistance? Call{" "}
          <a
            href="tel:112"
            className="font-bold text-blue underline underline-offset-4"
          >
            112
          </a>{" "}
          or{" "}
          <a
            href="tel:767"
            className="font-bold text-blue underline underline-offset-4"
          >
            767
          </a>
          .
        </p>
        <TextLink
          href={destinations.beforeYouCall}
          className="text-xs text-blue"
        >
          What to tell your call agent <span aria-hidden="true">→</span>
        </TextLink>
      </div>
    </section>
  );
}
