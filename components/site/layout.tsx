import { Suspense, type ReactNode } from "react";
import { SiteHeader } from "./header";
import { SiteFooter } from "./footer";
import { PageMotion } from "./page-motion";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteHeader />
      <Suspense fallback={null}>
        <PageMotion />
      </Suspense>
      <main id="main-content" tabIndex={-1} className="flex-1">
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
