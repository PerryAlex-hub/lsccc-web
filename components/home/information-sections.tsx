import { ActionLink, TextLink } from "@/components/ui/text-link";
import { Photograph } from "@/components/ui/photograph";
import { assets } from "@/lib/assets";
import { gallery, resources } from "@/lib/home-content";
import { destinations } from "@/lib/navigation";
import { SectionHeading } from "./section-heading";

export function HomeAbout() {
  return (
    <section
      id="home-about"
      aria-labelledby="about-title"
      className="bg-navy text-white"
    >
      <div className="editorial-container grid items-center gap-10 py-14 md:py-20 lg:grid-cols-2 lg:gap-16">
        <figure>
          <Photograph
            asset={assets.operations}
            className="aspect-[5/4]"
            sizes="(max-width: 1023px) 92vw, 44vw"
          />
          <figcaption className="mt-4 border-l-2 border-gold pl-4 text-xs leading-6 text-white/75">
            Behind every call: the people connecting Lagos to emergency
            assistance.
          </figcaption>
        </figure>
        <div>
          <p className="mb-4 text-xs font-bold tracking-[0.14em] text-gold">
            ABOUT THE CENTRE
          </p>
          <h2
            id="about-title"
            className="max-w-lg text-[clamp(1.8rem,3vw,2.6rem)] font-bold leading-[1.25] tracking-[-0.025em]"
          >
            Connecting the call.
            <br />
            Coordinating the response.
          </h2>
          <p className="mt-6 text-base leading-8 text-white/80">
            The Lagos State Command &amp; Control Centre brings emergency
            communication and response coordination together. Our call agents
            connect incident information with the agencies equipped to help.
          </p>
          <p id="home-mandate" className="mt-4 text-sm leading-7 text-white/75">
            From emergency management and rescue to ambulance, traffic and
            public safety, the centre supports a coordinated response across
            Lagos State.
          </p>
          <dl className="my-8 grid grid-cols-2 gap-6 border-y border-white/20 py-6">
            <div>
              <dt className="text-3xl font-bold text-gold">24/7</dt>
              <dd className="mt-2 text-xs text-white/75">
                Emergency call handling
              </dd>
            </div>
            <div>
              <dt className="text-3xl font-bold text-gold">112 / 767</dt>
              <dd className="mt-2 text-xs text-white/75">
                Emergency helplines
              </dd>
            </div>
          </dl>
          <TextLink href={destinations.about} className="text-sm text-white">
            Discover our mandate{" "}
            <span aria-hidden="true" className="ml-3">
              →
            </span>
          </TextLink>
        </div>
      </div>
    </section>
  );
}

export function HomeGallery() {
  return (
    <section aria-labelledby="gallery-title" className="bg-paper">
      <div className="editorial-container py-14 md:py-20">
        <SectionHeading
          id="gallery-title"
          eyebrow="OUR WORK IN PICTURES"
          title="Inside the centre. Across the network."
          href={destinations.news}
          linkLabel="Explore news & media"
        />
        <div className="grid gap-8 md:grid-cols-3">
          {gallery.map((item) => (
            <figure key={item.imageNodeId}>
              <Photograph
                asset={item.asset}
                className="aspect-[4/3]"
                sizes="(max-width: 767px) 92vw, 30vw"
              />
              <figcaption className="mt-4 border-l-2 border-gold pl-4">
                <p className="text-base font-bold leading-7 text-navy">
                  {item.caption}
                </p>
                <p className="mt-2 text-xs tracking-wide text-muted">
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
      className="editorial-container py-14 md:py-20"
    >
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div>
          <p className="mb-4 text-xs font-bold tracking-[0.14em] text-blue">
            PUBLIC INFORMATION
          </p>
          <h2
            id="resources-title"
            className="text-[clamp(1.8rem,2.8vw,2.4rem)] font-bold leading-[1.3] tracking-[-0.025em] text-navy"
          >
            The right information.
            <br />
            When you need it.
          </h2>
          <p className="mt-5 max-w-md text-sm leading-7 text-muted">
            Prepare for an emergency, find official guidance or contact the
            centre for a general enquiry.
          </p>
          <ActionLink
            href={destinations.safety}
            className="mt-7 bg-blue text-white"
          >
            Explore safety resources{" "}
            <span aria-hidden="true" className="ml-5">
              →
            </span>
          </ActionLink>
        </div>
        <div className="border-t border-border">
          {resources.map((resource, index) => (
            <div
              id={resource.id}
              key={resource.id}
              className="flex items-start gap-5 border-b border-border py-5"
            >
              <span
                aria-hidden="true"
                className="mt-1 text-xs font-semibold tabular-nums text-blue"
              >
                0{index + 1}
              </span>
              <div className="flex-1">
                <TextLink href={resource.href} className="text-base text-navy">
                  {resource.title}{" "}
                  <span aria-hidden="true" className="ml-2">
                    {resource.href.startsWith("https://") ? "↗" : "→"}
                  </span>
                </TextLink>
                <p className="mt-2 text-sm leading-6 text-muted">
                  {resource.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
