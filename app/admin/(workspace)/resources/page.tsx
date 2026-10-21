import { AdminContentManager } from "@/components/admin/content-manager";

export const metadata = { title: "Safety resources" };

// Content list loads client-side through TanStack Query; opt out of
// instant-navigation validation rather than leave it unvalidated and silently dropped.
export const instant = false;

export default function AdminResourcesPage() {
  return <AdminContentManager collection="resources" />;
}
