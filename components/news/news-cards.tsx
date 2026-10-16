import Link from "next/link";
import { Photograph } from "@/components/ui/photograph";
import type { NewsArticle } from "@/lib/content/news";
import { newsHref, readingMinutes } from "@/lib/news/links";

export function NewsCard({ article }: { article: NewsArticle }) {
  return (
    <article className="min-w-0">
      <Link
        href={newsHref(article.slug)}
        className="news-card group flex h-full flex-col overflow-hidden border border-border bg-white"
      >
        <Photograph
          asset={article.asset}
          className="aspect-[16/10]"
          sizes="(max-width: 639px) 90vw, (max-width: 1023px) 44vw, 30vw"
        />
        <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs">
            <span className="border-l-2 border-gold pl-2.5 font-bold text-blue">
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
          <h3 className="text-xl font-bold leading-[1.4] text-navy group-hover:underline group-hover:underline-offset-4">
            {article.title}
          </h3>
          <p className="text-sm leading-7 text-muted">{article.description}</p>
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
    <div className="site-container pt-10 md:pt-14">
      <article>
        <Link
          href={newsHref(article.slug)}
          className="news-card group grid overflow-hidden border border-border bg-paper lg:grid-cols-[1.2fr_1fr]"
        >
          <Photograph
            asset={article.asset}
            className="aspect-[16/10] lg:aspect-auto lg:min-h-[430px]"
            sizes="(max-width: 1023px) 92vw, 50vw"
            preload
          />
          <div className="flex flex-col items-start justify-center p-6 sm:p-9 lg:p-10">
            <p className="mb-5 border-l-2 border-gold pl-3 text-xs font-bold tracking-[0.14em] text-blue">
              FEATURED STORY
            </p>
            <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted">
              <span className="font-semibold text-blue">
                {article.category}
              </span>
              <time dateTime={article.dateTime}>{article.date}</time>
            </div>
            <h2 className="text-[clamp(1.5rem,2.3vw,2rem)] font-bold leading-[1.35] tracking-[-0.025em] text-navy group-hover:underline group-hover:underline-offset-4">
              {article.title}
            </h2>
            <p className="mt-5 text-sm leading-7 text-muted">
              {article.description}
            </p>
            <div className="mt-6 flex w-full flex-wrap items-center justify-between gap-4 border-t border-border pt-5">
              <span className="text-xs text-muted">
                {readingMinutes(article.paragraphs)} min read
              </span>
              <span className="text-sm font-bold text-blue">
                Read article{" "}
                <span aria-hidden="true" className="ml-2">
                  →
                </span>
              </span>
            </div>
          </div>
        </Link>
      </article>
    </div>
  );
}
