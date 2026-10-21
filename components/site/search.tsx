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
  const dialogRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  function trapTab(event: React.KeyboardEvent) {
    if (event.key !== "Tab") {
      return;
    }
    const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
      "a, button, input",
    );
    if (!focusable?.length) {
      return;
    }
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  const results = useMemo(
    () =>
      index.filter((item) => matchesQuery(query, item.title, item.description)),
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
    <div
      className="fixed inset-0 z-[70] flex justify-center bg-navy/60 backdrop-blur-sm sm:items-start sm:p-6 sm:pt-[12vh]"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
      onKeyDown={trapTab}
    >
      <div
        ref={dialogRef}
        id="site-search"
        role="dialog"
        aria-modal="true"
        aria-label="Search the website"
        className="panel-entrance flex h-full w-full max-w-2xl flex-col bg-white sm:h-auto sm:max-h-[min(640px,80vh)] sm:rounded-lg sm:shadow-2xl"
      >
        <div className="flex items-center gap-3 border-b border-border p-4 sm:p-5">
          <span aria-hidden="true" className="shrink-0 text-lg text-muted">
            ⌕
          </span>
          <label htmlFor="site-search-input" className="sr-only">
            Search public information
          </label>
          <div className="relative min-w-0 flex-1">
            <input
              ref={inputRef}
              id="site-search-input"
              type="search"
              autoFocus
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search emergency services, news or the centre"
              className="w-full border-0 bg-transparent py-1 pr-7 text-base text-navy focus:outline-none"
            />
            {query && (
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  inputRef.current?.focus();
                }}
                aria-label="Clear search"
                className="absolute inset-y-0 right-0 flex w-7 items-center justify-center text-lg text-muted hover:text-navy"
              >
                ×
              </button>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            className="flex size-9 shrink-0 items-center justify-center rounded text-lg font-bold text-navy hover:bg-paper"
          >
            ×
          </button>
        </div>
        <p role="status" className="px-4 pt-3 text-xs text-muted sm:px-5">
          {loading
            ? "Loading public information…"
            : error ||
              `${results.length} ${results.length === 1 ? "result" : "results"}`}
        </p>
        <div className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-5">
          <div className="space-y-7">
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
                        className="block border border-border p-4 hover:border-blue"
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
        </div>
      </div>
    </div>
  );
}
