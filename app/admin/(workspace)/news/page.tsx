import { AdminNewsList } from "@/components/admin/news-list";

export const metadata = { title: "News & articles" };

// News list loads client-side through TanStack Query; opt out of
// instant-navigation validation rather than leave it unvalidated and silently dropped.
export const instant = false;

export default function AdminNewsPage() {
  return <AdminNewsList />;
}
