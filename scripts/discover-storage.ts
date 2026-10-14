import { loadEnvConfig } from "@next/env";
import { S3Client, ListBucketsCommand } from "@aws-sdk/client-s3";

loadEnvConfig(process.cwd());

async function discover() {
  const client = new S3Client({
    endpoint: process.env.AWS_ENDPOINT_URL_S3,
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
    },
    forcePathStyle: true,
    requestChecksumCalculation: "WHEN_REQUIRED",
  });
  try {
    const result = await client.send(new ListBucketsCommand({}));
    console.log(
      JSON.stringify({
        buckets: result.Buckets?.map((bucket) => bucket.Name) || [],
      }),
    );
  } catch (error) {
    console.error(
      "Storage discovery failed:",
      error instanceof Error ? error.name : "UnknownError",
    );
    process.exitCode = 1;
  } finally {
    client.destroy();
  }
}

discover().catch(() => {
  console.error("Storage discovery could not start.");
  process.exitCode = 1;
});
