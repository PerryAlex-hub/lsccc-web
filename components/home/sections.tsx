import type { ReactNode } from "react";
import { ActionLink, TextLink } from "@/components/ui/text-link";
import { assets } from "@/lib/assets";
import {
  agencies,
  gallery,
  informationLinks,
  newsStories,
  resources,
} from "@/lib/home-content";
import { destinations } from "@/lib/navigation";

import { Photograph } from "@/components/ui/photograph";
import { NewsSlider } from "./news-slider";

function SectionHeading({
  children,
  href,
  linkLabel,
}: {
  children: ReactNode;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <h2 className="text-[25px] font-bold leading-[1.45] text-navy">
        {children}
      </h2>
      {href && (
        <TextLink
          href={href}
          className="text-[13px] leading-[19px] xl:w-[248px]"
        >
          {linkLabel} <span aria-hidden="true">→</span>
        </TextLink>
      )}
    </div>
  );
}

function PublicNotices() {
  return (
    <aside
      id="emergency"
      aria-labelledby="notices-title"
      className="flex flex-col gap-[18px] bg-paper p-[26px]"
      data-node-id="34:724"
    >
      <h2 id="notices-title" className="min-h-6 text-base font-bold text-navy">
        PUBLIC NOTICES
      </h2>
      <div className="h-[3px] bg-navy" />
      <h3 className="min-h-[29px] text-xl font-bold leading-[29px]">
        Emergency assistance
      </h3>
      <p className="text-[40px] font-extrabold leading-[67px] text-navy sm:text-[46px]">
        <a href="tel:112" className="hover:underline">
          112
        </a>
        <span className="mx-3">/</span>
        <a href="tel:767" className="hover:underline">
          767
        </a>
      </p>
      <p className="text-[15px] leading-[21.75px] text-muted xl:min-h-[68px]">
        Lagos State emergency lines are available round the clock for distress
        calls requiring immediate assistance.
      </p>
      <ActionLink
        href={destinations.beforeYouCall}
        className="min-h-[53px] bg-navy text-white"
      >
        How to report an emergency{" "}
        <span aria-hidden="true" className="ml-2">
          →
        </span>
      </ActionLink>
      <div className="h-px bg-border" />
      <h3 className="min-h-7 text-[19px] font-bold leading-[27.55px]">
        Keep the lines open
      </h3>
      <p className="text-[15px] leading-[21.75px] text-muted xl:min-h-[68px]">
        The centre has cautioned residents against hoax calls, which obstruct
        access for people needing help.
      </p>
      <p className="min-h-[15px] text-[10px] font-bold leading-[14.5px] text-navy">
        18 MAY 2026 / PUBLIC AWARENESS
      </p>
      <div className="h-px bg-border" />
      <h3 className="min-h-[27px] text-lg font-bold leading-[26.1px]">
        General government feedback
      </h3>
      <p className="text-sm leading-[20.3px] text-muted xl:min-h-[63px]">
        Send non-emergency complaints and suggestions through Lagos State
        Citizens Gate.
      </p>
      <TextLink
        href={destinations.citizensGate}
        className="text-[13px] leading-[19px] text-navy"
      >
        Open Citizens Gate <span aria-hidden="true">↗</span>
      </TextLink>
    </aside>
  );
}

export function HomeHero() {
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
            className="text-[34px] font-bold leading-[1.25] sm:text-[42px] xl:min-h-[184px] xl:text-hero"
          >
            Coordinating emergency response.
            <br />
            Serving the people of Lagos.
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

export function HomeLeadStory() {
  return (
    <section
      id="news"
      aria-labelledby="news-title"
      className="editorial-container py-10 xl:min-h-[913px] xl:py-12"
      data-node-id="34:713"
    >
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <h2 id="news-title" className="text-section font-bold text-navy">
          News &amp; public information
        </h2>
        <TextLink
          href={destinations.news}
          className="text-[13px] leading-[19px] text-navy xl:w-[248px]"
        >
          All centre updates <span aria-hidden="true">→</span>
        </TextLink>
      </div>
      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,884fr)_minmax(0,428fr)]">
        <article className="flex flex-col gap-[14px]" data-node-id="34:718">
          <Photograph
            asset={assets.lermsEngagement}
            className="aspect-[884/430]"
            sizes="(max-width: 1023px) 93vw, (max-width: 1440px) 62vw, 884px"
            nodeId="34:719"
          />
          <p className="min-h-4 text-[11px] font-bold leading-[15.95px] text-navy">
            <time dateTime="2026-05-20">20 MAY 2026</time> / TECHNOLOGY &amp;
            COORDINATION
          </p>
          <h3 className="text-[24px] font-bold leading-[1.45] xl:min-h-[84px] xl:text-section">
            LERMS stakeholder engagement strengthens
            <br className="hidden xl:block" /> Lagos emergency response
            coordination
          </h3>
          <p className="text-body text-muted xl:min-h-[72px]">
            Emergency response agencies and technical partners met in Ikeja to
            strengthen incident reporting, dispatch coordination and shared
            operational information through LERMS.
          </p>
          <TextLink
            href={`${destinations.news}/lerms-stakeholder-engagement`}
            className="text-[13px] leading-[19px] text-navy"
          >
            Read article <span aria-hidden="true">→</span>
          </TextLink>
        </article>
        <PublicNotices />
      </div>
    </section>
  );
}

export function HomeNews() {
  return (
    <section
      id="agency-news"
      aria-labelledby="agency-news-title"
      className="editorial-container py-10 xl:min-h-[669px] xl:py-12"
      data-node-id="34:740"
    >
      <div className="mb-6 h-px bg-border" />
      <h2
        id="agency-news-title"
        className="mb-6 text-[25px] font-bold leading-[37px] text-navy"
      >
        Agency news
      </h2>
      <NewsSlider>
        {newsStories.map((story) => (
          <article
            key={story.nodeId}
            className="news-card flex min-w-0 flex-col gap-3"
            data-node-id={story.nodeId}
          >
            <Photograph
              asset={story.asset}
              className="aspect-[432/244]"
              sizes="(max-width: 767px) 93vw, (max-width: 1440px) 30vw, 432px"
              nodeId={story.imageNodeId}
            />
            <time
              dateTime={story.dateTime}
              className="min-h-[15px] text-[10px] font-bold leading-[14.5px] text-navy"
            >
              {story.date}
            </time>
            <h3 className="text-[22px] font-bold leading-[31.9px] xl:min-h-[66px]">
              {story.titleLines[0]}
              <br className="hidden xl:block" /> {story.titleLines[1]}
            </h3>
            <p className="text-[15px] leading-[21.75px] text-muted xl:min-h-[68px]">
              {story.description}
            </p>
            <p className="min-h-[15px] text-[10px] font-medium leading-[14.5px] text-muted">
              SOURCE: {story.source}
            </p>
            <TextLink
              href={story.href}
              className="text-[13px] leading-[19px] text-navy"
              ariaLabel={`Read article: ${story.title}`}
            >
              Read article <span aria-hidden="true">→</span>
            </TextLink>
          </article>
        ))}
      </NewsSlider>
    </section>
  );
}

export function HomeAbout() {
  return (
    <section
      id="home-about"
      aria-labelledby="about-title"
      className="bg-paper"
      data-node-id="34:765"
    >
      <div className="editorial-container grid gap-10 py-10 lg:grid-cols-[minmax(0,824fr)_minmax(0,472fr)] xl:min-h-[774px] xl:gap-12 xl:py-12">
        <div className="flex flex-col gap-5">
          <p className="min-h-[18px] text-eyebrow font-bold text-navy">
            ABOUT THE AGENCY
          </p>
          <h2
            id="about-title"
            className="text-[27px] font-bold leading-[39.15px]"
          >
            Lagos State Command &amp; Control Centre
          </h2>
          <p className="text-body text-muted xl:min-h-24">
            Established in 2010, LSCCC is the state’s central hub for emergency
            communication and coordination. From its Ikeja headquarters, the
            centre connects incident information with agencies responsible for
            emergency management, fire and rescue, traffic, ambulance services
            and public safety.
          </p>
          <p id="home-mandate" className="text-body text-muted xl:min-h-[72px]">
            Its role combines emergency call handling, interagency communication
            and operational coordination. Specialist response agencies provide
            the assistance required on the ground.
          </p>
          <div className="h-px bg-border" />
          <dl className="grid gap-6 sm:grid-cols-[220fr_276fr_280fr]">
            {[
              { value: "2010", label: "Year of establishment" },
              { value: "112 & 767", label: "Published emergency lines" },
              { value: "Ikeja", label: "Lagos State, Nigeria" },
            ].map((fact) => (
              <div key={fact.value} className="space-y-4">
                <dt className="text-section font-bold text-navy">
                  {fact.value}
                </dt>
                <dd className="text-xs font-medium leading-[18px] text-muted">
                  {fact.label}
                </dd>
              </div>
            ))}
          </dl>
          <TextLink
            href={destinations.mandate}
            className="text-sm leading-[21px] text-navy"
          >
            About the centre and its mandate <span aria-hidden="true">→</span>
          </TextLink>
          <div className="h-px bg-border" />
          <h3 className="text-lg font-bold leading-[27px] text-navy">
            Management
          </h3>
          <p className="text-[15px] leading-[21.75px] text-muted xl:min-h-[70px]">
            Mr. Femi Kennedy Giwa serves as General Manager. The centre’s
            institutional engagements include road safety collaboration,
            response-agency coordination and stakeholder training on LERMS.
          </p>
        </div>
        <aside
          aria-label="Agency information"
          className="flex flex-col gap-[18px] self-start bg-white p-7"
        >
          <h3 className="min-h-[22px] text-[15px] font-bold text-navy">
            AGENCY INFORMATION
          </h3>
          {informationLinks.map((link) => (
            <div
              key={link.title}
              className="flex flex-col gap-[18px] border-b border-border pb-[18px]"
            >
              <TextLink
                href={link.href}
                className="text-[17px] leading-[25px] text-navy"
              >
                {link.title} <span aria-hidden="true">→</span>
              </TextLink>
              <p className="text-[13px] leading-[18.85px] text-muted xl:min-h-10">
                {link.description}
              </p>
            </div>
          ))}
        </aside>
      </div>
    </section>
  );
}

export function HomePartners() {
  return (
    <section
      id="home-partners"
      aria-labelledby="partners-title"
      className="editorial-container flex flex-col gap-6 py-10 xl:min-h-[456px] xl:py-12"
      data-node-id="34:801"
    >
      <p className="min-h-[18px] text-eyebrow font-bold text-navy">
        RESPONSE NETWORK
      </p>
      <h2
        id="partners-title"
        className="text-[26px] font-bold leading-[37.7px]"
      >
        Agencies supporting coordinated emergency response
      </h2>
      <div className="grid gap-8 lg:grid-cols-2 xl:gap-12">
        {[agencies.slice(0, 3), agencies.slice(3)].map((column, index) => (
          <div key={index} className="flex flex-col gap-5">
            {column.map((agency) => (
              <div
                key={agency.abbreviation}
                className="flex flex-col gap-3 border-b border-border pb-5 sm:flex-row sm:gap-5"
              >
                <p className="w-fit bg-paper p-4 text-[13px] font-bold leading-[19px] text-navy sm:w-[132px] sm:shrink-0">
                  {agency.abbreviation}
                </p>
                <div className="space-y-[6px]">
                  <h3 className="text-base font-bold leading-6">
                    {agency.name}
                  </h3>
                  <p className="text-sm leading-[21px] text-muted">
                    {agency.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

export function HomeGallery() {
  return (
    <section
      aria-label="Photographs from the centre"
      className="bg-paper"
      data-node-id="34:849"
    >
      <div className="editorial-container space-y-6 py-10 xl:min-h-[446px] xl:py-12">
        <SectionHeading href={destinations.news} linkLabel="News & media">
          From the centre
        </SectionHeading>
        <div className="grid gap-8 md:grid-cols-3 md:gap-6">
          {gallery.map((item) => (
            <figure key={item.imageNodeId} className="space-y-[10px]">
              <Photograph
                asset={item.asset}
                className="aspect-[432/232]"
                sizes="(max-width: 767px) 93vw, (max-width: 1440px) 30vw, 432px"
                nodeId={item.imageNodeId}
              />
              <figcaption className="space-y-[10px]">
                <p className="text-[15px] font-semibold leading-[22px]">
                  {item.caption}
                </p>
                <p className="text-[10px] font-medium leading-[15px] text-muted">
                  {item.date}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HomeResources() {
  return (
    <section
      id="resources"
      aria-labelledby="resources-title"
      className="editorial-container grid gap-10 py-10 lg:grid-cols-[minmax(0,568fr)_minmax(0,728fr)] xl:min-h-[500px] xl:gap-12 xl:py-12"
      data-node-id="34:866"
    >
      <figure className="space-y-4">
        <Photograph
          asset={assets.operations}
          className="aspect-[568/284]"
          sizes="(max-width: 1023px) 93vw, (max-width: 1440px) 40vw, 568px"
          nodeId="34:869"
        />
        <figcaption className="space-y-4">
          <h3 className="text-base font-bold leading-6">
            Emergency call agents at the centre
          </h3>
          <p className="text-sm leading-[20.3px] text-muted xl:min-h-16">
            LSCCC manages communication through Lagos State’s emergency
            helplines and coordinates with relevant response agencies.
          </p>
        </figcaption>
      </figure>
      <div className="space-y-4">
        <p className="text-eyebrow font-bold text-navy">PUBLIC INFORMATION</p>
        <h2
          id="resources-title"
          className="text-[26px] font-bold leading-[37.7px]"
        >
          Guides, enquiries &amp; government services
        </h2>
        {resources.map((resource) => (
          <div
            id={resource.id}
            key={resource.id}
            className="grid gap-3 border-b border-border pb-4 sm:grid-cols-[minmax(0,252fr)_minmax(0,456fr)] sm:gap-5"
          >
            <TextLink
              href={resource.href}
              className="text-base leading-6 text-navy"
            >
              {resource.title}{" "}
              <span aria-hidden="true">
                {resource.href.startsWith("https://") ? "↗" : "→"}
              </span>
            </TextLink>
            <p className="text-sm leading-[20.3px] text-muted xl:min-h-[42px]">
              {resource.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
