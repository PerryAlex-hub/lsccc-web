import { Suspense } from "react";
import { AdminArticlePreviewPage } from "@/components/admin/article-preview";

export const metadata = { title: "Article preview" };

export default function ArticlePreviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense
      fallback={
        <p role="status" className="text-sm text-muted">
          Loading preview…
        </p>
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
