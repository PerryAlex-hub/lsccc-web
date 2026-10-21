import { getSiteSettings } from "@/lib/cms/public";
import Image from "next/image";
import { assets } from "@/lib/assets";
import { destinations, socialLinks } from "@/lib/navigation";
import { TextLink } from "@/components/ui/text-link";
import { SocialIcon } from "@/components/ui/social-icons";
import { publicContact } from "@/lib/content/contact";

const groups = [
  {
    title: "The centre",
    links: [
      { label: "About LSCCC", href: destinations.about },
      { label: "Our mandate", href: destinations.mandate },
      { label: "Partner agencies", href: destinations.partners },
      { label: "News & media", href: destinations.news },
    ],
  },
  {
    title: "Public resources",
    links: [
      { label: "Emergency services", href: destinations.emergency },
      { label: "Safety & preparedness", href: destinations.safety },
      { label: "Before you call", href: destinations.beforeYouCall },
      { label: "Lagos State services", href: destinations.governmentServices },
    ],
  },
] as const;

export async function SiteFooter() {
  const settings = await getSiteSettings();
  const [emailLocalPart, emailDomain] = publicContact.email.split("@");

  return (
    <footer
      id="site-footer"
      className="border-t-4 border-gold bg-navy text-white [&_a:focus-visible]:outline-gold"
      data-node-id="17:74"
    >
      <div className="site-container">
        <div className="grid items-center gap-8 border-b border-white/20 py-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-16 lg:py-12">
          <div className="flex min-w-0 items-start gap-4 sm:gap-6">
            <Image
              src={assets.lscccEmblem.image}
              alt={assets.lscccEmblem.alt}
              width={72}
              height={72}
              className="size-14 shrink-0 rounded-full object-cover sm:size-[72px]"
            />
            <div className="min-w-0 max-w-xl">
              <p className="text-[clamp(1.2rem,2.2vw,1.75rem)] font-bold leading-[1.35] tracking-tight text-balance">
                {settings.siteName}
              </p>
              <p className="mt-3 max-w-md text-sm leading-7 text-white/75">
                Emergency communication and coordination for the people of Lagos
                State.
              </p>
            </div>
          </div>
          <div className="min-w-0 border-l-2 border-gold bg-white/5 px-5 py-4 sm:px-6">
            <p className="text-[11px] font-bold tracking-[0.12em] text-gold">
              EMERGENCY ASSISTANCE · 24 HOURS
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <a
                href="tel:112"
                aria-label="Call emergency line 112"
                className="inline-flex min-h-11 items-center py-1 text-3xl font-bold tabular-nums underline-offset-4 hover:underline"
              >
                112
              </a>
              <span aria-hidden="true" className="text-xl text-white/50">
                /
              </span>
              <a
                href="tel:767"
                aria-label="Call emergency line 767"
                className="inline-flex min-h-11 items-center py-1 text-3xl font-bold tabular-nums underline-offset-4 hover:underline"
              >
                767
              </a>
              <span className="ml-auto text-xs text-white/75">Toll-free</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-9 py-10 sm:gap-x-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-16 lg:py-12">
          {groups.map((group) => (
            <nav key={group.title} aria-label={group.title} className="min-w-0">
              <h2 className="mb-3 min-h-12 text-xs font-bold uppercase leading-6 sm:min-h-6 tracking-[0.1em] text-gold">
                {group.title}
              </h2>
              <ul className="space-y-1">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <TextLink
                      href={link.href}
                      className="inline-flex min-h-16 max-w-full items-center py-2 text-sm font-normal sm:min-h-11 leading-6 text-white/80 hover:text-gold"
                    >
                      {link.label}
                    </TextLink>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
          <div className="col-span-2 min-w-0 border-t border-white/20 pt-8 lg:col-span-1 lg:border-t-0 lg:pt-0">
            <h2 className="mb-4 text-xs font-bold uppercase leading-6 tracking-[0.1em] text-gold">
              Get in touch
            </h2>
            <address className="max-w-md text-sm not-italic leading-7 text-white/80">
              {settings.address}
            </address>
            <a
              href={`mailto:${publicContact.email}`}
              className="mt-3 inline-block min-h-11 max-w-full py-3 text-sm leading-6 text-white underline decoration-white/35 underline-offset-4 [overflow-wrap:anywhere] hover:text-gold"
            >
              {emailLocalPart}
              <wbr />@{emailDomain}
            </a>
            <div>
              <TextLink
                href={destinations.contact}
                className="inline-flex min-h-11 items-center gap-3 py-2 text-sm text-white hover:text-gold"
              >
                Contact the centre <span aria-hidden="true">→</span>
              </TextLink>
            </div>
            <div className="mt-5">
              <h2 className="mb-3 text-xs font-bold uppercase leading-6 tracking-[0.1em] text-gold">
                Follow us
              </h2>
              <ul className="flex items-center gap-3">
                {socialLinks.map((social) => (
                  <li key={social.href}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${social.label} (opens in a new tab)`}
                      className="flex size-11 items-center justify-center rounded-full border border-white/25 text-white hover:border-gold hover:text-gold"
                    >
                      <SocialIcon platform={social.platform} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/20 py-5 text-xs leading-6 text-white/65 md:flex-row md:items-center md:justify-between md:gap-8">
          <p className="min-w-0">© {settings.siteName}</p>
          <div className="flex shrink-0 flex-wrap items-center gap-x-6 gap-y-1">
            <a
              href="#main-content"
              className="inline-flex min-h-11 items-center py-2 hover:text-white hover:underline"
            >
              Back to content{" "}
              <span aria-hidden="true" className="ml-2">
                ↑
              </span>
            </a>
            <a
              href={destinations.government}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 py-2 hover:text-white hover:underline"
            >
              lagosstate.gov.ng <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
