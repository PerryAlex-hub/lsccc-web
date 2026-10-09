import Link from "next/link";
import type { ReactNode } from "react";

type Breadcrumb = { label: string; href?: string };

export function InteriorPage({
  title,
  description,
  breadcrumbs,
  children,
  nodeId,
}: {
  title: string;
  description: string;
  breadcrumbs: Breadcrumb[];
  children: ReactNode;
  nodeId?: string;
}) {
  return (
    <div>
      <div className="bg-navy text-white" data-node-id={nodeId}>
        <div className="site-container flex flex-col gap-6 py-9">
          <nav
            aria-label="Breadcrumb"
            className="text-[11px] font-semibold leading-[17px] text-gold"
          >
            <ol className="flex flex-wrap gap-x-3 gap-y-2 uppercase">
              {[{ label: "Home", href: "/" }, ...breadcrumbs].map(
                (item, index) => (
                  <li key={item.label} className="flex items-center gap-3">
                    {index > 0 && <span aria-hidden="true">/</span>}
                    {item.href ? (
                      <Link href={item.href} className="hover:underline">
                        {item.label}
                      </Link>
                    ) : (
                      <span aria-current="page">{item.label}</span>
                    )}
                  </li>
                ),
              )}
            </ol>
          </nav>
          <h1 className="max-w-[1100px] whitespace-pre-line text-[28px] font-bold leading-[1.4375] sm:text-page">
            {title}
          </h1>
          <p className="max-w-[1000px] text-[17px] leading-[26px]">
            {description}
          </p>
        </div>
      </div>
      {children}
    </div>
  );
}
