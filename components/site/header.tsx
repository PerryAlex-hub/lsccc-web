import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { assets } from "@/lib/assets";
import { destinations, navigation } from "@/lib/navigation";
import { SiteNavigation } from "./navigation";

export function SiteHeader() {
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
          <div className="hidden items-center gap-5 md:flex xl:w-[492px]">
            <a href="#main-content" className="hover:underline">
              Accessibility
            </a>
            <span>English</span>
            <Link href={destinations.contact} className="hover:underline">
              Contact us
            </Link>
          </div>
        </div>
      </div>
      <div className="site-container flex flex-wrap items-center gap-5 py-6 xl:flex-nowrap xl:gap-6 xl:py-8">
        <Link
          href="/"
          aria-label="Lagos State Command & Control Centre home"
          className="shrink-0"
        >
          <Image
            src={assets.lagosCrest.image}
            alt={assets.lagosCrest.alt}
            width={76}
            height={76}
            className="size-14 object-contain sm:size-[76px]"
          />
        </Link>
        <div className="min-w-0 flex-1 space-y-2 xl:space-y-4">
          <p className="text-[11px] font-bold leading-[19px] text-navy sm:text-[13px]">
            LAGOS STATE
          </p>
          <Link
            href="/"
            className="block text-[21px] font-extrabold leading-[1.3] text-ink sm:text-[30px] xl:leading-[44px]"
          >
            Command &amp; Control Centre
          </Link>
          <p className="hidden text-[13px] leading-[19px] text-muted sm:block">
            Coordinating emergency response. Serving the people of Lagos.
          </p>
        </div>
        <div className="flex w-full items-center gap-4 border-t border-border pt-4 sm:ml-auto sm:w-auto sm:border-0 sm:pt-0 xl:gap-6">
          <Image
            src={assets.lscccEmblem.image}
            alt={assets.lscccEmblem.alt}
            width={80}
            height={80}
            className="size-12 object-contain sm:size-16 xl:size-20"
          />
          <div className="space-y-1 xl:w-[294px]">
            <p className="text-[10px] font-bold leading-[16px] text-muted xl:text-[11px]">
              24-HOUR EMERGENCY LINES
            </p>
            <p className="text-[26px] font-extrabold leading-[43px] text-navy xl:text-[29px]">
              <a
                href="tel:112"
                aria-label="Call emergency line 112"
                className="hover:underline"
              >
                112
              </a>
              <span className="mx-3">/</span>
              <a
                href="tel:767"
                aria-label="Call emergency line 767"
                className="hover:underline"
              >
                767
              </a>
            </p>
          </div>
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
