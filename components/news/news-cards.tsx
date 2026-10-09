import { Photograph } from "@/components/ui/photograph";
import { Section, SectionIntro } from "@/components/ui/section";
import { TextLink } from "@/components/ui/text-link";
import { assets } from "@/lib/assets";
import {
  centreUpdates,
  infrastructureArticle,
  articleHref,
} from "@/lib/content/news";

export function FeaturedUpdate() {
  return (
    <Section
      nodeId="20:218"
      className="grid items-start gap-10 lg:grid-cols-[720fr_552fr]"
    >
      <figure className="min-w-0 space-y-4">
        <Photograph
          asset={assets.operations}
          className="aspect-[720/405]"
          sizes="(max-width: 1023px) 92vw, (max-width: 1440px) 50vw, 720px"
          nodeId="20:221"
          preload
        />
        <figcaption className="text-xs font-medium leading-[18px] text-muted">
          LSCCC call agents at work • Centre operations
        </figcaption>
      </figure>
      <div className="flex flex-col gap-5">
        <p className="text-eyebrow font-bold text-navy">
          INFRASTRUCTURE / JUNE 2025
        </p>
        <h2 className="whitespace-pre-line text-[28px] font-extrabold leading-[1.5] sm:text-[34px]">
          {infrastructureArticle.displayTitle}
        </h2>
        <p className="text-[17px] leading-[26px] text-muted">
          Technology and infrastructure upgrades support the Command &amp;
          Control Centre’s role in coordinating emergency services.
        </p>
        <p className="text-xs font-medium leading-[18px] text-muted">
          Source: Lagos State Government
        </p>
        <TextLink href={articleHref} className="text-sm text-navy">
          Read the update <span aria-hidden="true">→</span>
        </TextLink>
      </div>
    </Section>
  );
}

export function ReportedUpdates({
  updates,
}: {
  updates: readonly (typeof centreUpdates)[number][];
}) {
  return (
    <Section tone="paper" nodeId="20:230" className="space-y-6">
      <SectionIntro
        eyebrow="MORE FROM THE CENTRE"
        title="Partnerships & capacity building"
        titleClassName="text-[26px] leading-[1.5] sm:text-[30px]"
      />
      <div className="space-y-6">
        {updates.map((update) => (
          <article
            key={update.id}
            className="grid items-start gap-6 bg-white p-7 md:grid-cols-[244px_minmax(0,1fr)] xl:grid-cols-[244px_132px_minmax(0,620fr)_minmax(0,164fr)] xl:gap-8"
          >
            <Photograph
              asset={update.asset}
              className="aspect-[244/164]"
              sizes="(max-width: 767px) 88vw, 244px"
              nodeId={update.imageNodeId}
            />
            <div className="space-y-4 md:col-start-2 xl:col-start-auto">
              <p className="text-[11px] font-bold leading-[17px] text-navy uppercase xl:min-h-[35px]">
                {update.category}
              </p>
              <time
                dateTime={update.dateTime}
                className="block text-sm font-medium leading-[21px] text-muted xl:min-h-[39px]"
              >
                {update.date}
              </time>
            </div>
            <div className="space-y-4 md:col-start-2 xl:col-start-auto">
              <h3 className="text-[25px] font-bold leading-[38px] xl:min-h-[76px]">
                {update.title}
              </h3>
              <p className="text-base leading-6 text-muted xl:min-h-[72px]">
                {update.description}
              </p>
              <p className="text-xs font-medium leading-[18px] text-muted xl:min-h-6">
                Reported by {update.source}
              </p>
            </div>
            <TextLink
              href={update.href}
              className="text-[13px] leading-[19px] text-navy md:col-start-2 xl:col-start-auto"
              ariaLabel={`Read source: ${update.title}`}
            >
              Read source <span aria-hidden="true">↗</span>
            </TextLink>
          </article>
        ))}
      </div>
    </Section>
  );
}
