import "server-only";
import { newsArticles } from "@/lib/content/news";

// This read layer can be replaced with database queries when the CMS is built.
export function getPublishedNews() {
  return [...newsArticles].sort((first, second) =>
    second.dateTime.localeCompare(first.dateTime),
  );
}

export function getNewsArticle(slug: string) {
  return newsArticles.find((article) => article.slug === slug);
}

export function getRelatedNews(slug: string) {
  const article = getNewsArticle(slug);
  return getPublishedNews()
    .filter((item) => item.slug !== slug)
    .sort(
      (first, second) =>
        Number(second.category === article?.category) -
        Number(first.category === article?.category),
    )
    .slice(0, 3);
}
