"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { newsCategories } from "@/lib/content/news";
import { formatAdminDate } from "@/lib/admin/helpers";
import { updateAdminState, useAdminState } from "@/lib/admin/store";
import type { AdminArticle } from "@/lib/admin/types";
import { matchesQuery } from "@/lib/search";
import {
  AdminButton,
  AdminFeedback,
  AdminHeading,
  AdminLink,
  StatusBadge,
} from "./ui";
import { AdminDialog } from "./dialog";
import { AdminIcon } from "./icons";

export function AdminNewsList() {
  const state = useAdminState();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All articles");
  const [category, setCategory] = useState("All categories");
  const [deleting, setDeleting] = useState<AdminArticle | null>(null);
  const [feedback, setFeedback] = useState({ message: "", error: false });
  const articles = [...state.articles]
    .filter(
      (article) =>
        (status === "All articles" || article.status === status) &&
        (category === "All categories" || article.category === category) &&
        matchesQuery(query, article.title, article.category, article.author),
    )
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));

  function remove() {
    if (!deleting) {
      return;
    }
    const result = updateAdminState(
      (current) => ({
        ...current,
        articles: current.articles.filter(
          (article) => article.id !== deleting.id,
        ),
      }),
      `Deleted article: ${deleting.title}`,
    );
    setFeedback({ message: result.message, error: !result.ok });
    if (result.ok) {
      setDeleting(null);
    }
  }

  function actions(article: AdminArticle) {
    return (
      <div className="flex flex-wrap items-center gap-3 text-xs font-bold">
        <Link
          href={`/admin/news/${article.id}`}
          className="inline-flex min-h-11 items-center text-blue hover:underline"
        >
          Edit
        </Link>
        <Link
          href={`/admin/news/${article.id}/preview`}
          className="inline-flex min-h-11 items-center text-navy hover:underline"
        >
          Preview
        </Link>
        <button
          type="button"
          onClick={() => setDeleting(article)}
          aria-label={`Delete ${article.title}`}
          className="min-h-11 text-[#b32136] hover:underline"
        >
          Delete
        </button>
      </div>
    );
  }

  return (
    <>
      <AdminHeading
        title="News & articles"
        description="Create stories, manage drafts and prepare updates for publication."
        actions={
          <AdminLink href="/admin/news/new">
            <AdminIcon name="plus" /> New article
          </AdminLink>
        }
      />
      <div className="rounded-lg border border-border bg-white">
        <div
          role="group"
          aria-label="Article status"
          className="flex flex-wrap gap-1 border-b border-border px-5 pt-3"
        >
          {["All articles", "Published", "Draft"].map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={status === item}
              onClick={() => setStatus(item)}
              className={`min-h-12 border-b-2 px-4 text-sm font-semibold ${status === item ? "border-blue text-blue" : "border-transparent text-muted hover:text-navy"}`}
            >
              {item}{" "}
              <span className="ml-2 rounded-full bg-paper px-2 py-0.5 text-[11px] text-muted">
                {
                  state.articles.filter(
                    (article) =>
                      item === "All articles" || article.status === item,
                  ).length
                }
              </span>
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
          <label className="block min-w-0 sm:w-80">
            <span className="sr-only">Search articles</span>
            <input
              className="admin-input"
              type="search"
              placeholder="Search articles…"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>
          <label>
            <span className="sr-only">Filter by category</span>
            <select
              className="admin-input sm:w-52"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              <option>All categories</option>
              {newsCategories.slice(1).map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
        </div>
        {articles.length > 0 ? (
          <>
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full min-w-[760px] text-left text-sm">
                <thead className="border-y border-border bg-paper text-[11px] uppercase tracking-wide text-muted">
                  <tr>
                    <th className="px-5 py-3 font-semibold">Article</th>
                    <th className="px-4 py-3 font-semibold">Status</th>
                    <th className="px-4 py-3 font-semibold">Updated</th>
                    <th className="px-5 py-3 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {articles.map((article) => {
                    const cover = state.media.find(
                      (image) => image.id === article.coverId,
                    );
                    return (
                      <tr key={article.id} className="hover:bg-paper/50">
                        <td className="px-5 py-5">
                          <div className="flex items-center gap-3">
                            {cover ? (
                              <Image
                                src={cover.url}
                                alt=""
                                width={56}
                                height={44}
                                unoptimized
                                className="h-11 w-14 shrink-0 rounded object-cover"
                              />
                            ) : (
                              <span className="flex h-11 w-14 shrink-0 items-center justify-center rounded bg-paper text-muted">
                                <AdminIcon name="news" />
                              </span>
                            )}
                            <div className="max-w-sm">
                              <Link
                                href={`/admin/news/${article.id}`}
                                className="font-semibold leading-6 text-navy hover:underline"
                              >
                                {article.title}
                              </Link>
                              <p className="mt-1 text-xs text-muted">
                                {article.category}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-5">
                          <StatusBadge status={article.status} />
                        </td>
                        <td className="whitespace-nowrap px-4 py-5 text-xs text-muted">
                          {formatAdminDate(article.updatedAt)}
                        </td>
                        <td className="px-5 py-5">{actions(article)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="divide-y divide-border md:hidden">
              {articles.map((article) => (
                <article key={article.id} className="space-y-3 p-5">
                  <StatusBadge status={article.status} />
                  <h2 className="text-base font-bold leading-6 text-navy">
                    <Link href={`/admin/news/${article.id}`}>
                      {article.title}
                    </Link>
                  </h2>
                  <p className="text-xs text-muted">
                    {article.category} · {formatAdminDate(article.updatedAt)}
                  </p>
                  {actions(article)}
                </article>
              ))}
            </div>
          </>
        ) : (
          <div className="space-y-3 border-t border-border p-8 text-center">
            <h2 className="font-bold text-navy">No matching articles</h2>
            <p className="text-sm text-muted">
              Try another search or clear the filters.
            </p>
            <AdminButton
              variant="secondary"
              onClick={() => {
                setQuery("");
                setStatus("All articles");
                setCategory("All categories");
              }}
            >
              Clear filters
            </AdminButton>
          </div>
        )}
        <div
          className="border-t border-border px-5 py-4 text-xs text-muted"
          role="status"
        >
          {articles.length} {articles.length === 1 ? "article" : "articles"}
        </div>
      </div>
      <div className="mt-4">
        <AdminFeedback {...feedback} />
      </div>
      <AdminDialog
        open={Boolean(deleting)}
        onClose={() => setDeleting(null)}
        title="Delete article?"
      >
        <p className="text-sm leading-6 text-muted">
          “{deleting?.title}” will be removed from this browser’s preview. The
          live website is unchanged.
        </p>
        <div className="mt-6 flex flex-wrap justify-end gap-3">
          <AdminButton variant="secondary" onClick={() => setDeleting(null)}>
            Cancel
          </AdminButton>
          <AdminButton variant="danger" onClick={remove}>
            Delete article
          </AdminButton>
        </div>
      </AdminDialog>
    </>
  );
}
