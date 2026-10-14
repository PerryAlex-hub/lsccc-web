import { AdminContentManager } from "@/components/admin/content-manager";
import { Suspense } from "react";
import { AdministratorAccess } from "@/components/admin/access";

export const metadata = { title: "Website pages" };

export default function AdminWebsitePagesPage() {
  return (
    <Suspense fallback={<p role="status">Checking permissions…</p>}>
      <AdministratorAccess>
        <AdminContentManager collection="pages" />
      </AdministratorAccess>
    </Suspense>
  );
}
