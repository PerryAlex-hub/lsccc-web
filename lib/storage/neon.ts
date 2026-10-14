import "server-only";
import { randomUUID } from "node:crypto";
import {
  PutObjectCommand,
  GetObjectCommand,
  HeadObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
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

// Called by an authorised upload endpoint in the media integration batch.
export async function prepareImageUpload(mimeType: string, byteSize: number) {
  const imageType = validateImageMetadata(mimeType, byteSize);
  const { client, config } = createStorageConnection();
  const objectKey = `media/${randomUUID()}.${imageExtensions[imageType]}`;
  const uploadUrl = await getSignedUrl(
    client,
    new PutObjectCommand({
      Bucket: config.bucket,
      Key: objectKey,
      ContentType: imageType,
      ContentLength: byteSize,
    }),
    { expiresIn: 300 },
  );
  return {
    objectKey,
    uploadUrl,
    url: imageObjectUrl(config, objectKey),
    expiresIn: 300,
  };
}

// Do not mark a pending database record READY until this succeeds.
export async function verifyImageUpload(
  objectKey: string,
  expectedType: string,
  expectedSize: number,
) {
  assertManagedKey(objectKey);
  const mimeType = validateImageMetadata(expectedType, expectedSize);
  if (!objectKey.endsWith(`.${imageExtensions[mimeType]}`)) {
    throw new Error("The image key does not match its file type.");
  }
  const { client, config } = createStorageConnection();
  const metadata = await client.send(
    new HeadObjectCommand({ Bucket: config.bucket, Key: objectKey }),
  );
  if (
    metadata.ContentLength !== expectedSize ||
    metadata.ContentType !== mimeType
  ) {
    throw new Error("The uploaded image does not match the requested file.");
  }
  const object = await client.send(
    new GetObjectCommand({
      Bucket: config.bucket,
      Key: objectKey,
      Range: "bytes=0-11",
    }),
  );
  const signature = await object.Body?.transformToByteArray();
  if (!signature || !hasImageSignature(signature, mimeType)) {
    throw new Error("The uploaded file is not the expected image type.");
  }
  return {
    url: imageObjectUrl(config, objectKey),
    mimeType,
    byteSize: expectedSize,
  };
}

// The calling service must first confirm there are no content references.
export async function deleteImageObject(objectKey: string) {
  assertManagedKey(objectKey);
  const { client, config } = createStorageConnection();
  await client.send(
    new DeleteObjectCommand({ Bucket: config.bucket, Key: objectKey }),
  );
}
