import { AdminSettingsPage } from "@/components/admin/settings";
import { Suspense } from "react";
import { AdministratorAccess } from "@/components/admin/access";

export const metadata = { title: "Website settings" };

export default function SettingsPage() {
  return (
    <Suspense fallback={<p role="status">Checking permissions…</p>}>
      <AdministratorAccess>
        <AdminSettingsPage />
      </AdministratorAccess>
    </Suspense>
  );
}
