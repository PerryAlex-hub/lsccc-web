import { loadEnvConfig } from "@next/env";
import { readFile, stat } from "node:fs/promises";
import { join } from "node:path";
import { createDatabaseClient } from "../lib/db/client";

type SeedData = {
  categories: { name: string; nameKey: string; slug: string }[];
  media: {
    key: string;
    filename: string;
    alt: string;
    width: number;
    height: number;
  }[];
  articles: {
    title: string;
    slug: string;
    excerpt: string;
    body: string;
    source: string;
    caption: string;
    category: string;
    cover: string;
    publishedAt: string;
  }[];
  notices: {
    key: string;
    title: string;
    summary: string;
    body: string;
    url: string;
  }[];
  resources: {
    key: string;
    title: string;
    summary: string;
    body: string;
    url: string;
  }[];
  pages: {
    key: string;
    title: string;
    path: string;
    introduction: string;
    body: string;
  }[];
  settings: {
    siteName: string;
    description: string;
    address: string;
    enquiryEmail: string;
  };
};

loadEnvConfig(process.cwd());

async function seed() {
  const data: SeedData = JSON.parse(
    await readFile(join(process.cwd(), "prisma/seed-data.json"), "utf8"),
  );
  const database = createDatabaseClient();
  try {
    // Empty updates mean rerunning the seed never overwrites editorial changes.
    await database.$transaction(
      async (tx) => {
        const categories = new Map<string, string>();
        for (const category of data.categories) {
          const saved = await tx.category.upsert({
            where: { nameKey: category.nameKey },
            update: {},
            create: category,
          });
          categories.set(category.name, saved.id);
        }
        const covers = new Map<string, string>();
        for (const media of data.media) {
          const byteSize = (
            await stat(
              join(process.cwd(), "public/images/lsccc", media.filename),
            )
          ).size;
          const saved = await tx.mediaAsset.upsert({
            where: { objectKey: media.key },
            update: {},
            create: {
              objectKey: media.key,
              provider: "LOCAL",
              status: "READY",
              url: `/images/lsccc/${media.filename}`,
              filename: media.filename,
              alt: media.alt,
              mimeType: "image/jpeg",
              byteSize,
              width: media.width,
              height: media.height,
            },
          });
          covers.set(media.key, saved.id);
        }
        for (const article of data.articles) {
          const categoryId = categories.get(article.category);
          const coverId = covers.get(article.cover);
          if (!categoryId || !coverId) {
            throw new Error(
              "Seed article has an unresolved category or cover.",
            );
          }
          await tx.newsArticle.upsert({
            where: { slug: article.slug },
            update: {},
            create: {
              title: article.title,
              slug: article.slug,
              excerpt: article.excerpt,
              body: article.body,
              categoryId,
              coverId,
              source: article.source,
              caption: article.caption,
              status: "PUBLISHED",
              publishedAt: new Date(article.publishedAt),
            },
          });
        }
        for (const notice of data.notices) {
          await tx.publicNotice.upsert({
            where: { key: notice.key },
            update: {},
            create: {
              ...notice,
              status: "PUBLISHED",
              publishedAt: new Date("2026-05-20"),
            },
          });
        }
        for (const [position, resource] of data.resources.entries()) {
          await tx.safetyResource.upsert({
            where: { key: resource.key },
            update: {},
            create: {
              ...resource,
              position,
              status: "PUBLISHED",
              publishedAt: new Date("2026-05-20"),
            },
          });
        }
        for (const page of data.pages) {
          const saved = await tx.websitePage.upsert({
            where: { key: page.key },
            update: {},
            create: {
              ...page,
              metaDescription: page.introduction,
              status: "PUBLISHED",
            },
          });
          await tx.pageSection.upsert({
            where: { pageId_key: { pageId: saved.id, key: "introduction" } },
            update: {},
            create: {
              pageId: saved.id,
              key: "introduction",
              content: { title: page.title, text: page.introduction },
            },
          });
        }
        await tx.siteSettings.upsert({
          where: { id: "site" },
          update: {},
          create: { id: "site", ...data.settings },
        });
      },
      { timeout: 120000 },
    );
    console.log(
      "Seeded website content. Existing records were preserved; no staff accounts were created.",
    );
  } finally {
    await database.$disconnect();
  }
}

seed().catch(() => {
  console.error(
    "Seed failed. Check DATABASE_URL, applied migrations and seed data. Database credentials have not been printed.",
  );
  process.exitCode = 1;
});
