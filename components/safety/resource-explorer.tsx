"use client";

import { useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { Section, SectionIntro, InfoCard } from "@/components/ui/section";
import { TextLink } from "@/components/ui/text-link";
import { safetyTopics } from "@/lib/content/safety";
import { matchesQuery } from "@/lib/search";

export function ResourceExplorer({ children }: { children: ReactNode }) {
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
      <div className="bg-paper" data-node-id="19:239">
        <form
          onSubmit={submitSearch}
          role="search"
          aria-label="Search safety resources"
          className="site-container grid gap-6 py-10 md:grid-cols-[minmax(0,1fr)_220px] xl:grid-cols-[850fr_294fr_120fr]"
        >
          <label className="min-w-0">
            <span className="sr-only">Search safety topics or guidance</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search safety topics or guidance…"
              className="form-input"
            />
          </label>
          <label>
            <span className="sr-only">Safety topic</span>
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
      <Section id="safety-topics" nodeId="19:263" className="space-y-6">
        <SectionIntro
          eyebrow="BROWSE BY TOPIC"
          title="Information for everyday preparedness."
          titleClassName="text-[28px] leading-[1.5] sm:text-[32px]"
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
              <TextLink
                href={item.href}
                className="mt-4 inline-block text-[13px] leading-[19px] text-navy"
                ariaLabel={`Explore ${item.title} resources`}
              >
                {item.href.startsWith("https:")
                  ? "Explore official resources"
                  : "Read: Before you call"}{" "}
                <span aria-hidden="true">
                  {item.href.startsWith("https:") ? "↗" : "→"}
                </span>
              </TextLink>
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
