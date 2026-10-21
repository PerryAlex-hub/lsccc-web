import { AdminSettingsPage } from "@/components/admin/settings";
import { Suspense } from "react";
import { AdministratorAccess } from "@/components/admin/access";
import { AdminContentSkeleton } from "@/components/admin/skeleton";

export const metadata = { title: "Website settings" };

// Settings load client-side through TanStack Query; opt out of
// instant-navigation validation rather than leave it unvalidated and silently dropped.
export const instant = false;

export default function SettingsPage() {
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
        <AdminSettingsPage />
      </AdministratorAccess>
    </Suspense>
  );
}
