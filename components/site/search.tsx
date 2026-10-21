"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { matchesQuery } from "@/lib/search";
import type { SearchResult, SearchResultType } from "@/app/api/search/route";

const groupOrder: SearchResultType[] = ["page", "news", "notice", "resource"];
const groupLabels: Record<SearchResultType, string> = {
  page: "Website",
  news: "News & media",
  notice: "Public notices",
  resource: "Safety resources",
};

export function SiteSearch({
  onClose,
  onNavigate,
}: {
  onClose: () => void;
  onNavigate: () => void;
}) {
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/search", { cache: "no-store", signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Search is unavailable. Please try again later.");
        }
        const data = await response.json();
        setIndex(data.results);
        setLoading(false);
      })
      .catch((error) => {
        if (!controller.signal.aborted) {
          setError(
            error instanceof Error ? error.message : "Search is unavailable.",
          );
          setLoading(false);
        }
      });
    return () => controller.abort();
  }, []);

  const results = useMemo(
    () => index.filter((item) => matchesQuery(query, item.title, item.description)),
    [index, query],
  );

  const groups = useMemo(
    () =>
      groupOrder
        .map((type) => ({
          type,
          items: results.filter((item) => item.type === type),
        }))
        .filter((group) => group.items.length > 0),
    [results],
  );

  return (
    <section
      id="site-search"
      aria-label="Search the website"
      className="panel-entrance border-t border-border py-6"
    >
      <label
        htmlFor="site-search-input"
        className="mb-3 block text-sm font-bold text-navy"
      >
        Search public information
      </label>
      <div className="flex max-w-3xl items-center gap-3">
        <div className="relative min-w-0 flex-1">
          <input
            ref={inputRef}
            id="site-search-input"
            type="search"
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search emergency services, news or the centre"
            className="w-full border border-border bg-white py-3 pl-4 pr-10 text-base focus:border-blue focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                inputRef.current?.focus();
              }}
              aria-label="Clear search"
              className="absolute inset-y-0 right-0 flex w-10 items-center justify-center text-lg text-muted hover:text-navy"
            >
              ×
            </button>
          )}
        </div>
        <button
          type="button"
          onClick={onClose}
          className="min-h-11 shrink-0 px-3 text-sm font-bold text-navy"
        >
          Close
        </button>
      </div>
      <p role="status" className="my-4 text-xs text-muted">
        {loading
          ? "Loading public information…"
          : error ||
            `${results.length} ${results.length === 1 ? "result" : "results"}`}
      </p>
      <div className="max-w-4xl space-y-7">
        {groups.map((group) => (
          <div key={group.type}>
            <p className="mb-3 text-[11px] font-bold tracking-[0.1em] text-blue">
              {groupLabels[group.type].toUpperCase()}
            </p>
            <ul className="grid gap-3 sm:grid-cols-2">
              {group.items.map((item) => (
                <li key={`${item.type}-${item.href}-${item.title}`}>
                  <Link
                    href={item.href}
                    onClick={onNavigate}
                    className="block border border-border bg-white p-4 hover:border-blue"
                  >
                    <span className="block text-sm font-bold text-navy">
                      {item.title} <span aria-hidden="true">→</span>
                    </span>
                    <span className="mt-2 block text-xs leading-relaxed text-muted">
                      {item.description}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      {!loading && !error && results.length === 0 && (
        <p className="text-sm text-muted">
          No matching information. Try “emergency”, “news” or “contact”.
        </p>
      )}
    </section>
  );
}
