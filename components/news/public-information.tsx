import { Section, SectionIntro } from "@/components/ui/section";
import { LinkPanel } from "@/components/ui/link-panel";
import { destinations } from "@/lib/navigation";

export function NewsPublicInformation() {
  return (
    <Section
      nodeId="20:251"
      className="grid items-start gap-6 lg:grid-cols-[680fr_608fr]"
    >
      <SectionIntro
        eyebrow="PUBLIC INFORMATION"
        title={"Looking for information\nabout the centre?"}
        titleClassName="text-[28px] leading-[1.5] sm:text-[32px]"
      >
        <p className="text-base leading-6 text-muted">
          Use the centre overview for our mandate and response network. For
          media or partnership enquiries, visit Contact &amp; Enquiries.
        </p>
      </SectionIntro>
      <LinkPanel
        links={[
          { label: "About the Centre", href: destinations.about },
          {
            label: "Media & partnership enquiries",
            href: `${destinations.contact}?topic=media`,
          },
          { label: "Lagos State newsroom", href: destinations.government },
        ]}
      />
    </Section>
  );
}
