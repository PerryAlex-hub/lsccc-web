import { cacheLife, cacheTag } from "next/cache";
import { getDatabase } from "@/lib/db/prisma";
import { getPublishedNews } from "@/lib/news/repository";

async function getSearchIndex() {
  "use cache";
  cacheLife("hours");
  cacheTag("public-content");
  const pages = await getDatabase().websitePage.findMany({
    where: { status: "PUBLISHED" },
    select: { path: true, title: true, introduction: true },
  });
  const articles = await getPublishedNews();
  return [
    ...pages.map((page) => ({
      href: page.path,
      title: page.title,
      description: page.introduction,
    })),
    ...articles.map((article) => ({
      href: `/news-media/${article.slug}`,
      title: article.title,
      description: article.description,
    })),
  ];
}

export async function GET() {
  return Response.json({ results: await getSearchIndex() });
}
