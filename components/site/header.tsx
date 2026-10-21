import { getSiteSettings } from "@/lib/cms/public";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { assets } from "@/lib/assets";
import { destinations, navigation, socialLinks } from "@/lib/navigation";
import { mandates } from "@/lib/content/about";
import { SocialIcon } from "@/components/ui/social-icons";
import { SiteNavigation } from "./navigation";
import { RotatingTagline } from "./rotating-tagline";

export async function SiteHeader() {
  const settings = await getSiteSettings();
  return (
    <header data-node-id="34:682">
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-50 -translate-y-32 bg-gold px-5 py-3 font-bold text-ink focus:translate-y-0"
      >
        Skip to main content
      </a>
      <div aria-hidden="true" className="grid h-[6px] grid-cols-4">
        <span className="bg-red" />
        <span className="bg-blue" />
        <span className="bg-gold" />
        <span className="bg-green" />
      </div>
      <div className="bg-navy text-white">
        <div className="site-container flex min-h-[38px] flex-wrap items-center justify-between gap-x-6 gap-y-2 py-2 text-[10px] leading-[15.95px] sm:text-[11px]">
          <a
            href={destinations.government}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold hover:underline"
          >
            LAGOS STATE GOVERNMENT <span className="mx-1">/</span> OFFICIAL
            AGENCY PORTAL
          </a>
          <div className="hidden items-center gap-5 md:flex">
            <ul className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <li key={social.href}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${social.label} (opens in a new tab)`}
                    className="flex size-6 items-center justify-center text-white/75 hover:text-gold"
                  >
                    <SocialIcon platform={social.platform} className="size-[15px]" />
                  </a>
                </li>
              ))}
            </ul>
            <span aria-hidden="true" className="h-4 w-px bg-white/25" />
            <span>English</span>
            <Link href={destinations.contact} className="hover:underline">
              Contact us
            </Link>
          </div>
        </div>
      </div>
      <div className="site-container grid gap-3 py-4 xl:grid-cols-[minmax(0,1fr)_auto] xl:items-center xl:gap-8 xl:py-7">
        <Link
          href="/"
          aria-label="Lagos State Command & Control Centre home"
          className="grid min-w-0 grid-cols-[48px_minmax(0,1fr)_48px] items-center gap-3 sm:grid-cols-[64px_minmax(0,1fr)_64px] sm:gap-5 xl:grid-cols-[76px_minmax(0,1fr)_80px] xl:gap-6"
        >
          <Image
            src={assets.lagosCrest.image}
            alt={assets.lagosCrest.alt}
            width={76}
            height={76}
            className="size-12 object-contain sm:size-16 xl:size-[76px]"
          />
          <div className="min-w-0 space-y-1 xl:space-y-3">
            <p className="text-[10px] font-bold leading-4 text-navy sm:text-xs xl:text-[13px]">
              LAGOS STATE
            </p>
            <p className="text-[clamp(1rem,calc(0.5rem_+_2.6vw),1.875rem)] font-bold leading-[1.3] tracking-tight text-navy text-balance [overflow-wrap:anywhere]">
              Command &amp; Control Centre
            </p>
            <p className="hidden text-[13px] leading-6 text-muted xl:block">
              <RotatingTagline
                className="min-h-12"
                messages={[
                  settings.description,
                  ...mandates.map((mandate) => mandate.description),
                ]}
              />
            </p>
          </div>
          <Image
            src={assets.lscccEmblem.image}
            alt={assets.lscccEmblem.alt}
            width={80}
            height={80}
            className="size-12 rounded-full object-cover sm:size-16 xl:size-20"
          />
        </Link>
        <div className="flex min-w-0 items-center justify-between gap-4 border-t border-border pt-2 xl:gap-6 xl:border-0 xl:pt-0">
          <div className="min-w-0">
            <p className="text-[10px] font-bold leading-5 text-navy xl:text-[11px]">
              Emergency helplines
            </p>
            <p className="text-[10px] leading-4 text-muted xl:text-xs">
              Available 24 hours
            </p>
          </div>
          <p className="flex shrink-0 items-center gap-2 text-[22px] font-bold leading-none tabular-nums text-navy xl:text-[28px]">
            <a
              href="tel:112"
              aria-label="Call emergency line 112"
              className="inline-flex min-h-11 items-center hover:underline"
            >
              112
            </a>
            <span aria-hidden="true" className="font-normal text-muted">
              /
            </span>
            <a
              href="tel:767"
              aria-label="Call emergency line 767"
              className="inline-flex min-h-11 items-center hover:underline"
            >
              767
            </a>
          </p>
        </div>
      </div>
      <Suspense fallback={<NavigationFallback />}>
        <SiteNavigation />
      </Suspense>
    </header>
  );
}

function NavigationFallback() {
  return (
    <div className="bg-paper">
      <nav
        aria-label="Main navigation"
        className="site-container flex min-h-[61px] flex-wrap items-center gap-x-7 gap-y-2 py-2 text-sm font-semibold text-navy"
      >
        {navigation.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="py-2 hover:underline"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
