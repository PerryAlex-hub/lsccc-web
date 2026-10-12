import { Suspense } from "react";
import { ResetPasswordForm } from "@/components/admin/auth/recovery";

export const metadata = { title: "Reset password" };

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<p role="status">Loading password reset…</p>}>
      <ResetPasswordForm />
    </Suspense>
  );
}
