import "server-only";
import { randomUUID } from "node:crypto";
import { PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { createStorageConnection, imageObjectUrl } from "./client";
import {
  hasImageSignature,
  imageExtensions,
  isManagedImageKey,
  validateImageMetadata,
} from "./images";

function assertManagedKey(objectKey: string) {
  if (!isManagedImageKey(objectKey)) {
    throw new Error("Invalid managed image key.");
  }
}

export async function uploadImageObject(body: Uint8Array, mimeType: string) {
  const type = validateImageMetadata(mimeType, body.byteLength);
  if (!hasImageSignature(body, type)) {
    throw new Error("The file is not the expected image type.");
  }
  const { client, config } = createStorageConnection();
  const objectKey = `media/${randomUUID()}.${imageExtensions[type]}`;
  await client.send(
    new PutObjectCommand({
      Bucket: config.bucket,
      Key: objectKey,
      ContentType: type,
      ContentLength: body.byteLength,
      Body: body,
    }),
  );
  return { objectKey, url: imageObjectUrl(config, objectKey) };
}

// The calling service must first confirm there are no content references.
export async function deleteImageObject(objectKey: string) {
  assertManagedKey(objectKey);
  const { client, config } = createStorageConnection();
  await client.send(
    new DeleteObjectCommand({ Bucket: config.bucket, Key: objectKey }),
  );
}
