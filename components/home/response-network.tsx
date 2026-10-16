import { AgencyGrid } from "@/components/site/agency-grid";
import { TextLink } from "@/components/ui/text-link";
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
      <AgencyGrid />
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
