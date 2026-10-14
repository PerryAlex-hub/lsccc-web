import type { StaticImageData } from "next/image";

export type NewsArticle = {
  slug: string;
  title: string;
  description: string;
  category: string;
  date: string;
  dateTime: string;
  asset: { image: StaticImageData | string; alt: string };
  author?: string;
  caption: string;
  source: string;
  paragraphs: readonly string[];
};
