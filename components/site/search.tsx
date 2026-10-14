"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { matchesQuery } from "@/lib/search";

export function SiteSearch({
  onClose,
  onNavigate,
}: {
  onClose: () => void;
  onNavigate: () => void;
}) {
  const [query, setQuery] = useState("");
  const [searchablePages, setPages] = useState<
    { href: string; title: string; description: string }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/search", { cache: "no-store", signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Search is unavailable. Please try again later.");
        }
        const data = await response.json();
        setPages(data.results);
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
  const results = searchablePages.filter((page) =>
    matchesQuery(query, page.title, page.description),
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
          onClick={onClose}
          className="px-3 text-sm font-bold text-navy"
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
      <ul className="grid max-w-4xl gap-3 sm:grid-cols-2">
        {results.map((page) => (
          <li key={page.href}>
            <Link
              href={page.href}
              onClick={onNavigate}
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
      {!loading && !error && results.length === 0 && (
        <p className="text-sm text-muted">
          No matching information. Try “emergency”, “news” or “contact”.
        </p>
      )}
    </section>
  );
}
