"use client";

import Link from "next/link";
import { useAdminState } from "@/lib/admin/store";
import { formatAdminDate } from "@/lib/admin/helpers";
import { AdminHeading, AdminLink, StatusBadge } from "./ui";
import { AdminIcon } from "./icons";

export function AdminDashboard() {
  const state = useAdminState();
  const drafts = state.articles.filter((article) => article.status === "Draft");
  const recent = [...state.articles]
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
    .slice(0, 5);
  const totals = [
    {
      label: "Published articles",
      value: state.articles.length - drafts.length,
      href: "/admin/news",
    },
    { label: "Drafts to continue", value: drafts.length, href: "/admin/news" },
    {
      label: "Public notices",
      value: state.notices.length,
      href: "/admin/notices",
    },
    { label: "Media assets", value: state.media.length, href: "/admin/media" },
  ];

  return (
    <>
      <AdminHeading
        title="Your publishing workspace"
        description="Manage the stories, information and resources that keep Lagos informed."
        actions={
          <AdminLink href="/admin/news/new">
            <AdminIcon name="plus" /> Create article
          </AdminLink>
        }
      />
      <div className="mb-8 grid grid-cols-2 overflow-hidden rounded-lg border border-border bg-white lg:grid-cols-4">
        {totals.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="border-b border-r border-border p-5 hover:bg-paper sm:p-6 lg:border-b-0 last:border-r-0"
          >
            <p className="text-xs font-medium text-muted">{item.label}</p>
            <p className="mt-3 text-[32px] font-bold leading-none text-navy">
              {item.value}
            </p>
            <p className="mt-4 text-xs font-semibold text-blue">
              View details <span aria-hidden="true">→</span>
            </p>
          </Link>
        ))}
      </div>
      <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1.8fr)_minmax(0,1fr)]">
        <section className="overflow-hidden rounded-lg border border-border bg-white">
          <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-5 sm:px-6">
            <h2 className="text-lg font-bold text-navy">Recent articles</h2>
            <Link
              href="/admin/news"
              className="text-xs font-bold text-blue hover:underline"
            >
              View all →
            </Link>
          </div>
          <div className="divide-y divide-border">
            {recent.map((article) => (
              <Link
                key={article.id}
                href={`/admin/news/${article.id}`}
                className="flex flex-col gap-3 p-5 hover:bg-paper sm:flex-row sm:items-center sm:justify-between sm:p-6"
              >
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold leading-6 text-navy">
                    {article.title}
                  </h3>
                  <p className="mt-1 text-xs text-muted">
                    {article.category} · {formatAdminDate(article.updatedAt)}
                  </p>
                </div>
                <div className="shrink-0">
                  <StatusBadge status={article.status} />
                </div>
              </Link>
            ))}
            {recent.length === 0 && (
              <p className="p-6 text-sm text-muted">
                Create your first article to get started.
              </p>
            )}
          </div>
        </section>
        <div className="space-y-6">
          <section className="rounded-lg border border-border border-t-4 border-t-gold bg-white p-6">
            <p className="text-[11px] font-bold tracking-wide text-blue">
              PICK UP WHERE YOU LEFT OFF
            </p>
            <h2 className="mt-3 text-lg font-bold text-navy">
              Continue a draft
            </h2>
            {drafts[0] ? (
              <>
                <p className="my-4 text-sm leading-6 text-muted">
                  {drafts[0].title}
                </p>
                <AdminLink href={`/admin/news/${drafts[0].id}`} secondary>
                  Open draft →
                </AdminLink>
              </>
            ) : (
              <p className="mt-4 text-sm leading-6 text-muted">
                You’re up to date. Start a new article when you’re ready.
              </p>
            )}
          </section>
          <section className="rounded-lg bg-navy p-6 text-white">
            <h2 className="text-lg font-bold">Before you publish</h2>
            <ol className="mt-5 space-y-4 text-sm leading-6 text-white/80">
              {[
                "Check the headline, dates and article details.",
                "Add a cover photograph and descriptive alternative text.",
                "Preview the article and confirm editorial approval.",
              ].map((item, index) => (
                <li key={item} className="flex gap-3">
                  <span className="font-bold text-gold">0{index + 1}</span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </div>
      <section className="mt-8 rounded-lg border border-border bg-white p-6">
        <h2 className="text-lg font-bold text-navy">Workspace activity</h2>
        {state.activity.length > 0 ? (
          <ul className="mt-4 divide-y divide-border">
            {state.activity.slice(0, 5).map((item) => (
              <li
                key={item.id}
                className="flex flex-wrap justify-between gap-2 py-3 text-sm"
              >
                <span>{item.label}</span>
                <time dateTime={item.date} className="text-xs text-muted">
                  {formatAdminDate(item.date)}
                </time>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-sm leading-6 text-muted">
            Your saved changes will appear here as you explore the workspace.
          </p>
        )}
      </section>
    </>
  );
}
