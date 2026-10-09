import { AdminContentManager } from "@/components/admin/content-manager";

export const metadata = { title: "Public notices" };

export default function AdminNoticesPage() {
  return <AdminContentManager collection="notices" />;
}
