"use client";

import { useRef, useState } from "react";
import {
  newsCategories,
  type NewsArticle,
  type NewsCategory,
} from "@/lib/content/news";
import { matchesQuery } from "@/lib/search";
import { FeaturedNews, NewsCard } from "./news-cards";
import { NewsPagination } from "./pagination";

const PAGE_SIZE = 3;

export function NewsExplorer({
  articles,
}: {
  articles: readonly NewsArticle[];
}) {
  const [category, setCategory] = useState<NewsCategory>("All news");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const heading = useRef<HTMLHeadingElement>(null);
  const filtered = category !== "All news" || query.trim() !== "";
  const featured = !filtered ? articles[0] : undefined;
  const results = articles.filter(
    (article) =>
      article.slug !== featured?.slug &&
      (category === "All news" || article.category === category) &&
      matchesQuery(query, article.title, article.description, article.category),
  );
  const pages = Math.ceil(results.length / PAGE_SIZE);
  const visible = results.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function reset() {
    setCategory("All news");
    setQuery("");
    setPage(1);
  }

  function changePage(nextPage: number) {
    setPage(nextPage);
    requestAnimationFrame(() => {
      heading.current?.focus({ preventScroll: true });
      heading.current?.scrollIntoView({
        block: "start",
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      });
    });
  }

  return (
    <>
      <div className="border-b border-border bg-paper">
        <div className="site-container flex flex-col gap-5 py-6 lg:flex-row lg:items-center lg:justify-between">
          <div
            role="group"
            aria-label="Filter news by category"
            className="flex flex-wrap gap-2"
          >
            {newsCategories.map((item) => (
              <button
                key={item}
                type="button"
                aria-pressed={category === item}
                onClick={() => {
                  setCategory(item);
                  setPage(1);
                }}
                className={`motion-control min-h-11 border px-4 py-2 text-sm font-bold ${category === item ? "border-navy bg-navy text-white" : "border-border bg-white text-navy hover:border-blue"}`}
              >
                {item}
              </button>
            ))}
          </div>
          <label className="relative block min-w-0 lg:w-[320px] lg:shrink-0">
            <span className="sr-only">Search news</span>
            <input
              type="search"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setPage(1);
              }}
              placeholder="Search news…"
              className="form-input min-h-11 py-3"
            />
          </label>
        </div>
      </div>
      {featured && <FeaturedNews article={featured} />}
      <section
        className="site-container section-space"
        aria-labelledby="latest-news-heading"
      >
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-border pb-5">
          <h2
            id="latest-news-heading"
            ref={heading}
            tabIndex={-1}
            className="text-section font-bold text-navy"
          >
            {filtered ? "Search results" : "Latest news"}
          </h2>
          <p role="status" className="text-sm text-muted">
            {results.length > 0
              ? `Showing ${(page - 1) * PAGE_SIZE + 1}–${Math.min(page * PAGE_SIZE, results.length)} of ${results.length} articles`
              : "No articles found"}
          </p>
          {filtered && (
            <button
              type="button"
              onClick={reset}
              className="min-h-11 text-sm font-bold text-blue underline underline-offset-4"
            >
              Clear filters
            </button>
          )}
        </div>
        {results.length > 0 ? (
          <>
            <div className="grid gap-x-7 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((article) => (
                <NewsCard key={article.slug} article={article} />
              ))}
            </div>
            <NewsPagination page={page} pages={pages} onChange={changePage} />
          </>
        ) : (
          <div className="space-y-4 bg-paper p-8 sm:p-12">
            <h3 className="text-xl font-bold text-navy">No matching news</h3>
            <p className="text-muted">
              Try a different search term or browse another category.
            </p>
            <button
              type="button"
              onClick={reset}
              className="min-h-11 font-bold text-blue underline underline-offset-4"
            >
              View all news
            </button>
          </div>
        )}
      </section>
    </>
  );
}
