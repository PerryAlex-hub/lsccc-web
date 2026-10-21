"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createSlug, formatAdminDate } from "@/lib/admin/helpers";
import { useAdminState, useContentCommand } from "@/lib/admin/queries/content";
import type { AdminArticle, PublicationStatus } from "@/lib/admin/types";
import {
  AdminButton,
  AdminFeedback,
  AdminField,
  AdminHeading,
  AdminLink,
  StatusBadge,
} from "./ui";
import { AdminDialog } from "./dialog";
import { MediaPicker } from "./media-picker";
import { ArticlePreview } from "./article-preview";
import { CategoryPicker } from "./category-picker";

const blankArticle: AdminArticle = {
  id: "new",
  title: "",
  slug: "",
  excerpt: "",
  body: "",
  category: "Coordination",
  status: "Draft",
  coverId: "",
  author: "Editorial team",
  source: "",
  caption: "",
  updatedAt: "",
};

export function ArticleEditor({ id = "new" }: { id?: string }) {
  const state = useAdminState();
  const [feedback, setFeedback] = useState({ message: "", error: false });
  const article =
    id === "new" ? blankArticle : state.articles.find((item) => item.id === id);
  if (!article) {
    return (
      <>
        <AdminHeading
          title="Article unavailable"
          description="This article is unavailable or has been deleted."
        />
        <AdminLink href="/admin/news">Back to articles</AdminLink>
      </>
    );
  }
  return (
    <ArticleEditorForm
      key={`${article.id}-${article.updatedAt}`}
      article={article}
      feedback={feedback}
      onFeedback={setFeedback}
    />
  );
}

function ArticleEditorForm({
  article,
  feedback,
  onFeedback: setFeedback,
}: {
  article: AdminArticle;
  feedback: { message: string; error: boolean };
  onFeedback: (feedback: { message: string; error: boolean }) => void;
}) {
  const state = useAdminState();
  const router = useRouter();
  const [form, setForm] = useState(article);
  const [slugEdited, setSlugEdited] = useState(Boolean(article.slug));
  const [picker, setPicker] = useState(false);
  const [preview, setPreview] = useState(false);
  const [savingStatus, setSavingStatus] = useState<PublicationStatus | null>(
    null,
  );
  const saveMutation = useContentCommand();
  const titleRef = useRef<HTMLInputElement>(null);
  const dirty = JSON.stringify(form) !== JSON.stringify(article);
  const cover = state.media.find((image) => image.id === form.coverId);

  useEffect(() => {
    if (!dirty) {
      return;
    }
    function warn(event: BeforeUnloadEvent) {
      event.preventDefault();
    }
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  function change<Key extends keyof AdminArticle>(
    key: Key,
    value: AdminArticle[Key],
  ) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function save(status: PublicationStatus) {
    const title = form.title.trim();
    const slug = form.slug.trim();
    let error = "";
    if (!title) {
      error = "Enter an article title before saving.";
      titleRef.current?.focus();
    } else if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
      error = "Use a URL slug with lowercase letters, numbers and hyphens.";
    } else if (
      state.articles.some(
        (item) => item.id !== article.id && item.slug === slug,
      )
    ) {
      error = "An article already uses this URL slug. Choose another one.";
    } else if (
      status === "Published" &&
      (!form.excerpt.trim() || !form.body.trim() || !cover)
    ) {
      error = "Add a summary, article body and cover image before publishing.";
    }
    if (error) {
      setFeedback({ message: error, error: true });
      return;
    }
    const saved: AdminArticle = {
      ...form,
      title,
      slug,
      status,
      id: article.id === "new" ? crypto.randomUUID() : article.id,
      updatedAt: new Date().toISOString(),
    };
    setSavingStatus(status);
    try {
      const result = await saveMutation.mutateAsync({
        collection: "articles",
        operation: "save",
        value: saved,
        expectedUpdatedAt: article.id === "new" ? undefined : article.updatedAt,
      });
      setFeedback({ message: result.message, error: false });
      if (article.id === "new") {
        router.replace(`/admin/news/${saved.id}`);
      }
    } catch (error) {
      setFeedback({
        message:
          error instanceof Error
            ? error.message
            : "Could not save this article. Try again.",
        error: true,
      });
    } finally {
      setSavingStatus(null);
    }
  }

  return (
    <>
      <AdminHeading
        title={article.id === "new" ? "Create an article" : "Edit article"}
        description="Write the story, add an image and review it before publication."
        actions={
          <>
            <AdminLink href="/admin/news" secondary>
              Back to articles
            </AdminLink>
            <AdminButton variant="secondary" onClick={() => setPreview(true)}>
              Preview article
            </AdminButton>
          </>
        }
      />
      <form
        onSubmit={(event) => {
          event.preventDefault();
          save("Draft");
        }}
        className="grid items-start gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]"
      >
        <div className="space-y-6 rounded-lg border border-border bg-white p-5 sm:p-7">
          <h2 className="text-lg font-bold text-navy">Article content</h2>
          <AdminField
            label="Headline"
            hint="Keep the headline clear and specific."
          >
            <input
              ref={titleRef}
              className="admin-input text-base"
              maxLength={180}
              value={form.title}
              placeholder="Enter article headline"
              onChange={(event) => {
                const title = event.target.value;
                setForm((current) => ({
                  ...current,
                  title,
                  slug: slugEdited ? current.slug : createSlug(title),
                }));
              }}
            />
          </AdminField>
          <AdminField
            label="Short summary"
            hint="Appears on article cards and below the headline."
          >
            <textarea
              className="admin-input min-h-28 resize-y"
              maxLength={500}
              value={form.excerpt}
              placeholder="A brief introduction to this story"
              onChange={(event) => change("excerpt", event.target.value)}
            />
          </AdminField>
          <AdminField
            label="Article body"
            hint="Separate paragraphs with a blank line."
          >
            <textarea
              className="admin-input min-h-[360px] resize-y leading-7"
              value={form.body}
              placeholder="Write your article here…"
              onChange={(event) => change("body", event.target.value)}
            />
          </AdminField>
          <AdminField
            label="URL slug"
            hint={`Article address: /news-media/${form.slug || "your-article-title"}`}
          >
            <input
              className="admin-input"
              value={form.slug}
              onChange={(event) => {
                setSlugEdited(true);
                change("slug", event.target.value);
              }}
            />
          </AdminField>
        </div>
        <div className="space-y-6">
          <section className="space-y-5 rounded-lg border border-border bg-white p-5 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-lg font-bold text-navy">Publication</h2>
              <StatusBadge status={form.status} />
            </div>
            <CategoryPicker
              value={form.category}
              onChange={(category) => change("category", category)}
            />
            <AdminField label="Author / team">
              <input
                className="admin-input"
                value={form.author}
                onChange={(event) => change("author", event.target.value)}
              />
            </AdminField>
            <AdminField label="Reporting reference (optional)">
              <input
                className="admin-input"
                value={form.source}
                maxLength={500}
                onChange={(event) => change("source", event.target.value)}
              />
            </AdminField>
            <AdminField label="Image caption (optional)">
              <textarea
                className="admin-input"
                value={form.caption}
                maxLength={500}
                onChange={(event) => change("caption", event.target.value)}
              />
            </AdminField>
            <p className="text-xs leading-5 text-muted">
              {dirty
                ? "Unsaved changes"
                : article.updatedAt
                  ? `Last saved ${formatAdminDate(article.updatedAt)}`
                  : "Not saved yet"}
            </p>
            <div className="flex flex-col gap-3">
              <AdminButton
                type="submit"
                variant="secondary"
                loading={savingStatus === "Draft"}
                loadingLabel="Saving draft…"
                disabled={saveMutation.isPending}
              >
                Save draft
              </AdminButton>
              {article.status === "Published" && (
                <p className="text-xs leading-5 text-muted">
                  Saving as a draft removes this article from the public
                  website.
                </p>
              )}
              <AdminButton
                onClick={() => save("Published")}
                loading={savingStatus === "Published"}
                loadingLabel="Publishing…"
                disabled={saveMutation.isPending}
              >
                {article.status === "Published"
                  ? "Update published article"
                  : "Publish article"}
              </AdminButton>
            </div>
            {feedback.message && <AdminFeedback {...feedback} />}
          </section>
          <section className="space-y-4 rounded-lg border border-border bg-white p-5 sm:p-6">
            <h2 className="text-lg font-bold text-navy">Cover image</h2>
            {cover ? (
              <>
                <Image
                  src={cover.url}
                  alt={cover.alt}
                  width={480}
                  height={300}
                  unoptimized
                  className="aspect-[8/5] w-full rounded object-cover"
                />
                <p className="text-xs leading-5 text-muted">{cover.alt}</p>
              </>
            ) : (
              <div className="flex aspect-[8/5] items-center justify-center rounded border border-dashed border-border bg-paper text-sm text-muted">
                Choose a cover photograph
              </div>
            )}
            <div className="flex flex-wrap gap-3">
              <AdminButton variant="secondary" onClick={() => setPicker(true)}>
                {cover ? "Change image" : "Choose image"}
              </AdminButton>
              {cover && (
                <button
                  type="button"
                  onClick={() => change("coverId", "")}
                  className="min-h-11 text-xs font-bold text-[#b32136]"
                >
                  Remove
                </button>
              )}
            </div>
          </section>
        </div>
      </form>
      <AdminDialog
        open={picker}
        onClose={() => setPicker(false)}
        title="Choose a cover image"
      >
        <MediaPicker
          onSelect={(id) => {
            change("coverId", id);
            setPicker(false);
          }}
        />
      </AdminDialog>
      <AdminDialog
        open={preview}
        onClose={() => setPreview(false)}
        title="Article preview"
      >
        <ArticlePreview article={form} cover={cover} />
      </AdminDialog>
    </>
  );
}
