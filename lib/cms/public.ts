import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { prisma } from "@/lib/db/prisma";

export async function getWebsitePage(path: string) {
  "use cache";
  cacheLife("hours");
  cacheTag("public-content");
  return prisma.websitePage.findUnique({ where: { path } });
}

export async function getSiteSettings() {
  "use cache";
  cacheLife("hours");
  cacheTag("public-content");
  return prisma.siteSettings.findUniqueOrThrow({
    where: { id: "site" },
  });
}

export async function getPublicNotices() {
  "use cache";
  cacheLife("hours");
  cacheTag("public-content");
  return prisma.publicNotice.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { createdAt: "asc" },
  });
}

export async function getSafetyResources() {
  "use cache";
  cacheLife("hours");
  cacheTag("public-content");
  const resources = await prisma.safetyResource.findMany({
    where: { status: "PUBLISHED" },
    orderBy: [{ position: "asc" }, { createdAt: "asc" }],
  });
  const accents = ["bg-red", "bg-blue", "bg-green", "bg-gold", "bg-navy"];
  return resources.map((resource, index) => ({
    id: resource.key,
    title: resource.title,
    description: resource.summary,
    body: resource.body,
    href: resource.url,
    accent: accents[index % accents.length],
  }));
}

export async function getPageMetadata(path: string) {
  const page = await getWebsitePage(path);
  return {
    title: page?.title,
    description: page?.metaDescription || page?.introduction,
  };
}
