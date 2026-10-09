import Link from "next/link";
import { Photograph } from "@/components/ui/photograph";
import { Section } from "@/components/ui/section";
import { TextLink } from "@/components/ui/text-link";
import type { NewsArticle } from "@/lib/content/news";
import { destinations } from "@/lib/navigation";
import { newsHref, readingMinutes } from "@/lib/news/links";
import { ArticleShare } from "./article-share";

export function ArticleContent({
  article,
  related,
}: {
  article: NewsArticle;
  related: readonly NewsArticle[];
}) {
  return (
    <Section className="grid items-start gap-12 lg:grid-cols-[minmax(0,2.2fr)_minmax(0,1fr)]">
      <article className="min-w-0">
        <div className="mb-6 flex flex-wrap items-center gap-x-5 gap-y-3 border-b border-border pb-5 text-sm text-muted">
          <span className="bg-paper px-3 py-1.5 font-bold text-blue">
            {article.category}
          </span>
          <time dateTime={article.dateTime}>{article.date}</time>
          <span>{readingMinutes(article.paragraphs)} min read</span>
          <ArticleShare />
        </div>
        <figure className="mb-8 space-y-3">
          <Photograph
            asset={article.asset}
            className="aspect-[16/10]"
            sizes="(max-width: 1023px) 92vw, (max-width: 1440px) 62vw, 870px"
            preload
          />
          <figcaption className="text-xs leading-5 text-muted">
            {article.caption}
          </figcaption>
        </figure>
        <div className="max-w-[70ch] space-y-6">
          {article.paragraphs.map((paragraph, index) => (
            <p
              key={paragraph}
              className={
                index === 0
                  ? "text-lg font-medium leading-[1.75] text-ink"
                  : "text-[17px] leading-[1.8] text-muted"
              }
            >
              {paragraph}
            </p>
          ))}
        </div>
        <p className="mt-8 border-t border-border pt-5 text-xs leading-5 text-muted">
          Reporting reference: {article.source}.
        </p>
        <div className="mt-8">
          <TextLink href={destinations.news} className="text-sm text-blue">
            <span aria-hidden="true">← </span> Back to News &amp; Media
          </TextLink>
        </div>
      </article>
      <aside className="min-w-0 space-y-8" aria-label="More from the centre">
        <div className="border-t-4 border-gold bg-paper p-6">
          <h2 className="text-xl font-bold text-navy">Related news</h2>
          <nav aria-label="Related news" className="mt-6 space-y-6">
            {related.map((item) => (
              <Link
                key={item.slug}
                href={newsHref(item.slug)}
                className="group block space-y-2 border-b border-border pb-6 last:border-b-0 last:pb-0"
              >
                <span className="text-eyebrow font-bold text-blue">
                  {item.category}
                </span>
                <h3 className="text-base font-bold leading-[1.5] text-navy group-hover:underline group-hover:underline-offset-4">
                  {item.title}
                </h3>
                <time
                  dateTime={item.dateTime}
                  className="block text-xs text-muted"
                >
                  {item.date}
                </time>
              </Link>
            ))}
          </nav>
        </div>
        <div className="space-y-4 bg-navy p-6 text-white">
          <p className="text-eyebrow font-bold text-gold">MEDIA ENQUIRIES</p>
          <h2 className="text-xl font-bold leading-[1.4]">
            Get in touch with the centre
          </h2>
          <p className="text-sm leading-[1.6] text-white/85">
            For media requests, information and partnership enquiries.
          </p>
          <TextLink
            href={`${destinations.contact}?topic=media`}
            className="inline-flex min-h-11 items-center text-sm text-white"
          >
            Contact LSCCC{" "}
            <span aria-hidden="true" className="ml-2">
              →
            </span>
          </TextLink>
        </div>
      </aside>
    </Section>
  );
}
