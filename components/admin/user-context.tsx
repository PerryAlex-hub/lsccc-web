"use client";

import { createContext, useContext, type ReactNode } from "react";

type AdminUser = {
  name: string;
  role: string;
};

const AdminUserContext = createContext<AdminUser | null>(null);

export function AdminUserProvider({
  user,
  children,
}: {
  user: AdminUser;
  children: ReactNode;
}) {
  return (
    <AdminUserContext.Provider value={user}>
      {children}
    </AdminUserContext.Provider>
  );
}

export function useAdminUser() {
  const user = useContext(AdminUserContext);
  if (!user) {
    throw new Error("useAdminUser must be used within AdminUserProvider.");
  }
  return user;
}
