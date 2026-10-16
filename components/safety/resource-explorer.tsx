"use client";

import { useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { Section, SectionIntro, InfoCard } from "@/components/ui/section";
import { TextLink } from "@/components/ui/text-link";

import { matchesQuery } from "@/lib/search";

export function ResourceExplorer({
  children,
  resources: safetyTopics,
}: {
  children: ReactNode;
  resources: {
    id: string;
    title: string;
    description: string;
    body: string;
    href: string;
    accent: string;
  }[];
}) {
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");
  const [topic, setTopic] = useState("all");
  const [searched, setSearched] = useState(false);
  const results = safetyTopics.filter(
    (item) =>
      (topic === "all" || item.id === topic) &&
      matchesQuery(search, item.title, item.description),
  );

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSearch(query);
    setSearched(true);
    document
      .getElementById("safety-topics")
      ?.scrollIntoView({ block: "start" });
  }

  function reset() {
    setQuery("");
    setSearch("");
    setTopic("all");
    setSearched(false);
  }

  return (
    <>
      <div className="border-b border-border bg-paper" data-node-id="19:239">
        <form
          onSubmit={submitSearch}
          role="search"
          aria-label="Search safety resources"
          className="site-container grid items-end gap-5 py-7 md:grid-cols-[minmax(0,1fr)_220px] xl:grid-cols-[minmax(0,1fr)_280px_120px]"
        >
          <label className="min-w-0">
            <span className="mb-2 block text-xs font-bold text-navy">
              Search safety resources
            </span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search safety topics or guidance…"
              className="form-input"
            />
          </label>
          <label>
            <span className="mb-2 block text-xs font-bold text-navy">
              Filter by topic
            </span>
            <select
              value={topic}
              onChange={(event) => {
                setTopic(event.target.value);
                setSearched(true);
              }}
              className="form-input"
            >
              <option value="all">All topics</option>
              {safetyTopics.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.title}
                </option>
              ))}
            </select>
          </label>
          <button
            type="submit"
            className="min-h-14 bg-navy px-6 text-sm font-bold text-white hover:bg-blue md:col-span-2 xl:col-span-1"
          >
            Search
          </button>
        </form>
      </div>
      {children}
      <Section
        id="safety-topics"
        nodeId="19:263"
        className="space-y-8 lg:space-y-10"
      >
        <SectionIntro
          eyebrow="BROWSE BY TOPIC"
          title="Information for everyday preparedness."
          titleClassName="text-[clamp(1.65rem,2.6vw,2.25rem)] leading-[1.3]"
        />
        <p
          role="status"
          className={searched ? "text-sm text-muted" : "sr-only"}
        >
          {results.length} {results.length === 1 ? "topic" : "topics"} found
        </p>
        <div className="grid items-start gap-6 md:grid-cols-2 xl:grid-cols-3">
          {results.map((item) => (
            <InfoCard
              key={item.id}
              title={item.title}
              accent={item.accent}
              className="bg-paper"
            >
              <p className="xl:min-h-[45px]">{item.description}</p>
              {item.body && item.body !== item.description && (
                <p className="mt-3 whitespace-pre-line">{item.body}</p>
              )}
              {item.href && (
                <TextLink
                  href={item.href}
                  className="mt-4 inline-block text-[13px] leading-[19px] text-navy"
                  ariaLabel={`Explore ${item.title} resources`}
                >
                  {item.href.startsWith("https:")
                    ? "Explore official resources"
                    : "Read more"}{" "}
                  <span aria-hidden="true">
                    {item.href.startsWith("https:") ? "↗" : "→"}
                  </span>
                </TextLink>
              )}
            </InfoCard>
          ))}
        </div>
        {results.length === 0 && (
          <div className="space-y-4 border border-border p-7">
            <p>
              No safety topics match your search. Try a different phrase or
              choose “All topics”.
            </p>
            <button
              type="button"
              onClick={reset}
              className="min-h-11 font-bold text-navy underline underline-offset-4"
            >
              Reset filters
            </button>
          </div>
        )}
        {searched && results.length > 0 && (
          <button
            type="button"
            onClick={reset}
            className="min-h-11 text-sm font-bold text-navy underline underline-offset-4"
          >
            Reset filters
          </button>
        )}
      </Section>
    </>
  );
}
