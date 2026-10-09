"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { destinations, navigation } from "@/lib/navigation";
import { SiteSearch } from "./search";

export function SiteNavigation() {
  const pathname = usePathname();
  return <NavigationControls key={pathname} pathname={pathname} />;
}

function NavigationControls({ pathname }: { pathname: string }) {
  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname.startsWith(href.split("#")[0]) ||
        (href === destinations.safety &&
          pathname === destinations.beforeYouCall);
  const [panel, setPanel] = useState<"menu" | "about" | "search" | null>(null);
  const searchButton = useRef<HTMLButtonElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const aboutButton = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const close = () => setPanel(null);

  useEffect(() => {
    if (!panel) {
      return;
    }
    function dismiss(event: PointerEvent) {
      if (
        event.target instanceof Node &&
        !containerRef.current?.contains(event.target)
      ) {
        setPanel(null);
      }
    }
    document.addEventListener("pointerdown", dismiss);
    return () => document.removeEventListener("pointerdown", dismiss);
  }, [panel]);

  return (
    <div
      ref={containerRef}
      className="relative z-20 bg-paper"
      onKeyDown={(event) => {
        if (event.key === "Escape" && panel) {
          (panel === "search"
            ? searchButton
            : panel === "menu"
              ? menuButton
              : aboutButton
          ).current?.focus();
          close();
        }
      }}
    >
      <div className="site-container">
        <nav
          aria-label="Main navigation"
          className="flex min-h-[61px] items-center gap-[30px] text-sm font-semibold text-navy"
        >
          <button
            ref={menuButton}
            type="button"
            aria-controls="mobile-navigation"
            aria-expanded={panel === "menu"}
            onClick={() => setPanel(panel === "menu" ? null : "menu")}
            className="inline-flex min-h-11 items-center gap-3 xl:hidden"
          >
            <span aria-hidden="true" className="text-xl">
              {panel === "menu" ? "×" : "☰"}
            </span>
            {panel === "menu" ? "Close menu" : "Menu"}
          </button>
          <div className="hidden min-h-[61px] items-center gap-[30px] xl:flex xl:basis-[1004px]">
            {navigation.map((item, index) =>
              index === 1 ? (
                <div key={item.label} className="relative basis-[130px]">
                  <button
                    ref={aboutButton}
                    type="button"
                    aria-expanded={panel === "about"}
                    aria-controls="about-navigation"
                    aria-current={isActive(item.href) ? "page" : undefined}
                    onClick={() => setPanel(panel === "about" ? null : "about")}
                    className="min-h-11 whitespace-nowrap hover:underline hover:underline-offset-4 aria-[current=page]:underline aria-[current=page]:underline-offset-4"
                  >
                    About us{" "}
                    <span aria-hidden="true" className="ml-2">
                      ▾
                    </span>
                  </button>
                  {panel === "about" && (
                    <div
                      id="about-navigation"
                      className="absolute left-0 top-full w-64 border border-border bg-white py-2 shadow-lg"
                    >
                      {[
                        { label: "About the centre", href: destinations.about },
                        { label: "Our mandate", href: destinations.mandate },
                        {
                          label: "Partner agencies",
                          href: destinations.partners,
                        },
                      ].map((link) => (
                        <Link
                          key={link.label}
                          href={link.href}
                          onClick={close}
                          className="block px-5 py-3 hover:bg-paper"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  onClick={close}
                  className={`${["basis-[64px]", "", "basis-[210px]", "basis-[180px]", "basis-[160px]", "basis-[110px]"][index]} flex min-h-11 items-center whitespace-nowrap hover:underline hover:underline-offset-4 aria-[current=page]:underline aria-[current=page]:underline-offset-4`}
                >
                  {item.label}
                </Link>
              ),
            )}
          </div>
          <button
            ref={searchButton}
            type="button"
            aria-expanded={panel === "search"}
            aria-controls="site-search"
            onClick={() => setPanel(panel === "search" ? null : "search")}
            className="ml-auto inline-flex min-h-11 items-center gap-2 whitespace-nowrap xl:ml-0 xl:basis-[188px]"
          >
            Search{" "}
            <span aria-hidden="true" className="text-lg">
              ⌕
            </span>
          </button>
        </nav>
        {panel === "menu" && (
          <nav
            id="mobile-navigation"
            aria-label="Mobile navigation"
            className="grid border-t border-border py-3 text-sm font-semibold text-navy xl:hidden"
          >
            {navigation.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={close}
                aria-current={isActive(item.href) ? "page" : undefined}
                className="px-1 py-3 hover:underline"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={destinations.beforeYouCall}
              onClick={close}
              className="px-1 py-3 hover:underline"
            >
              Before you call
            </Link>
          </nav>
        )}
        {panel === "search" && (
          <SiteSearch
            onNavigate={close}
            onClose={() => {
              close();
              searchButton.current?.focus();
            }}
          />
        )}
      </div>
    </div>
  );
}
