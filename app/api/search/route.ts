import { cacheLife, cacheTag } from "next/cache";
import { prisma } from "@/lib/db/prisma";
import { getPublishedNews } from "@/lib/news/repository";
import { destinations, searchablePages } from "@/lib/navigation";

export type SearchResultType = "page" | "news" | "notice" | "resource";

export type SearchResult = {
  href: string;
  title: string;
  description: string;
  type: SearchResultType;
};

async function getSearchIndex(): Promise<SearchResult[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("public-content");
  const [dbPages, articles, notices, resources] = await Promise.all([
    prisma.websitePage.findMany({
      where: { status: "PUBLISHED" },
      select: { path: true, title: true, introduction: true },
    }),
    getPublishedNews(),
    prisma.publicNotice.findMany({
      where: { status: "PUBLISHED" },
      select: { title: true, summary: true },
    }),
    prisma.safetyResource.findMany({
      where: { status: "PUBLISHED" },
      select: { title: true, summary: true },
      orderBy: [{ position: "asc" }, { createdAt: "asc" }],
    }),
  ]);

  const dbPageHrefs = new Set(dbPages.map((page) => page.path));
  const pages: SearchResult[] = [
    ...dbPages.map((page) => ({
      href: page.path,
      title: page.title,
      description: page.introduction,
      type: "page" as const,
    })),
    ...searchablePages
      .filter((page) => !dbPageHrefs.has(page.href))
      .map((page) => ({ ...page, type: "page" as const })),
  ];

  return [
    ...pages,
    ...articles.map((article) => ({
      href: `${destinations.news}/${article.slug}`,
      title: article.title,
      description: article.description,
      type: "news" as const,
    })),
    ...notices.map((notice) => ({
      href: `${destinations.home}#emergency`,
      title: notice.title,
      description: notice.summary,
      type: "notice" as const,
    })),
    ...resources.map((resource) => ({
      href: destinations.safety,
      title: resource.title,
      description: resource.summary,
      type: "resource" as const,
    })),
  ];
}

export async function GET() {
  return Response.json({ results: await getSearchIndex() });
}
