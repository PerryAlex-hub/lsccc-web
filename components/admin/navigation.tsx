"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { adminNavigation } from "@/lib/admin/data";
import { AdminIcon } from "./icons";

export function AdminNavigation({ onNavigate }: { onNavigate: () => void }) {
  return (
    <AdminNavigationLinks pathname={usePathname()} onNavigate={onNavigate} />
  );
}

export function AdminNavigationLinks({
  pathname,
  onNavigate,
}: {
  pathname?: string;
  onNavigate: () => void;
}) {
  return (
    <nav aria-label="Administration" className="space-y-1.5 px-3">
      {adminNavigation.map((item) => {
        const active =
          item.href === "/admin"
            ? pathname === item.href
            : pathname?.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={`flex min-h-12 items-center gap-3 rounded-md border-l-2 px-4 text-sm font-semibold transition-colors ${active ? "border-gold bg-white/10 text-white" : "border-transparent text-white/75 hover:bg-white/5 hover:text-white"}`}
          >
            <AdminIcon name={item.icon} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
