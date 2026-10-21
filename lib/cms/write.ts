import "server-only";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db/prisma";
import { AuthError } from "@/lib/auth/errors";
import { createSlug } from "@/lib/admin/helpers";
import { deleteImageObject } from "@/lib/storage/neon";
import { destination, publication, text, uuid } from "./validation";

// Only explicit fields are accepted. Client snapshots never replace database state.
export async function writeContent(
  actorId: string,
  input: Record<string, unknown>,
) {
  const collection = text(input.collection, "collection", 20, true);
  const operation = text(input.operation, "operation", 10, true);
  if (
    ![
      "articles",
      "categories",
      "media",
      "notices",
      "resources",
      "pages",
      "settings",
    ].includes(collection) ||
    !["save", "delete"].includes(operation)
  ) {
    throw new AuthError(400, "Unsupported content change.");
  }
  const value = input.value as Record<string, unknown>;
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new AuthError(400, "Check the record.");
  }
  try {
    await prisma.$transaction(
      async (tx) => {
        // Serialize content changes, including media references and access changes.
        await tx.$executeRaw`SELECT pg_advisory_xact_lock(48392017)`;
        const actor = await tx.user.findUnique({ where: { id: actorId } });
        if (!actor || actor.status !== "ACTIVE") {
          throw new AuthError(401, "Sign in again.");
        }
        if (
          ["pages", "settings"].includes(collection) &&
          actor.role !== "ADMINISTRATOR"
        ) {
          throw new AuthError(403, "Administrator access is required.");
        }
        let entityId = "site";
        if (collection === "categories") {
          if (operation !== "save") {
            throw new AuthError(400, "Category removal is unavailable.");
          }
          const name = text(value.name, "category name", 60, true).replace(
            /\s+/g,
            " ",
          );
          const slug = createSlug(name);
          if (
            !slug ||
            ["all news", "all categories"].includes(name.toLowerCase())
          ) {
            throw new AuthError(400, "Choose another category name.");
          }
          const category = await tx.category.create({
            data: { name, nameKey: name.toLowerCase(), slug },
          });
          entityId = category.id;
        } else if (collection === "settings") {
          if (operation !== "save") {
            throw new AuthError(400, "Settings cannot be deleted.");
          }
          const enquiryEmail = text(value.enquiryEmail, "enquiry email", 254);
          if (
            enquiryEmail &&
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(enquiryEmail)
          ) {
            throw new AuthError(400, "Enter a valid enquiry email.");
          }
          await tx.siteSettings.update({
            where: { id: "site" },
            data: {
              siteName: text(value.siteName, "site name", 180, true),
              description: text(value.description, "description", 500, true),
              address: text(value.address, "address", 500, true),
              enquiryEmail,
            },
          });
        } else {
          entityId = uuid(value.id);
          if (collection === "articles") {
            const existing = await tx.newsArticle.findUnique({
              where: { id: entityId },
            });
            if (existing?.deletedAt) {
              throw new AuthError(404, "This article was deleted.");
            }
            if (
              existing &&
              existing.updatedAt.toISOString() !== input.expectedUpdatedAt
            ) {
              throw new AuthError(
                409,
                "This article changed. Reload it before saving.",
              );
            }
            if (operation === "delete") {
              if (!existing) {
                throw new AuthError(404, "Article unavailable.");
              }
              await tx.newsArticle.update({
                where: { id: entityId },
                data: { deletedAt: new Date(), status: "DRAFT", coverId: null },
              });
            } else {
              const status = publication(value.status);
              const title = text(value.title, "headline", 180, true);
              const slug = text(value.slug, "slug", 200, true);
              if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
                throw new AuthError(
                  400,
                  "Use a lowercase URL slug with hyphens.",
                );
              }
              const excerpt = text(
                value.excerpt,
                "summary",
                500,
                status === "PUBLISHED",
              );
              const body = text(
                value.body,
                "article body",
                60000,
                status === "PUBLISHED",
              );
              const category = await tx.category.findUnique({
                where: {
                  nameKey: text(
                    value.category,
                    "category",
                    60,
                    true,
                  ).toLowerCase(),
                },
              });
              if (!category) {
                throw new AuthError(400, "Choose an existing category.");
              }
              const coverId = value.coverId ? uuid(value.coverId) : null;
              if (
                coverId &&
                !(await tx.mediaAsset.findFirst({
                  where: { id: coverId, status: "READY" },
                }))
              ) {
                throw new AuthError(400, "Choose an available image.");
              }
              if (status === "PUBLISHED" && !coverId) {
                throw new AuthError(
                  400,
                  "Choose a cover image before publishing.",
                );
              }
              const data = {
                title,
                slug,
                excerpt,
                body,
                categoryId: category.id,
                coverId,
                byline: text(value.author, "author", 120, true),
                source: text(value.source, "reporting reference", 500),
                caption: text(value.caption, "image caption", 500),
                status,
                publishedAt:
                  status === "PUBLISHED"
                    ? (existing?.publishedAt ?? new Date())
                    : (existing?.publishedAt ?? null),
              };
              if (existing) {
                await tx.newsArticle.update({ where: { id: entityId }, data });
              } else {
                await tx.newsArticle.create({
                  data: { ...data, id: entityId, creatorId: actorId },
                });
              }
            }
          } else if (collection === "media") {
            const image = await tx.mediaAsset.findUnique({
              where: { id: entityId },
            });
            if (!image) {
              throw new AuthError(404, "Image unavailable.");
            }
            if (operation === "delete") {
              if (image.provider === "LOCAL") {
                throw new AuthError(
                  409,
                  "Original design photographs are retained because website sections use them.",
                );
              }
              if (
                await tx.newsArticle.count({ where: { coverId: entityId } })
              ) {
                throw new AuthError(
                  409,
                  "An article uses this image. Change its cover first.",
                );
              }
              if (image.objectKey) {
                await deleteImageObject(image.objectKey);
              }
              await tx.mediaAsset.delete({ where: { id: entityId } });
            } else {
              await tx.mediaAsset.update({
                where: { id: entityId },
                data: {
                  filename: text(value.name, "image name", 200, true),
                  alt: text(value.alt, "alternative text", 500, true),
                },
              });
            }
          } else if (collection === "pages") {
            if (operation === "delete") {
              throw new AuthError(400, "Website pages cannot be deleted.");
            }
            const page = await tx.websitePage.findUnique({
              where: { id: entityId },
            });
            if (!page) {
              throw new AuthError(404, "Page unavailable.");
            }
            if (page.updatedAt.toISOString() !== input.expectedUpdatedAt) {
              throw new AuthError(
                409,
                "This page changed. Reload before saving.",
              );
            }
            await tx.websitePage.update({
              where: { id: entityId },
              data: {
                title: text(value.title, "page title", 180, true),
                introduction: text(value.summary, "introduction", 500, true),
                body: text(value.body, "page body", 60000),
                status: publication(value.status),
              },
            });
          } else {
            const existing =
              collection === "notices"
                ? await tx.publicNotice.findUnique({ where: { id: entityId } })
                : await tx.safetyResource.findUnique({
                    where: { id: entityId },
                  });
            if (
              existing &&
              existing.updatedAt.toISOString() !== input.expectedUpdatedAt
            ) {
              throw new AuthError(
                409,
                "This content changed. Reload before saving.",
              );
            }
            if (operation === "delete") {
              if (!existing) {
                throw new AuthError(404, "Content unavailable.");
              }
              if (collection === "notices") {
                await tx.publicNotice.delete({ where: { id: entityId } });
              } else {
                await tx.safetyResource.delete({ where: { id: entityId } });
              }
            } else {
              const status = publication(value.status);
              const data = {
                title: text(value.title, "title", 180, true),
                summary: text(value.summary, "summary", 500, true),
                body: text(value.body, "body", 60000),
                url: destination(value.url),
                status,
                publishedAt:
                  status === "PUBLISHED"
                    ? (existing?.publishedAt ?? new Date())
                    : null,
              };
              if (existing) {
                if (collection === "notices") {
                  await tx.publicNotice.update({
                    where: { id: entityId },
                    data,
                  });
                } else {
                  await tx.safetyResource.update({
                    where: { id: entityId },
                    data,
                  });
                }
              } else {
                const create = { ...data, id: entityId, key: entityId };
                if (collection === "notices") {
                  await tx.publicNotice.create({ data: create });
                } else {
                  await tx.safetyResource.create({ data: create });
                }
              }
            }
          }
        }
        await tx.auditLog.create({
          data: {
            actorId,
            action: `${operation === "delete" ? "Deleted" : "Saved"} ${collection}`,
            entityType: collection,
            entityId,
          },
        });
      },
      { timeout: 30000 },
    );
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      throw new AuthError(
        409,
        "This category name or article slug is already in use.",
      );
    }
    throw error;
  }
}
