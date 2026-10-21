import { AdminContentManager } from "@/components/admin/content-manager";

export const metadata = { title: "Public notices" };

// Content list loads client-side through TanStack Query; opt out of
// instant-navigation validation rather than leave it unvalidated and silently dropped.
export const instant = false;

export default function AdminNoticesPage() {
  return <AdminContentManager collection="notices" />;
}
