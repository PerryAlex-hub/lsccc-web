import { Suspense } from "react";
import { AdminArticlePreviewPage } from "@/components/admin/article-preview";
import { AdminContentSkeleton } from "@/components/admin/skeleton";

export const metadata = { title: "Article preview" };

// Article preview loads client-side through TanStack Query; opt out of
// instant-navigation validation rather than leave it unvalidated and silently dropped.
export const instant = false;

export default function ArticlePreviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div role="status">
          <span className="sr-only">Loading preview…</span>
          <AdminContentSkeleton />
        </div>
      }
    >
      <Preview params={params} />
    </Suspense>
  );
}

async function Preview({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <AdminArticlePreviewPage id={id} />;
}
