-- Preserve existing objects while changing the configured storage provider.
ALTER TYPE "StorageProvider" RENAME VALUE 'R2' TO 'NEON';

ALTER TABLE "MediaAsset" RENAME CONSTRAINT "MediaAsset_r2_key_valid" TO "MediaAsset_neon_key_valid";
