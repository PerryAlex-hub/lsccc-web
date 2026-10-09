import { destinations } from "@/lib/navigation";

export function newsHref(slug: string) {
  return `${destinations.news}/${slug}`;
}

export function readingMinutes(paragraphs: readonly string[]) {
  const words = paragraphs.join(" ").split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}
