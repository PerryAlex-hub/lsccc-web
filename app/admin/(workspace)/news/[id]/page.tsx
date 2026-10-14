import { Suspense } from "react";
import { ArticleEditor } from "@/components/admin/article-editor";
import { getDatabase } from "@/lib/db/prisma";

export const metadata = { title: "Edit article" };

export async function generateStaticParams() {
  const articles = await getDatabase().newsArticle.findMany({
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
        <p role="status" className="text-sm text-muted">
          Loading article editor…
        </p>
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
