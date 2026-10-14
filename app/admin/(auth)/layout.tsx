import type { ReactNode } from "react";
import { AuthShell } from "@/components/admin/auth/shell";

export const metadata = { referrer: "no-referrer" as const };

export default function AuthenticationLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <AuthShell>{children}</AuthShell>;
}
