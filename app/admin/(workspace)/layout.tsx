import type { ReactNode } from "react";
import { Suspense } from "react";
import { WorkspaceAccess } from "@/components/admin/access";

// The session guard may redirect anonymous prefetches before the workspace renders.
export const instant = false;

export default function WorkspaceLayout({ children }: { children: ReactNode }) {
  return (
    <Suspense
      fallback={
        <p className="p-8" role="status">
          Checking staff access…
        </p>
      }
    >
      <WorkspaceAccess>{children}</WorkspaceAccess>
    </Suspense>
  );
}
