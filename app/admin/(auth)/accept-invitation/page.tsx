import { Suspense } from "react";
import { TokenForm } from "@/components/admin/auth/token-form";

export const metadata = { title: "Accept invitation" };

export default function AcceptInvitationPage() {
  return (
    <Suspense fallback={<p role="status">Loading invitation…</p>}>
      <TokenForm invitation />
    </Suspense>
  );
}
