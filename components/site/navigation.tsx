"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { destinations, navigation, searchablePages } from "@/lib/navigation";

export function SiteNavigation() {
  const [panel, setPanel] = useState<"menu" | "about" | "search" | null>(null);
  const [query, setQuery] = useState("");
  const searchButton = useRef<HTMLButtonElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const aboutButton = useRef<HTMLButtonElement>(null);
  const results = searchablePages.filter((page) =>
    `${page.title} ${page.description}`
      .toLowerCase()
      .includes(query.trim().toLowerCase()),
  );
  const close = () => setPanel(null);

  return (
    <div
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
                    onClick={() => setPanel(panel === "about" ? null : "about")}
                    className="min-h-11 whitespace-nowrap hover:underline hover:underline-offset-4"
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
                  aria-current={index === 0 ? "page" : undefined}
                  onClick={close}
                  className={`${["basis-[64px]", "", "basis-[210px]", "basis-[180px]", "basis-[160px]", "basis-[110px]"][index]} flex min-h-11 items-center whitespace-nowrap hover:underline hover:underline-offset-4`}
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
          <section
            id="site-search"
            aria-label="Search the website"
            className="border-t border-border py-6"
          >
            <label
              htmlFor="site-search-input"
              className="mb-3 block text-sm font-bold text-navy"
            >
              Search public information
            </label>
            <div className="flex max-w-3xl gap-3">
              <input
                id="site-search-input"
                type="search"
                autoFocus
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search emergency services, news or the centre"
                className="min-w-0 flex-1 border border-border bg-white px-4 py-3 text-base"
              />
              <button
                type="button"
                onClick={() => {
                  close();
                  searchButton.current?.focus();
                }}
                className="px-3 text-sm font-bold text-navy"
              >
                Close
              </button>
            </div>
            <p role="status" className="my-4 text-xs text-muted">
              {results.length} {results.length === 1 ? "result" : "results"}
            </p>
            <ul className="grid max-w-4xl gap-3 sm:grid-cols-2">
              {results.map((page) => (
                <li key={page.href}>
                  <Link
                    href={page.href}
                    onClick={close}
                    className="block border border-border bg-white p-4 hover:border-blue"
                  >
                    <span className="block text-sm font-bold text-navy">
                      {page.title} <span aria-hidden="true">→</span>
                    </span>
                    <span className="mt-2 block text-xs leading-relaxed text-muted">
                      {page.description}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            {results.length === 0 && (
              <p className="text-sm text-muted">
                No matching information. Try “emergency”, “news” or “contact”.
              </p>
            )}
          </section>
        )}
      </div>
    </div>
  );
}
