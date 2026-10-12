import { Suspense } from "react";
import { InvitationForm } from "@/components/admin/auth/invitation";

export const metadata = { title: "Accept invitation" };

export default function AcceptInvitationPage() {
  return (
    <Suspense fallback={<p role="status">Loading invitation…</p>}>
      <InvitationForm />
    </Suspense>
  );
}
