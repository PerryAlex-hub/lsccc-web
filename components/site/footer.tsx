import Image from "next/image";
import { assets } from "@/lib/assets";
import { destinations } from "@/lib/navigation";
import { TextLink } from "@/components/ui/text-link";

const groups = [
  {
    title: "THE CENTRE",
    links: [
      { label: "About LSCCC", href: destinations.about },
      { label: "Our mandate", href: destinations.mandate },
      { label: "Partner agencies", href: destinations.partners },
      { label: "News & media", href: destinations.news },
    ],
  },
  {
    title: "PUBLIC RESOURCES",
    links: [
      { label: "Emergency services", href: destinations.emergency },
      { label: "Safety & preparedness", href: destinations.safety },
      { label: "Before you call", href: destinations.beforeYouCall },
      { label: "Lagos State services", href: destinations.governmentServices },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer
      id="site-footer"
      className="bg-navy text-white"
      data-node-id="17:74"
    >
      <div className="site-container section-space space-y-10">
        <div className="grid gap-10 sm:grid-cols-2 xl:grid-cols-[424fr_240fr_264fr_240fr] xl:gap-12">
          <div className="space-y-4">
            <Image
              src={assets.lagosCrest.image}
              alt={assets.lagosCrest.alt}
              width={62}
              height={62}
              className="size-[62px] object-contain"
            />
            <p className="min-h-[70px] text-[23px] font-bold leading-[33.35px]">
              Lagos State
              <br />
              Command &amp; Control Centre
            </p>
            <p className="min-h-12 text-sm leading-[20.3px]">
              Emergency communication and coordination
              <br className="hidden xl:block" /> for the people of Lagos State.
            </p>
          </div>
          {groups.map((group) => (
            <nav
              key={group.title}
              aria-label={group.title}
              className="space-y-4"
            >
              <h2 className="text-eyebrow font-bold text-gold">
                {group.title}
              </h2>
              <ul className="text-sm leading-[20.3px]">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <TextLink
                      href={link.href}
                      className="inline-block py-1 font-normal sm:py-0"
                    >
                      {link.label}
                    </TextLink>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
          <div className="space-y-4">
            <h2 className="text-eyebrow font-bold text-gold">GET IN TOUCH</h2>
            <div className="text-sm leading-[20.3px]">
              <p>
                Emergency:{" "}
                <a href="tel:112" className="hover:underline">
                  112
                </a>{" "}
                /{" "}
                <a href="tel:767" className="hover:underline">
                  767
                </a>
              </p>
              <p>Available 24 hours</p>
              <address className="not-italic">
                Governor’s Road, opposite the Deputy Governor’s Office, Alausa,
                Ikeja, Lagos State, Nigeria.
              </address>
              <TextLink
                href={destinations.contact}
                className="inline-block py-1 font-normal sm:py-0"
              >
                Contact the centre
              </TextLink>
            </div>
          </div>
        </div>
        <div className="h-px bg-[#42615a]" />
        <div className="flex flex-col gap-5 text-[11px] leading-[15.95px] sm:flex-row sm:gap-6">
          <p className="flex-1">© Lagos State Command &amp; Control Centre</p>
          <div className="flex flex-wrap gap-5 xl:w-[458px]">
            <span>Privacy</span>
            <a href="#main-content" className="hover:underline">
              Accessibility
            </a>
            <a
              href={destinations.government}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              lagosstate.gov.ng
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
