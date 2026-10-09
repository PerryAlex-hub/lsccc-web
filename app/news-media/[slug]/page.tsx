import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InteriorPage } from "@/components/ui/interior-page";
import { ArticleContent } from "@/components/news/article";
import { infrastructureArticle } from "@/lib/content/news";
import { destinations } from "@/lib/navigation";

export function generateStaticParams() {
  return [{ slug: infrastructureArticle.slug }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (slug !== infrastructureArticle.slug) {
    notFound();
  }
  return {
    title: infrastructureArticle.title,
    description: infrastructureArticle.description,
  };
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (slug !== infrastructureArticle.slug) {
    notFound();
  }

  return (
    <InteriorPage
      title={infrastructureArticle.displayTitle}
      description={infrastructureArticle.description}
      breadcrumbs={[
        { label: "News & Media", href: destinations.news },
        { label: "Infrastructure" },
      ]}
      nodeId="21:292"
    >
      <ArticleContent />
    </InteriorPage>
  );
}
