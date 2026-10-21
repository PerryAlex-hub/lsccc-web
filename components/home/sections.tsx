import { getPublishedNews } from "@/lib/news/repository";
import { getPublicNotices, getWebsitePage } from "@/lib/cms/public";
import { ActionLink, TextLink } from "@/components/ui/text-link";
import { Photograph } from "@/components/ui/photograph";
import { assets } from "@/lib/assets";
import { destinations } from "@/lib/navigation";
import { NewsSlider } from "./news-slider";
import { SectionHeading } from "./section-heading";

export { HomeAbout, HomeGallery, HomeResources } from "./information-sections";
export { HomePartners } from "./response-network";
export { HomeServiceLinks } from "./service-links";

async function PublicNotices() {
  const notices = await getPublicNotices();

  return (
    <aside
      id="emergency"
      aria-labelledby="notices-title"
      className="border border-border bg-paper"
    >
      <div className="border-b border-border px-6 py-5">
        <p className="mb-2 text-[11px] font-bold tracking-[0.14em] text-blue">
          INFORMATION DESK
        </p>
        <h3 id="notices-title" className="text-xl font-bold text-navy">
          Public notices
        </h3>
      </div>
      <div className="px-6">
        {notices.map((notice) => (
          <article
            key={notice.id}
            className="border-b border-border py-5 last:border-0"
          >
            <h4 className="text-sm font-bold leading-6 text-navy">
              {notice.title}
            </h4>
            {notice.key === "emergency-lines" && (
              <p className="mt-3 flex flex-wrap items-center gap-3 text-3xl font-bold text-blue">
                <a href="tel:112">112</a>
                <span className="text-lg font-normal text-muted">/</span>
                <a href="tel:767">767</a>
              </p>
            )}
            <p className="mt-3 text-sm leading-6 text-muted">
              {notice.summary}
            </p>
            {notice.body && notice.body !== notice.summary && (
              <p className="mt-3 whitespace-pre-line text-sm leading-6 text-muted">
                {notice.body}
              </p>
            )}
            {notice.url && (
              <TextLink
                href={notice.url}
                className="mt-3 inline-block text-xs text-blue"
              >
                More information <span aria-hidden="true">→</span>
              </TextLink>
            )}
          </article>
        ))}
        {!notices.length && (
          <p className="py-6 text-sm leading-6 text-muted">
            No current public notices. For urgent assistance, call 112 or 767.
          </p>
        )}
      </div>
      <div className="border-t border-border bg-white px-6 py-5">
        <TextLink
          href={destinations.citizensGate}
          className="text-xs text-blue"
        >
          Visit Lagos Citizens Gate <span aria-hidden="true">↗</span>
        </TextLink>
      </div>
    </aside>
  );
}

export async function HomeLeadStory() {
  const article = (await getPublishedNews())[0];

  return (
    <section
      id="news"
      aria-labelledby="news-title"
      className="editorial-container py-14 md:py-20"
    >
      <SectionHeading
        id="news-title"
        eyebrow="LATEST FROM LSCCC"
        title="News & public information"
        href={destinations.news}
        linkLabel="View all updates"
      />
      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.8fr)_minmax(0,1fr)] lg:gap-10">
        {article ? (
          <article>
            <Photograph
              asset={article.asset}
              className="aspect-[16/9]"
              sizes="(max-width: 1023px) 92vw, 60vw"
            />
            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] font-bold tracking-wide">
              <span className="border-l-2 border-gold pl-3 text-blue">
                {article.category}
              </span>
              <time dateTime={article.dateTime} className="text-muted">
                {article.date}
              </time>
            </div>
            <h3 className="mt-4 max-w-3xl text-[clamp(1.35rem,2.2vw,1.85rem)] font-bold leading-[1.4] tracking-[-0.02em] text-navy">
              <TextLink href={`${destinations.news}/${article.slug}`}>
                {article.title}
              </TextLink>
            </h3>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-muted sm:text-base">
              {article.description}
            </p>
            <TextLink
              href={`${destinations.news}/${article.slug}`}
              className="mt-5 inline-block text-sm text-blue"
            >
              Read the full story{" "}
              <span aria-hidden="true" className="ml-2">
                →
              </span>
            </TextLink>
          </article>
        ) : (
          <p className="text-muted">No published news yet.</p>
        )}
        <PublicNotices />
      </div>
    </section>
  );
}

export async function HomeNews() {
  const newsStories = (await getPublishedNews()).slice(1, 7);

  return (
    <section
      id="agency-news"
      aria-labelledby="agency-news-title"
      className="border-t border-border bg-paper"
    >
      <div className="editorial-container py-14 md:py-20">
        <SectionHeading
          id="agency-news-title"
          eyebrow="ACROSS THE RESPONSE NETWORK"
          title="Agency news"
          description="The latest engagements, training and updates from the centre and its response partners."
          href={destinations.news}
          linkLabel="News & media"
        />
        <NewsSlider>
          {newsStories.map((story) => (
            <article
              key={story.slug}
              className="news-card flex min-w-0 flex-col border border-border bg-white"
            >
              <Photograph
                asset={story.asset}
                className="aspect-[16/10]"
                sizes="(max-width: 767px) 85vw, (max-width: 1023px) 44vw, 30vw"
              />
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[10px] font-bold tracking-wide">
                  <span className="text-blue">{story.category}</span>
                  <time dateTime={story.dateTime} className="text-muted">
                    {story.date}
                  </time>
                </div>
                <h3 className="mt-4 text-lg font-bold leading-7 text-navy line-clamp-3">
                  {story.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted line-clamp-3">
                  {story.description}
                </p>
                <TextLink
                  href={`${destinations.news}/${story.slug}`}
                  className="mt-auto inline-block pt-6 text-xs text-blue"
                  ariaLabel={`Read article: ${story.title}`}
                >
                  Read article{" "}
                  <span aria-hidden="true" className="ml-2">
                    →
                  </span>
                </TextLink>
              </div>
            </article>
          ))}
        </NewsSlider>
      </div>
    </section>
  );
}

export async function HomeHero() {
  const page = await getWebsitePage("/");
  const introduction = page?.introduction ?? "";
  const sentenceEnd = introduction.search(/[.!?]\s+/);
  const opening =
    sentenceEnd >= 0
      ? introduction.slice(0, sentenceEnd + 1).trim()
      : introduction;
  const closing =
    sentenceEnd >= 0 ? introduction.slice(sentenceEnd + 1).trim() : "";
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate min-h-[570px] bg-navy text-white"
      data-node-id="43:760"
    >
      <Photograph
        asset={assets.operations}
        className="absolute inset-0 -z-20"
        sizes="100vw"
        nodeId="43:761"
        preload
      />
      <div
        className="hero-overlay absolute inset-0 -z-10"
        data-node-id="43:762"
      />
      <div className="site-container py-12 xl:pt-[62px] xl:pb-[77px]">
        <div className="hero-entrance flex max-w-[810px] flex-col gap-[18px]">
          <p className="min-h-5 text-xs font-bold leading-[18px] text-gold sm:text-sm">
            LAGOS STATE COMMAND &amp; CONTROL CENTRE
          </p>
          <h1
            id="hero-heading"
            className="max-w-full text-[clamp(1.375rem,calc(0.875rem_+_2.6vw),3rem)] font-bold leading-[1.25] tracking-[-0.015em] sm:leading-[1.18] sm:text-balance [overflow-wrap:anywhere]"
          >
            <span className="block text-balance sm:inline">{opening}</span>
            {closing && (
              <>
                <span className="hidden sm:inline"> </span>
                <span className="mt-2 block text-balance sm:mt-0 sm:inline">
                  {closing}
                </span>
              </>
            )}
          </h1>
          <p className="text-base leading-6 sm:text-[19px] xl:min-h-[58px]">
            Connecting emergency calls with the agencies that respond.
            <br className="hidden sm:block" /> For urgent assistance anywhere in
            Lagos, call 112 or 767.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <ActionLink
              href={destinations.emergency}
              className="min-h-14 bg-blue px-[22px] text-base sm:w-[264px]"
            >
              Emergency services{" "}
              <span aria-hidden="true" className="ml-2">
                →
              </span>
            </ActionLink>
            <ActionLink
              href={destinations.about}
              className="min-h-14 border border-white px-[22px] text-base sm:w-[216px]"
            >
              About the centre{" "}
              <span aria-hidden="true" className="ml-2">
                →
              </span>
            </ActionLink>
          </div>
          <div className="h-px max-w-[760px] bg-white" />
          <p className="min-h-[22px] text-xs font-bold leading-[18px] sm:text-sm">
            24 HOURS A DAY{" "}
            <span aria-hidden="true" className="mx-2">
              •
            </span>{" "}
            EMERGENCY LINES:{" "}
            <a href="tel:112" className="hover:underline">
              112
            </a>{" "}
            /{" "}
            <a href="tel:767" className="hover:underline">
              767
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
