import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { InteriorPage } from "@/components/ui/interior-page";
import { ArticleContent } from "@/components/news/article";
import { ArticleLoading } from "@/components/news/article-loading";
import {
  getNewsArticle,
  getPublishedNews,
  getRelatedNews,
} from "@/lib/news/repository";
import { destinations } from "@/lib/navigation";

export function generateStaticParams() {
  return getPublishedNews().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getNewsArticle(slug);
  if (!article) {
    notFound();
  }
  return {
    title: article.title,
    description: article.description,
  };
}

export default function NewsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <Suspense fallback={<ArticleLoading />}>
      <ResolvedNewsArticle params={params} />
    </Suspense>
  );
}

async function ResolvedNewsArticle({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getNewsArticle(slug);
  if (!article) {
    notFound();
  }

  return (
    <InteriorPage
      title={article.title}
      description={article.description}
      breadcrumbs={[
        { label: "News & Media", href: destinations.news },
        { label: article.category },
      ]}
      nodeId="21:292"
    >
      <ArticleContent article={article} related={getRelatedNews(slug)} />
    </InteriorPage>
  );
}
