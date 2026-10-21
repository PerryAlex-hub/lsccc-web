import { AdminMediaLibrary } from "@/components/admin/media-library";

export const metadata = { title: "Media library" };

// Media loads client-side through TanStack Query; opt out of instant-navigation
// validation rather than leave it unvalidated and silently dropped.
export const instant = false;

export default function AdminMediaPage() {
  return <AdminMediaLibrary />;
}
