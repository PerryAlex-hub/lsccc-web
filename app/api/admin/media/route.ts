import { requireUser } from "@/lib/auth/session";
import {
  assertRequestOrigin,
  authFailure,
  authResponse,
} from "@/lib/auth/http";
import { AuthError } from "@/lib/auth/errors";
import { getDatabase } from "@/lib/db/prisma";
import { uploadImageObject, deleteImageObject } from "@/lib/storage/neon";
import { hasImageSignature, validateImageMetadata } from "@/lib/storage/images";
import { readAdminContent } from "@/lib/cms/read";
import { text } from "@/lib/cms/validation";
import { rateLimit } from "@/lib/auth/rate-limit";

export async function POST(request: Request) {
  let objectKey: string | undefined;
  try {
    const user = await requireUser();
    assertRequestOrigin(request);
    await rateLimit("media-upload", user.id, 30, 60);
    const filename = text(
      decodeURIComponent(request.headers.get("x-filename") ?? ""),
      "image name",
      200,
      true,
    );
    const mimeType = request.headers.get("content-type") ?? "";
    const reader = request.body?.getReader();
    if (!reader) {
      throw new AuthError(400, "Choose an image.");
    }
    const chunks: Uint8Array[] = [];
    let size = 0;
    while (true) {
      const chunk = await reader.read();
      if (chunk.done) {
        break;
      }
      size += chunk.value.byteLength;
      if (size > 2097152) {
        await reader.cancel();
        throw new AuthError(413, "Choose an image smaller than 2 MB.");
      }
      chunks.push(chunk.value);
    }
    try {
      validateImageMetadata(mimeType, size);
    } catch {
      throw new AuthError(
        400,
        "Choose a JPG, PNG or WebP image smaller than 2 MB.",
      );
    }
    const body = Buffer.concat(chunks);
    if (!hasImageSignature(body, validateImageMetadata(mimeType, size))) {
      throw new AuthError(400, "The file does not match its image type.");
    }
    const image = await uploadImageObject(body, mimeType);
    objectKey = image.objectKey;
    const asset = await getDatabase().$transaction(async (tx) => {
      await tx.$executeRaw`SELECT pg_advisory_xact_lock(48392017)`;
      const actor = await tx.user.findUnique({ where: { id: user.id } });
      if (!actor || actor.status !== "ACTIVE") {
        throw new AuthError(401, "Sign in again.");
      }
      const asset = await tx.mediaAsset.create({
        data: {
          ...image,
          filename,
          alt: filename.replace(/\.[^.]+$/, "").replace(/[-_]/g, " "),
          mimeType,
          byteSize: size,
          uploaderId: user.id,
          provider: "NEON",
          status: "READY",
        },
      });
      await tx.auditLog.create({
        data: {
          actorId: user.id,
          action: "Uploaded image",
          entityType: "media",
          entityId: asset.id,
        },
      });
      return asset;
    });
    objectKey = undefined;
    return authResponse(
      {
        id: asset.id,
        state: await readAdminContent(),
        message: "Image uploaded to Neon storage.",
      },
      201,
    );
  } catch (error) {
    if (objectKey) {
      await deleteImageObject(objectKey).catch(() => {});
    }
    return authFailure(error);
  }
}
