"use client";

import { useState } from "react";
import { Section } from "@/components/ui/section";
import {
  newsCategories,
  centreUpdates,
  infrastructureArticle,
} from "@/lib/content/news";
import type { NewsCategory } from "@/lib/content/news";
import { matchesQuery } from "@/lib/search";
import { FeaturedUpdate, ReportedUpdates } from "./news-cards";

export function NewsExplorer() {
  const [category, setCategory] = useState<NewsCategory>("All updates");
  const [query, setQuery] = useState("");
  const updates = centreUpdates.filter(
    (item) =>
      (category === "All updates" || category === item.category) &&
      matchesQuery(
        query,
        item.title,
        item.description,
        item.source,
        item.category,
        item.date,
      ),
  );
  const showFeature =
    (category === "All updates" || category === "Infrastructure") &&
    matchesQuery(
      query,
      infrastructureArticle.title,
      infrastructureArticle.description,
      infrastructureArticle.category,
      infrastructureArticle.date,
      infrastructureArticle.source,
    );
  const count = updates.length + Number(showFeature);
  const filtered = category !== "All updates" || query.trim() !== "";

  function reset() {
    setCategory("All updates");
    setQuery("");
  }

  return (
    <>
      <div className="bg-paper" data-node-id="20:206">
        <div className="site-container flex flex-wrap gap-4 py-8">
          <div
            role="group"
            aria-label="Filter news by category"
            className="flex flex-wrap gap-4 xl:contents"
          >
            {newsCategories.map((item, index) => (
              <button
                key={item}
                type="button"
                aria-pressed={category === item}
                onClick={() => setCategory(item)}
                className={`min-h-14 border px-5 text-sm font-bold ${["xl:w-[172px]", "xl:w-[190px]", "xl:w-[190px]", "xl:w-[156px]"][index]} ${category === item ? "border-navy bg-navy text-white" : "border-border bg-white text-navy hover:border-blue"}`}
              >
                {item}
              </button>
            ))}
          </div>
          <label className="min-w-0 basis-full xl:flex-1">
            <span className="sr-only">Search news and announcements</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search news and announcements… ⌕"
              className="form-input"
            />
          </label>
          <p
            role="status"
            className={filtered ? "basis-full text-sm text-muted" : "sr-only"}
          >
            {count} {count === 1 ? "update" : "updates"} found
          </p>
        </div>
      </div>
      {showFeature && <FeaturedUpdate />}
      {updates.length > 0 && <ReportedUpdates updates={updates} />}
      {count === 0 && (
        <Section className="space-y-4">
          <h2 className="text-section font-bold">No matching updates</h2>
          <p className="text-muted">
            Try another search term or choose a different category.
          </p>
          <button
            type="button"
            onClick={reset}
            className="min-h-11 font-bold text-navy underline underline-offset-4"
          >
            Reset filters
          </button>
        </Section>
      )}
    </>
  );
}
