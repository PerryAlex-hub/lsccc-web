import { ArticleEditor } from "@/components/admin/article-editor";

export const metadata = { title: "Create article" };

// Article editor loads client-side through TanStack Query; opt out of
// instant-navigation validation rather than leave it unvalidated and silently dropped.
export const instant = false;

export default function CreateArticlePage() {
  return <ArticleEditor />;
}
