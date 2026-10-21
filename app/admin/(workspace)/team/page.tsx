import { TeamManager } from "@/components/admin/team-manager";
import { Suspense } from "react";
import { AdministratorAccess } from "@/components/admin/access";
import { AdminContentSkeleton } from "@/components/admin/skeleton";

export const metadata = { title: "Team & access" };

// This page is intentionally gated by a request-time administrator check.
// Opt it out of static-shell validation without changing its rendering model.
export const instant = false;

export default function TeamPage() {
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
        <TeamManager />
      </AdministratorAccess>
    </Suspense>
  );
}
