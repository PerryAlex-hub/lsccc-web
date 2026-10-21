import type { ReactNode } from "react";
import { Suspense } from "react";
import { WorkspaceAccess } from "@/components/admin/access";
import { AdminShellSkeleton } from "@/components/admin/skeleton";

// The session guard may redirect anonymous prefetches before the workspace renders.
export const instant = false;

export default function WorkspaceLayout({ children }: { children: ReactNode }) {
  return (
    <Suspense
      fallback={
        <div role="status">
          <span className="sr-only">Checking staff access…</span>
          <AdminShellSkeleton />
        </div>
      }
    >
      <WorkspaceAccess>{children}</WorkspaceAccess>
    </Suspense>
  );
}
