import { Photograph } from "@/components/ui/photograph";
import { Section } from "@/components/ui/section";
import { ActionLink, TextLink } from "@/components/ui/text-link";
import { assets } from "@/lib/assets";
import { infrastructureArticle } from "@/lib/content/news";
import { destinations } from "@/lib/navigation";

export function ArticleContent() {
  return (
    <Section
      nodeId="21:296"
      className="grid items-start gap-10 lg:grid-cols-[896fr_368fr] xl:gap-12"
    >
      <article className="flex min-w-0 flex-col gap-6">
        <p className="text-eyebrow font-bold text-navy">
          <time dateTime={infrastructureArticle.dateTime}>JUNE 2025</time> •
          INFRASTRUCTURE
        </p>
        <p className="text-[13px] leading-5 text-muted">
          Summary of a Lagos State Government update
        </p>
        <figure className="space-y-6">
          <Photograph
            asset={assets.operations}
            className="aspect-[896/440]"
            sizes="(max-width: 1023px) 92vw, (max-width: 1440px) 62vw, 896px"
            nodeId="21:301"
            preload
          />
          <figcaption className="text-xs font-medium leading-[18px] text-muted">
            LSCCC call agents at work. Photograph illustrates centre operations.
          </figcaption>
        </figure>
        <h2 className="text-[29px] font-extrabold leading-[44px]">
          Strengthening the centre’s capabilities
        </h2>
        {infrastructureArticle.paragraphs.map((paragraph, index) => (
          <p
            key={paragraph}
            className={`text-muted ${index === 0 ? "text-lg leading-[27px] xl:min-h-[54px]" : "text-[17px] leading-[26px] xl:min-h-[51px]"}`}
          >
            {paragraph}
          </p>
        ))}
        <div className="h-px bg-border" />
        <div className="space-y-6">
          <h3 className="text-eyebrow font-bold text-navy">SOURCE</h3>
          <p className="text-[15px] leading-[23px] text-muted">
            Lagos State Government • June 2025
          </p>
          <TextLink
            href={infrastructureArticle.sourceHref}
            className="text-sm text-navy"
          >
            Read original government release <span aria-hidden="true">↗</span>
          </TextLink>
        </div>
        <TextLink href={destinations.news} className="text-sm text-navy">
          <span aria-hidden="true">←</span> Back to News &amp; Media
        </TextLink>
      </article>
      <ArticleSidebar />
    </Section>
  );
}

function ArticleSidebar() {
  return (
    <aside className="flex flex-col gap-[22px] bg-paper p-7">
      <h2 className="text-eyebrow font-bold text-navy">ABOUT THE CENTRE</h2>
      <p className="text-[24px] font-bold leading-9">
        Emergency coordination
        <br />
        for Lagos State.
      </p>
      <p className="text-[15px] leading-[23px] text-muted">
        Learn how the centre connects emergency communication and response
        agencies.
      </p>
      <ActionLink href={destinations.about} className="bg-navy text-white">
        About LSCCC{" "}
        <span aria-hidden="true" className="ml-2">
          →
        </span>
      </ActionLink>
      <div className="h-px bg-border" />
      <nav
        aria-label="Related information"
        className="flex flex-col gap-[22px]"
      >
        <h2 className="text-eyebrow font-bold text-navy">
          RELATED INFORMATION
        </h2>
        {[
          { label: "Before you call", href: destinations.beforeYouCall },
          { label: "Emergency services", href: destinations.emergency },
          { label: "Safety resources", href: destinations.safety },
        ].map((link) => (
          <TextLink
            key={link.href}
            href={link.href}
            className="text-sm text-navy"
          >
            {link.label} <span aria-hidden="true">→</span>
          </TextLink>
        ))}
      </nav>
      <div className="h-px bg-border" />
      <p className="text-lg font-bold leading-[27px] text-navy">
        Need emergency help?
      </p>
      <p className="text-[32px] font-extrabold leading-[48px] text-navy">
        <a href="tel:112" className="hover:underline">
          112
        </a>{" "}
        /{" "}
        <a href="tel:767" className="hover:underline">
          767
        </a>
      </p>
    </aside>
  );
}
