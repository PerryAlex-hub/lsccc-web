"use client";

import Image from "next/image";
import Link from "next/link";
import { Suspense, useEffect, useRef, useState, type ReactNode } from "react";
import { assets } from "@/lib/assets";
import { AdminIcon } from "./icons";
import { AdminNavigation, AdminNavigationLinks } from "./navigation";

export function AdminShell({ children }: { children: ReactNode }) {
  const [menu, setMenu] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const sidebar = useRef<HTMLElement>(null);
  const close = () => setMenu(false);

  useEffect(() => {
    if (!menu) {
      return;
    }
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const first = sidebar.current?.querySelector<HTMLAnchorElement>("nav a");
    first?.focus();
    function dismiss(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenu(false);
        trigger.current?.focus();
      }
      if (event.key === "Tab") {
        const controls =
          sidebar.current?.querySelectorAll<HTMLElement>("a, button");
        if (!controls?.length) {
          return;
        }
        const firstControl = controls[0];
        const lastControl = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === firstControl) {
          event.preventDefault();
          lastControl.focus();
        } else if (!event.shiftKey && document.activeElement === lastControl) {
          event.preventDefault();
          firstControl.focus();
        }
      }
    }
    document.addEventListener("keydown", dismiss);
    const desktop = window.matchMedia("(min-width: 1024px)");
    const closeOnDesktop = () => {
      if (desktop.matches) {
        setMenu(false);
      }
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", dismiss);
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, [menu]);

  return (
    <div className="admin-workspace min-h-screen bg-[#f4f6f8] text-ink">
      <a
        href="#admin-main"
        className="sr-only z-[80] bg-white p-4 focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to admin content
      </a>
      {menu && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={close}
          className="fixed inset-0 z-50 bg-navy/50 lg:hidden"
        />
      )}
      <aside
        id="admin-sidebar"
        ref={sidebar}
        aria-label="Admin workspace"
        role={menu ? "dialog" : undefined}
        aria-modal={menu || undefined}
        className={`${menu ? "flex" : "hidden"} fixed inset-y-0 left-0 z-[60] w-[248px] flex-col overflow-y-auto bg-navy text-white lg:flex`}
      >
        <div className="flex items-center gap-3 border-b border-white/10 px-6 py-7">
          <Image
            src={assets.lscccEmblem.image}
            alt={assets.lscccEmblem.alt}
            width={44}
            height={44}
            className="size-11 rounded-full object-cover"
          />
          <div>
            <p className="text-lg font-bold">LSCCC</p>
            <p className="text-xs text-white/65">Content management</p>
          </div>
          <button
            type="button"
            aria-label="Close menu"
            onClick={close}
            className="ml-auto flex size-9 items-center justify-center lg:hidden"
          >
            <AdminIcon name="close" />
          </button>
        </div>
        <p className="px-7 pb-3 pt-7 text-[10px] font-bold tracking-[0.14em] text-white/40">
          WORKSPACE
        </p>
        <Suspense fallback={<AdminNavigationLinks onNavigate={close} />}>
          <AdminNavigation onNavigate={close} />
        </Suspense>
        <div className="mt-auto space-y-6 px-6 py-6">
          <Link
            href="/"
            className="flex min-h-11 items-center justify-between text-sm font-semibold text-white/80 hover:text-white"
          >
            View website <AdminIcon name="arrow" className="size-4" />
          </Link>
          <div className="flex items-center gap-3 border-t border-white/10 pt-5">
            <span className="flex size-9 items-center justify-center rounded-full bg-white/10 text-xs font-bold">
              ED
            </span>
            <div>
              <p className="text-sm font-semibold">Editorial team</p>
              <p className="mt-1 text-xs text-white/50">Preview workspace</p>
            </div>
          </div>
        </div>
      </aside>
      <div className="min-w-0 lg:pl-[248px]">
        <header className="sticky top-0 z-40 flex min-h-[76px] items-center justify-between gap-4 border-b border-border bg-white px-5 sm:px-8 lg:px-10">
          <div className="flex items-center gap-3">
            <button
              ref={trigger}
              type="button"
              aria-label="Open admin navigation"
              aria-controls="admin-sidebar"
              aria-expanded={menu}
              onClick={() => setMenu(!menu)}
              className="flex size-11 items-center justify-center rounded-md hover:bg-paper lg:hidden"
            >
              <AdminIcon name="menu" />
            </button>
            <p className="text-sm font-semibold text-navy">
              Website administration
            </p>
          </div>
          <span className="shrink-0 rounded-full border border-border px-3 py-1.5 text-[11px] font-semibold text-muted">
            UI preview
          </span>
        </header>
        <div className="border-b border-[#e6d9b0] bg-[#fff8e6] px-5 py-3 text-xs leading-5 text-[#705b25] sm:px-8 lg:px-10">
          <strong className="font-bold">Preview mode.</strong> Changes are saved
          in this browser only. The live website is unchanged.
        </div>
        <main
          id="admin-main"
          tabIndex={-1}
          className="mx-auto min-w-0 max-w-[1440px] px-5 py-8 sm:px-8 lg:px-10 lg:py-10"
        >
          {children}
        </main>
      </div>
    </div>
  );
}
