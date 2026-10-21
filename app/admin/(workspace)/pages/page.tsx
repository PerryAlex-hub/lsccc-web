import { AdminContentManager } from "@/components/admin/content-manager";
import { Suspense } from "react";
import { AdministratorAccess } from "@/components/admin/access";
import { AdminContentSkeleton } from "@/components/admin/skeleton";

export const metadata = { title: "Website pages" };

// Content list loads client-side through TanStack Query; opt out of
// instant-navigation validation rather than leave it unvalidated and silently dropped.
export const instant = false;

export default function AdminWebsitePagesPage() {
  return (
    <Suspense
      fallback={
        <div role="status">
          <span className="sr-only">Checking permissions…</span>
          <AdminContentSkeleton />
        </div>
      }
    >
      <AdministratorAccess>
        <AdminContentManager collection="pages" />
      </AdministratorAccess>
    </Suspense>
  );
}
