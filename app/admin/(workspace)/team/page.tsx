import { TeamManager } from "@/components/admin/team-manager";
import { Suspense } from "react";
import { AdministratorAccess } from "@/components/admin/access";

export const metadata = { title: "Team & access" };

export default function TeamPage() {
  return (
    <Suspense fallback={<p role="status">Checking permissions…</p>}>
      <AdministratorAccess>
        <TeamManager />
      </AdministratorAccess>
    </Suspense>
  );
}
