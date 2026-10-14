export const MAX_IMAGE_BYTES = 2 * 1024 * 1024;

export const imageExtensions = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
} as const;

export type ImageMimeType = keyof typeof imageExtensions;

export function validateImageMetadata(mimeType: string, byteSize: number) {
  if (!Object.hasOwn(imageExtensions, mimeType)) {
    throw new Error("Choose a JPG, PNG or WebP image.");
  }
  if (
    !Number.isInteger(byteSize) ||
    byteSize <= 0 ||
    byteSize > MAX_IMAGE_BYTES
  ) {
    throw new Error("Choose an image no larger than 2 MB.");
  }
  return mimeType as ImageMimeType;
}

export function hasImageSignature(bytes: Uint8Array, mimeType: ImageMimeType) {
  const startsWith = (signature: number[]) =>
    signature.every((byte, index) => bytes[index] === byte);
  if (mimeType === "image/jpeg") {
    return startsWith([0xff, 0xd8, 0xff]);
  }
  if (mimeType === "image/png") {
    return startsWith([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  }
  return (
    startsWith([0x52, 0x49, 0x46, 0x46]) &&
    [0x57, 0x45, 0x42, 0x50].every((byte, index) => bytes[index + 8] === byte)
  );
}

export function isManagedImageKey(key: string) {
  return /^media\/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}\.(jpg|png|webp)$/.test(
    key,
  );
}
