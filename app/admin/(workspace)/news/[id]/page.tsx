import { Suspense } from "react";
import { ArticleEditor } from "@/components/admin/article-editor";
import { AdminContentSkeleton } from "@/components/admin/skeleton";
import { prisma } from "@/lib/db/prisma";

export const metadata = { title: "Edit article" };

// Article editor loads client-side through TanStack Query; opt out of
// instant-navigation validation rather than leave it unvalidated and silently dropped.
export const instant = false;

export async function generateStaticParams() {
  const articles = await prisma.newsArticle.findMany({
    where: { deletedAt: null },
    select: { id: true },
  });
  return articles.map((article) => ({ id: article.id }));
}

export default function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div role="status">
          <span className="sr-only">Loading article editor…</span>
          <AdminContentSkeleton />
        </div>
      }
    >
      <Editor params={params} />
    </Suspense>
  );
}

async function Editor({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ArticleEditor id={id} />;
}
