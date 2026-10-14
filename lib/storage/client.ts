import { S3Client } from "@aws-sdk/client-s3";

export function getStorageConfiguration(
  environment: NodeJS.ProcessEnv = process.env,
) {
  const endpoint = environment.AWS_ENDPOINT_URL_S3;
  const region = environment.AWS_REGION;
  const accessKeyId = environment.AWS_ACCESS_KEY_ID;
  const secretAccessKey = environment.AWS_SECRET_ACCESS_KEY;
  const bucket = environment.STORAGE_BUCKET_NAME;
  if (!endpoint || !region || !accessKeyId || !secretAccessKey || !bucket) {
    throw new Error("Neon Object Storage is not configured.");
  }
  const url = new URL(endpoint);
  if (
    url.protocol !== "https:" ||
    url.username ||
    url.password ||
    url.search ||
    url.hash ||
    (url.pathname !== "/" && url.pathname !== "")
  ) {
    throw new Error(
      "AWS_ENDPOINT_URL_S3 must be the branch's HTTPS storage endpoint.",
    );
  }
  if (
    !/^[a-z0-9][a-z0-9.-]{1,61}[a-z0-9]$/.test(bucket) ||
    bucket.includes("..")
  ) {
    throw new Error("STORAGE_BUCKET_NAME must be a valid S3 bucket name.");
  }
  return { endpoint: url.origin, region, accessKeyId, secretAccessKey, bucket };
}

export function createStorageConnection(
  environment: NodeJS.ProcessEnv = process.env,
) {
  const config = getStorageConfiguration(environment);
  const client = new S3Client({
    region: config.region,
    endpoint: config.endpoint,
    credentials: {
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey,
    },
    forcePathStyle: true,
    requestChecksumCalculation: "WHEN_REQUIRED",
  });
  return { config, client };
}

export function imageObjectUrl(
  config: { endpoint: string; bucket: string },
  objectKey: string,
) {
  return `${config.endpoint}/${encodeURIComponent(config.bucket)}/${objectKey.split("/").map(encodeURIComponent).join("/")}`;
}
