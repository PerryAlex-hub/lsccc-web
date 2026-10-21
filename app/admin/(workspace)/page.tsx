import { AdminDashboard } from "@/components/admin/dashboard";

// Dashboard loads client-side through TanStack Query; opt out of
// instant-navigation validation rather than leave it unvalidated and silently dropped.
export const instant = false;

export default function AdminOverviewPage() {
  return <AdminDashboard />;
}
