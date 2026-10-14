import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { currentUser } from "@/lib/auth/session";
import { AdminShell } from "./shell";

export async function WorkspaceAccess({ children }: { children: ReactNode }) {
  const user = await currentUser();
  if (!user) {
    redirect("/admin/login");
  }
  return <AdminShell user={user}>{children}</AdminShell>;
}

export async function AdministratorAccess({
  children,
}: {
  children: ReactNode;
}) {
  const user = await currentUser();
  if (!user) {
    redirect("/admin/login");
  }
  if (user.role !== "ADMINISTRATOR") {
    return <p role="alert">Administrator access is required for this page.</p>;
  }
  return children;
}
