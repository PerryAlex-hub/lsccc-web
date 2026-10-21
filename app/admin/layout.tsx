import type { Metadata } from "next";
import type { ReactNode } from "react";
import { AdminQueryProvider } from "@/lib/admin/query-provider";

export const metadata: Metadata = {
  title: { default: "Administration", template: "%s | LSCCC Admin" },
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <AdminQueryProvider>{children}</AdminQueryProvider>;
}
