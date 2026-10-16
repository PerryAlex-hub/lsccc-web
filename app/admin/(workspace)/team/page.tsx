import { TeamManager } from "@/components/admin/team-manager";
import { Suspense } from "react";
import { AdministratorAccess } from "@/components/admin/access";

export const metadata = { title: "Team & access" };

// This page is intentionally gated by a request-time administrator check.
// Opt it out of static-shell validation without changing its rendering model.
export const instant = false;

export default function TeamPage() {
  return (
    <Suspense fallback={<p role="status">Checking permissions…</p>}>
      <AdministratorAccess>
        <TeamManager />
      </AdministratorAccess>
    </Suspense>
  );
}
