"use client";

import Image from "next/image";
import { useAdminState } from "@/lib/admin/store";
import type { AdminArticle, AdminMedia } from "@/lib/admin/types";
import { AdminHeading, AdminLink, StatusBadge } from "./ui";

export function ArticlePreview({
  article,
  cover,
}: {
  article: AdminArticle;
  cover?: AdminMedia;
}) {
  const paragraphs = article.body
    .split(/\n\s*\n/)
    .filter((paragraph) => paragraph.trim());
  return (
    <article className="overflow-hidden rounded-lg border border-border bg-white">
      <div className="space-y-4 bg-navy px-6 py-8 text-white sm:px-10">
        <p className="text-eyebrow font-bold text-gold">
          NEWS &amp; MEDIA / {article.category.toUpperCase()}
        </p>
        <h2 className="text-[28px] font-bold leading-[1.35] sm:text-[34px]">
          {article.title || "Untitled article"}
        </h2>
        {article.excerpt && (
          <p className="text-base leading-7 text-white/85">{article.excerpt}</p>
        )}
      </div>
      <div className="space-y-6 p-6 sm:p-10">
        <div className="flex flex-wrap items-center gap-4 text-xs text-muted">
          <StatusBadge status={article.status} />
          <span>{article.author || "Editorial team"}</span>
        </div>
        {cover && (
          <figure className="space-y-3">
            <Image
              src={cover.url}
              alt={cover.alt}
              width={900}
              height={560}
              unoptimized
              className="aspect-[16/10] w-full object-cover"
            />
            <figcaption className="text-xs text-muted">{cover.alt}</figcaption>
          </figure>
        )}
        <div className="max-w-[70ch] space-y-6">
          {paragraphs.length > 0 ? (
            paragraphs.map((paragraph, index) => (
              <p
                key={`${index}-${paragraph.slice(0, 30)}`}
                className="whitespace-pre-line text-base leading-8 text-muted"
              >
                {paragraph}
              </p>
            ))
          ) : (
            <p className="text-sm text-muted">
              Add article content to see it in the preview.
            </p>
          )}
        </div>
      </div>
    </article>
  );
}

export function AdminArticlePreviewPage({ id }: { id: string }) {
  const state = useAdminState();
  const article = state.articles.find((item) => item.id === id);
  if (!article) {
    return (
      <>
        <AdminHeading
          title="Article unavailable"
          description="This article is not available in this browser’s preview."
        />
        <AdminLink href="/admin/news">Back to articles</AdminLink>
      </>
    );
  }
  return (
    <>
      <AdminHeading
        title="Article preview"
        description="Review the saved headline, cover image and article content."
        actions={
          <AdminLink href={`/admin/news/${id}`} secondary>
            Back to editor
          </AdminLink>
        }
      />
      <ArticlePreview
        article={article}
        cover={state.media.find((image) => image.id === article.coverId)}
      />
    </>
  );
}
