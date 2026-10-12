import { AdminContentManager } from "@/components/admin/content-manager";

export const metadata = { title: "Safety resources" };

export default function AdminResourcesPage() {
  return <AdminContentManager collection="resources" />;
}
