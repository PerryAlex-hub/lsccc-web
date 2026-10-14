import { loadEnvConfig } from "@next/env";
import { readFile } from "node:fs/promises";
import { randomUUID } from "node:crypto";
import {
  GetBucketCorsCommand,
  PutBucketCorsCommand,
  HeadBucketCommand,
  PutObjectCommand,
  GetObjectCommand,
  HeadObjectCommand,
  DeleteObjectCommand,
  type CORSRule,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { createStorageConnection, imageObjectUrl } from "../lib/storage/client";
import { hasImageSignature } from "../lib/storage/images";

loadEnvConfig(process.cwd());

async function check() {
  const { client, config } = createStorageConnection();
  const key = `media/${randomUUID()}.jpg`;
  let uploaded = false;
  try {
    await client.send(new HeadBucketCommand({ Bucket: config.bucket }));
    console.log("Neon bucket access succeeded.");
    if (process.argv.includes("--configure-cors")) {
      const appUrl = process.env.APP_URL;
      if (!appUrl) {
        throw new Error("APP_URLMissing");
      }
      const origin = new URL(appUrl).origin;
      let rules: CORSRule[];
      try {
        rules =
          (
            await client.send(
              new GetBucketCorsCommand({ Bucket: config.bucket }),
            )
          ).CORSRules || [];
      } catch (error) {
        if (
          !(error instanceof Error) ||
          !["NoSuchCORSConfiguration", "NoSuchCORS", "NotFound"].includes(
            error.name,
          )
        ) {
          throw error;
        }
        rules = [];
      }
      if (
        !rules.some(
          (rule) =>
            rule.AllowedOrigins?.includes(origin) &&
            rule.AllowedMethods?.includes("PUT") &&
            (rule.AllowedHeaders?.includes("*") ||
              rule.AllowedHeaders?.some(
                (header) => header.toLowerCase() === "content-type",
              )),
        )
      ) {
        await client.send(
          new PutBucketCorsCommand({
            Bucket: config.bucket,
            CORSConfiguration: {
              CORSRules: [
                ...rules,
                {
                  AllowedOrigins: [origin],
                  AllowedMethods: ["GET", "HEAD", "PUT"],
                  AllowedHeaders: ["Content-Type"],
                  ExposeHeaders: ["ETag"],
                  MaxAgeSeconds: 3600,
                },
              ],
            },
          }),
        );
        console.log(
          "Added upload CORS for APP_URL; existing rules were preserved.",
        );
      } else {
        console.log("Upload CORS already includes APP_URL.");
      }
    }
    const bytes = await readFile("public/images/lsccc/lsccc-emblem.jpg");
    const url = await getSignedUrl(
      client,
      new PutObjectCommand({
        Bucket: config.bucket,
        Key: key,
        ContentType: "image/jpeg",
        ContentLength: bytes.length,
      }),
      { expiresIn: 60 },
    );
    if (process.env.APP_URL) {
      const origin = new URL(process.env.APP_URL).origin;
      const preflight = await fetch(url, {
        method: "OPTIONS",
        headers: {
          Origin: origin,
          "Access-Control-Request-Method": "PUT",
          "Access-Control-Request-Headers": "content-type",
        },
      });
      const allowedOrigin = preflight.headers.get(
        "access-control-allow-origin",
      );
      if (
        !preflight.ok ||
        (allowedOrigin !== origin && allowedOrigin !== "*")
      ) {
        throw new Error("UploadCorsCheckFailed");
      }
      console.log("Browser upload CORS preflight succeeded.");
    }
    const result = await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "image/jpeg" },
      body: new Uint8Array(bytes).buffer,
    });
    if (!result.ok) {
      throw new Error("SignedUploadFailed");
    }
    uploaded = true;
    const metadata = await client.send(
      new HeadObjectCommand({ Bucket: config.bucket, Key: key }),
    );
    if (
      metadata.ContentLength !== bytes.length ||
      metadata.ContentType !== "image/jpeg"
    ) {
      throw new Error("UploadMetadataMismatch");
    }
    const object = await client.send(
      new GetObjectCommand({
        Bucket: config.bucket,
        Key: key,
        Range: "bytes=0-11",
      }),
    );
    const signature = await object.Body?.transformToByteArray();
    if (!signature || !hasImageSignature(signature, "image/jpeg")) {
      throw new Error("ImageSignatureMismatch");
    }
    console.log(
      "Signed upload, metadata and image signature checks succeeded.",
    );
    const publicRead = await fetch(imageObjectUrl(config, key), {
      method: "HEAD",
    });
    if (!publicRead.ok) {
      throw new Error("BucketNotPublicRead");
    }
    console.log("Anonymous image read succeeded.");
  } finally {
    if (uploaded) {
      await client.send(
        new DeleteObjectCommand({ Bucket: config.bucket, Key: key }),
      );
      console.log("Temporary verification image removed.");
    }
    client.destroy();
  }
}

check().catch((error) => {
  console.error(
    "Storage check failed:",
    error instanceof Error
      ? error.name === "Error"
        ? error.message
        : error.name
      : "UnknownError",
  );
  process.exitCode = 1;
});
