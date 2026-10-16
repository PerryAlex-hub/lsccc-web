import Link from "next/link";
import type { ReactNode } from "react";
import { getWebsitePage } from "@/lib/cms/public";
import { notFound } from "next/navigation";
import { Photograph } from "./photograph";
import { assets } from "@/lib/assets";

type Breadcrumb = { label: string; href?: string };

export async function InteriorPage({
  title,
  description,
  breadcrumbs,
  children,
  nodeId,
  cmsPath,
  image,
}: {
  title: string;
  description: string;
  breadcrumbs: Breadcrumb[];
  children: ReactNode;
  nodeId?: string;
  cmsPath?: string;
  image?: "operations" | "responderTraining" | "lermsEngagement";
}) {
  const page = cmsPath ? await getWebsitePage(cmsPath) : null;
  if (cmsPath && (!page || page.status !== "PUBLISHED")) {
    notFound();
  }
  title = page?.title ?? title;
  description = page?.introduction ?? description;
  return (
    <div>
      <div
        className="relative isolate overflow-hidden bg-navy text-white"
        data-node-id={nodeId}
      >
        {image && (
          <div className="absolute inset-y-0 right-0 -z-10 hidden w-1/2 overflow-hidden opacity-35 lg:block">
            <Photograph
              asset={assets[image]}
              className="absolute inset-0"
              sizes="50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/30 to-transparent" />
          </div>
        )}
        <div className="site-container flex flex-col items-start py-10 sm:py-14 lg:py-16">
          <nav
            aria-label="Breadcrumb"
            className="mb-7 text-xs font-medium leading-5 text-white/75"
          >
            <ol className="flex flex-wrap gap-x-3 gap-y-2">
              {[{ label: "Home", href: "/" }, ...breadcrumbs].map(
                (item, index) => (
                  <li key={item.label} className="flex items-center gap-3">
                    {index > 0 && <span aria-hidden="true">/</span>}
                    {item.href ? (
                      <Link href={item.href} className="hover:underline">
                        {item.label}
                      </Link>
                    ) : (
                      <span aria-current="page" className="text-gold">
                        {item.label}
                      </span>
                    )}
                  </li>
                ),
              )}
            </ol>
          </nav>
          <div aria-hidden="true" className="mb-6 h-1 w-12 bg-gold" />
          <h1 className="max-w-5xl whitespace-pre-line text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.2] tracking-[-0.03em] text-balance">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-white/80 sm:text-lg">
            {description}
          </p>
        </div>
      </div>
      {page?.body && page.body !== page.introduction && (
        <div className="site-container space-y-5 py-8 text-body text-muted">
          {page.body.split(/\n\s*\n/).map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      )}
      {children}
    </div>
  );
}
