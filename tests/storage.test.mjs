import assert from "node:assert/strict";
import { test } from "node:test";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import {
  getStorageConfiguration,
  createStorageConnection,
  imageObjectUrl,
} from "../lib/storage/client.ts";
import {
  hasImageSignature,
  isManagedImageKey,
  validateImageMetadata,
  MAX_IMAGE_BYTES,
} from "../lib/storage/images.ts";

test("uploads reject executable formats, empty files and oversized images", () => {
  assert.throws(() => validateImageMetadata("image/svg+xml", 100));
  assert.throws(() => validateImageMetadata("text/html", 100));
  for (const size of [0, -1, 1.5, Number.NaN, MAX_IMAGE_BYTES + 1]) {
    assert.throws(() => validateImageMetadata("image/jpeg", size));
  }
  assert.equal(
    validateImageMetadata("image/jpeg", MAX_IMAGE_BYTES),
    "image/jpeg",
  );
});

test("extension and MIME claims alone do not validate image content", () => {
  const html = new TextEncoder().encode("<html>fake.jpg</html>");
  for (const type of ["image/jpeg", "image/png", "image/webp"]) {
    assert.equal(hasImageSignature(html, type), false);
    assert.equal(hasImageSignature(new Uint8Array(), type), false);
  }
  assert.equal(
    hasImageSignature(Uint8Array.from([255, 216, 255]), "image/jpeg"),
    true,
  );
  const png = Uint8Array.from([137, 80, 78, 71, 13, 10, 26, 10]);
  assert.equal(hasImageSignature(png, "image/png"), true);
  assert.equal(hasImageSignature(png, "image/jpeg"), false);
  assert.equal(
    hasImageSignature(new TextEncoder().encode("RIFF1234WEBP"), "image/webp"),
    true,
  );
  assert.equal(
    hasImageSignature(new TextEncoder().encode("RIFF1234HTML"), "image/webp"),
    false,
  );
});

test("object operations are restricted to managed image keys", () => {
  assert.equal(
    isManagedImageKey("media/04b5a234-e212-48c8-a17f-5b2945caf593.jpg"),
    true,
  );
  for (const key of [
    "../secret",
    "media/../secret.jpg",
    "media/file.jpg",
    "other/04b5a234-e212-48c8-a17f-5b2945caf593.jpg",
    "media/04b5a234-e212-48c8-a17f-5b2945caf593.svg",
  ]) {
    assert.equal(isManagedImageKey(key), false);
  }
});

const storageEnvironment = {
  AWS_ENDPOINT_URL_S3: "https://storage.example.test",
  AWS_REGION: "us-east-2",
  AWS_ACCESS_KEY_ID: "test-key",
  AWS_SECRET_ACCESS_KEY: "test-secret",
  STORAGE_BUCKET_NAME: "lsccc-media",
};

test("storage setup rejects missing settings and malformed branch endpoints", () => {
  assert.throws(() => getStorageConfiguration({}));
  for (const endpoint of [
    "http://storage.example.test",
    "https://user:password@storage.example.test",
    "https://storage.example.test?secret=value",
    "https://storage.example.test/bucket",
  ]) {
    assert.throws(() =>
      getStorageConfiguration({
        ...storageEnvironment,
        AWS_ENDPOINT_URL_S3: endpoint,
      }),
    );
  }
  assert.equal(
    imageObjectUrl(
      getStorageConfiguration(storageEnvironment),
      "media/an image.jpg",
    ),
    "https://storage.example.test/lsccc-media/media/an%20image.jpg",
  );
});

test("Neon signed uploads use path-style URLs without an empty-body checksum", async () => {
  const { client, config } = createStorageConnection(storageEnvironment);
  try {
    const signed = new URL(
      await getSignedUrl(
        client,
        new PutObjectCommand({
          Bucket: config.bucket,
          Key: "media/test.jpg",
          ContentType: "image/jpeg",
          ContentLength: 100,
        }),
        { expiresIn: 60 },
      ),
    );
    assert.equal(signed.pathname, "/lsccc-media/media/test.jpg");
    assert.equal(signed.searchParams.get("X-Amz-Expires"), "60");
    assert.equal(signed.searchParams.has("x-amz-checksum-crc32"), false);
  } finally {
    client.destroy();
  }
});
