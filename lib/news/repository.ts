import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { getDatabase } from "@/lib/db/prisma";
import type { NewsArticle } from "@/lib/content/news";

export async function getPublishedNews(): Promise<NewsArticle[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("public-content");
  const articles = await getDatabase().newsArticle.findMany({
    where: { status: "PUBLISHED", deletedAt: null, cover: { status: "READY" } },
    include: { cover: true, category: true },
    orderBy: [{ featured: "desc" }, { publishedAt: "desc" }],
  });
  return articles.map((article) => ({
    slug: article.slug,
    title: article.title,
    description: article.excerpt,
    category: article.category.name,
    author: article.byline,
    date: new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "Africa/Lagos",
    }).format(article.publishedAt!),
    dateTime: article.publishedAt!.toISOString(),
    asset: { image: article.cover!.url, alt: article.cover!.alt },
    caption: article.caption,
    source: article.source,
    paragraphs: article.body.split(/\n\s*\n/).filter(Boolean),
  }));
}

export async function getNewsArticle(slug: string) {
  return (await getPublishedNews()).find((article) => article.slug === slug);
}

export async function getRelatedNews(slug: string) {
  const all = await getPublishedNews();
  const article = all.find((item) => item.slug === slug);
  return all
    .filter((item) => item.slug !== slug)
    .sort(
      (a, b) =>
        Number(b.category === article?.category) -
        Number(a.category === article?.category),
    )
    .slice(0, 3);
}
