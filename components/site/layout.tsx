import type { ReactNode } from "react";
import { SiteHeader } from "./header";
import { SiteFooter } from "./footer";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main id="main-content" tabIndex={-1} className="flex-1">
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
