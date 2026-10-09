import { AdminContentManager } from "@/components/admin/content-manager";

export const metadata = { title: "Website pages" };

export default function AdminWebsitePagesPage() {
  return <AdminContentManager collection="pages" />;
}
