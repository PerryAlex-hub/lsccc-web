import "server-only";
import { getDatabase } from "@/lib/db/prisma";
import type { AdminState } from "@/lib/admin/types";

export async function readAdminContent(): Promise<AdminState> {
  const db = getDatabase();
  const [
    articles,
    media,
    categories,
    notices,
    resources,
    pages,
    settings,
    activity,
  ] = await db.$transaction([
    db.newsArticle.findMany({
      where: { deletedAt: null },
      include: { category: true },
      orderBy: { updatedAt: "desc" },
    }),
    db.mediaAsset.findMany({
      where: { status: "READY" },
      orderBy: { createdAt: "desc" },
    }),
    db.category.findMany({ orderBy: { name: "asc" } }),
    db.publicNotice.findMany({ orderBy: { createdAt: "asc" } }),
    db.safetyResource.findMany({
      orderBy: [{ position: "asc" }, { createdAt: "asc" }],
    }),
    db.websitePage.findMany({ orderBy: { path: "asc" } }),
    db.siteSettings.findUniqueOrThrow({ where: { id: "site" } }),
    db.auditLog.findMany({
      where: {
        entityType: {
          in: [
            "articles",
            "media",
            "categories",
            "notices",
            "resources",
            "pages",
            "settings",
          ],
        },
      },
      orderBy: { createdAt: "desc" },
      take: 6,
    }),
  ]);
  return {
    version: 1,
    articles: articles.map((a) => ({
      id: a.id,
      title: a.title,
      slug: a.slug,
      excerpt: a.excerpt,
      body: a.body,
      category: a.category.name,
      status: a.status === "PUBLISHED" ? "Published" : "Draft",
      coverId: a.coverId ?? "",
      author: a.byline,
      source: a.source,
      caption: a.caption,
      updatedAt: a.updatedAt.toISOString(),
    })),
    media: media.map((m) => ({
      id: m.id,
      name: m.filename,
      url: m.url,
      alt: m.alt,
      size: `${Math.ceil(m.byteSize / 1024)} KB`,
    })),
    categories: categories.map((c) => c.name),
    notices: notices.map((n) => ({
      id: n.id,
      title: n.title,
      summary: n.summary,
      body: n.body,
      url: n.url,
      status: n.status === "PUBLISHED" ? "Published" : "Draft",
      updatedAt: n.updatedAt.toISOString(),
    })),
    resources: resources.map((n) => ({
      id: n.id,
      title: n.title,
      summary: n.summary,
      body: n.body,
      url: n.url,
      status: n.status === "PUBLISHED" ? "Published" : "Draft",
      updatedAt: n.updatedAt.toISOString(),
    })),
    pages: pages.map((p) => ({
      id: p.id,
      title: p.title,
      summary: p.introduction,
      body: p.body,
      url: p.path,
      status: p.status === "PUBLISHED" ? "Published" : "Draft",
      updatedAt: p.updatedAt.toISOString(),
    })),
    settings: {
      siteName: settings.siteName,
      description: settings.description,
      address: settings.address,
      enquiryEmail: settings.enquiryEmail,
    },
    activity: activity.map((a) => ({
      id: a.id,
      label: a.action,
      date: a.createdAt.toISOString(),
    })),
  };
}
