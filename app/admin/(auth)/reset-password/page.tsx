import { Suspense } from "react";
import { TokenForm } from "@/components/admin/auth/token-form";

export const metadata = { title: "Reset password" };

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<p role="status">Loading password reset…</p>}>
      <TokenForm />
    </Suspense>
  );
}
