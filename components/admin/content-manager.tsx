"use client";

import { useState } from "react";
import { updateAdminState, useAdminState } from "@/lib/admin/store";
import { formatAdminDate } from "@/lib/admin/helpers";
import type { AdminContent, ContentCollection } from "@/lib/admin/types";
import { matchesQuery } from "@/lib/search";
import {
  AdminButton,
  AdminFeedback,
  AdminField,
  AdminHeading,
  StatusBadge,
} from "./ui";
import { AdminDialog } from "./dialog";
import { AdminIcon } from "./icons";

const labels = {
  notices: {
    title: "Public notices",
    singular: "notice",
    description:
      "Prepare timely announcements and public information for the website.",
  },
  resources: {
    title: "Safety resources",
    singular: "resource",
    description: "Manage resource summaries, guidance and destination links.",
  },
  pages: {
    title: "Website pages",
    singular: "page",
    description:
      "Review and prepare the core information across the public website.",
  },
};

export function AdminContentManager({
  collection,
}: {
  collection: ContentCollection;
}) {
  const state = useAdminState();
  const copy = labels[collection];
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState<AdminContent | null>(null);
  const [deleting, setDeleting] = useState<AdminContent | null>(null);
  const [feedback, setFeedback] = useState({ message: "", error: false });
  const items = state[collection].filter((item) =>
    matchesQuery(query, item.title, item.summary),
  );

  function add() {
    setEditing({
      id: "new",
      title: "",
      summary: "",
      body: "",
      url: "",
      status: "Draft",
      updatedAt: "",
    });
    setFeedback({ message: "", error: false });
  }

  function save() {
    if (!editing) {
      return;
    }
    if (!editing.title.trim() || !editing.summary.trim()) {
      setFeedback({
        message: "Add a title and summary before saving.",
        error: true,
      });
      return;
    }
    if (editing.url && !/^\/(?!\/)/.test(editing.url)) {
      try {
        const url = new URL(editing.url);
        if (url.protocol !== "https:") {
          throw new Error("Unsupported URL");
        }
      } catch {
        setFeedback({
          message:
            "Use a website path starting with / or a complete https:// address.",
          error: true,
        });
        return;
      }
    }
    const item = {
      ...editing,
      id: editing.id === "new" ? crypto.randomUUID() : editing.id,
      updatedAt: new Date().toISOString(),
    };
    const result = updateAdminState(
      (current) => ({
        ...current,
        [collection]:
          editing.id === "new"
            ? [item, ...current[collection]]
            : current[collection].map((existing) =>
                existing.id === item.id ? item : existing,
              ),
      }),
      `Saved ${copy.singular}: ${item.title}`,
    );
    setFeedback({ message: result.message, error: !result.ok });
    if (result.ok) {
      setEditing(null);
    }
  }

  function remove() {
    if (!deleting) {
      return;
    }
    const result = updateAdminState(
      (current) => ({
        ...current,
        [collection]: current[collection].filter(
          (item) => item.id !== deleting.id,
        ),
      }),
      `Removed ${copy.singular}: ${deleting.title}`,
    );
    setFeedback({ message: result.message, error: !result.ok });
    if (result.ok) {
      setDeleting(null);
    }
  }

  return (
    <>
      <AdminHeading
        title={copy.title}
        description={copy.description}
        actions={
          collection !== "pages" && (
            <AdminButton onClick={add}>
              <AdminIcon name="plus" /> Add {copy.singular}
            </AdminButton>
          )
        }
      />
      <label className="mb-6 block max-w-sm">
        <span className="sr-only">Search {copy.title.toLowerCase()}</span>
        <input
          type="search"
          className="admin-input"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={`Search ${copy.title.toLowerCase()}…`}
        />
      </label>
      <div className="mb-4">
        <AdminFeedback {...feedback} />
      </div>
      <div className="grid gap-5 xl:grid-cols-2">
        {items.map((item) => (
          <article
            key={item.id}
            className="flex flex-col rounded-lg border border-border bg-white p-5 sm:p-6"
          >
            <div className="mb-4 flex items-center justify-between gap-3">
              <StatusBadge status={item.status} />
              <span className="text-xs text-muted">
                {formatAdminDate(item.updatedAt)}
              </span>
            </div>
            <h2 className="text-lg font-bold text-navy">{item.title}</h2>
            <p className="mt-3 text-sm leading-6 text-muted">{item.summary}</p>
            {item.url && (
              <p className="mt-4 break-all text-xs text-muted">{item.url}</p>
            )}
            <div className="mt-auto flex flex-wrap items-center gap-5 pt-5">
              <button
                type="button"
                onClick={() => {
                  setEditing(item);
                  setFeedback({ message: "", error: false });
                }}
                className="min-h-11 text-sm font-bold text-blue"
              >
                Edit {copy.singular} →
              </button>
              {collection !== "pages" && (
                <button
                  type="button"
                  aria-label={`Delete ${item.title}`}
                  onClick={() => setDeleting(item)}
                  className="min-h-11 text-xs font-bold text-[#b32136]"
                >
                  Delete
                </button>
              )}
            </div>
          </article>
        ))}
      </div>
      {items.length === 0 && (
        <div className="rounded-lg border border-border bg-white p-10 text-center">
          <h2 className="font-bold text-navy">
            No matching {copy.title.toLowerCase()}
          </h2>
          <p className="mt-3 text-sm text-muted">Try another search term.</p>
        </div>
      )}
      <AdminDialog
        open={Boolean(editing)}
        onClose={() => setEditing(null)}
        title={`${editing?.id === "new" ? "Add" : "Edit"} ${copy.singular}`}
      >
        {editing && (
          <form
            className="space-y-5"
            onSubmit={(event) => {
              event.preventDefault();
              save();
            }}
          >
            <AdminField label="Title">
              <input
                className="admin-input"
                value={editing.title}
                onChange={(event) =>
                  setEditing({ ...editing, title: event.target.value })
                }
              />
            </AdminField>
            <AdminField label="Summary">
              <textarea
                className="admin-input min-h-24"
                value={editing.summary}
                onChange={(event) =>
                  setEditing({ ...editing, summary: event.target.value })
                }
              />
            </AdminField>
            <AdminField label="Content">
              <textarea
                className="admin-input min-h-40"
                value={editing.body}
                onChange={(event) =>
                  setEditing({ ...editing, body: event.target.value })
                }
              />
            </AdminField>
            <AdminField
              label={
                collection === "pages" ? "Page address" : "Destination link"
              }
            >
              <input
                className="admin-input read-only:bg-paper"
                readOnly={collection === "pages"}
                value={editing.url}
                onChange={(event) =>
                  setEditing({ ...editing, url: event.target.value })
                }
              />
            </AdminField>
            <AdminField label="Status">
              <select
                className="admin-input"
                value={editing.status}
                onChange={(event) =>
                  setEditing({
                    ...editing,
                    status: event.target.value as AdminContent["status"],
                  })
                }
              >
                <option>Draft</option>
                <option>Published</option>
              </select>
            </AdminField>
            <AdminFeedback {...feedback} />
            <div className="flex justify-end gap-3">
              <AdminButton variant="secondary" onClick={() => setEditing(null)}>
                Cancel
              </AdminButton>
              <AdminButton type="submit">Save preview</AdminButton>
            </div>
          </form>
        )}
      </AdminDialog>
      <AdminDialog
        open={Boolean(deleting)}
        onClose={() => setDeleting(null)}
        title={`Delete ${copy.singular}?`}
      >
        <p className="text-sm leading-6 text-muted">
          Remove “{deleting?.title}” from this browser’s preview?
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <AdminButton variant="secondary" onClick={() => setDeleting(null)}>
            Cancel
          </AdminButton>
          <AdminButton variant="danger" onClick={remove}>
            Delete {copy.singular}
          </AdminButton>
        </div>
      </AdminDialog>
    </>
  );
}
