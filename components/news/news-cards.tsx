import Link from "next/link";
import { Photograph } from "@/components/ui/photograph";
import type { NewsArticle } from "@/lib/content/news";
import { newsHref, readingMinutes } from "@/lib/news/links";

export function NewsCard({ article }: { article: NewsArticle }) {
  return (
    <article className="min-w-0">
      <Link
        href={newsHref(article.slug)}
        className="news-card group flex h-full flex-col border-b border-border pb-6"
      >
        <Photograph
          asset={article.asset}
          className="aspect-[16/10]"
          sizes="(max-width: 639px) 90vw, (max-width: 1023px) 44vw, 30vw"
        />
        <div className="flex flex-1 flex-col gap-3 pt-5">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs">
            <span className="bg-paper px-2.5 py-1 font-bold text-blue">
              {article.category}
            </span>
            <span className="text-muted">
              {readingMinutes(article.paragraphs)} min read
            </span>
          </div>
          <time
            dateTime={article.dateTime}
            className="text-xs font-medium text-muted"
          >
            {article.date}
          </time>
          <h3 className="text-[22px] font-bold leading-[1.4] text-navy group-hover:underline group-hover:underline-offset-4">
            {article.title}
          </h3>
          <p className="text-[15px] leading-[1.6] text-muted">
            {article.description}
          </p>
          <span className="mt-auto inline-flex items-center gap-2 pt-2 text-sm font-bold text-blue">
            Read article <span aria-hidden="true">→</span>
          </span>
        </div>
      </Link>
    </article>
  );
}

export function FeaturedNews({ article }: { article: NewsArticle }) {
  return (
    <div className="site-container pt-8 sm:pt-10">
      <article>
        <Link
          href={newsHref(article.slug)}
          className="group relative isolate flex min-h-[430px] items-end overflow-hidden bg-navy text-white sm:min-h-[460px]"
        >
          <Photograph
            asset={article.asset}
            className="absolute inset-0 -z-20"
            sizes="(max-width: 1440px) 92vw, 1312px"
            preload
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-navy via-navy/80 to-navy/10" />
          <div className="flex max-w-[860px] flex-col gap-4 p-6 sm:p-10 lg:p-12">
            <p className="text-eyebrow font-bold tracking-wide text-gold">
              FEATURED STORY
            </p>
            <time dateTime={article.dateTime} className="text-sm text-white/85">
              {article.date}
            </time>
            <h2 className="text-[28px] font-bold leading-[1.25] group-hover:underline group-hover:underline-offset-4 sm:text-[36px] lg:text-[42px]">
              {article.title}
            </h2>
            <p className="max-w-[660px] text-base leading-[1.6] text-white/90">
              {article.description}
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-1 text-xs">
              <span className="bg-gold px-3 py-1.5 font-bold text-navy">
                {article.category}
              </span>
              <span>{readingMinutes(article.paragraphs)} min read</span>
              <span className="ml-auto inline-flex items-center gap-2 text-sm font-bold sm:ml-2">
                Read article <span aria-hidden="true">→</span>
              </span>
            </div>
          </div>
        </Link>
      </article>
    </div>
  );
}
