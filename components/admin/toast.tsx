"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";

export type AdminToastDetail = {
  message: string;
  tone?: "success" | "error";
};

export const ADMIN_TOAST_EVENT = "admin:toast";

export function showAdminToast(detail: AdminToastDetail) {
  window.dispatchEvent(new CustomEvent(ADMIN_TOAST_EVENT, { detail }));
}

export function AdminToastRegion({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<
    (AdminToastDetail & { id: number }) | null
  >(null);

  const dismiss = useCallback(() => setToast(null), []);

  useEffect(() => {
    function receive(event: Event) {
      const detail = (event as CustomEvent<AdminToastDetail>).detail;
      setToast({ ...detail, id: Date.now() });
    }
    window.addEventListener(ADMIN_TOAST_EVENT, receive);
    return () => window.removeEventListener(ADMIN_TOAST_EVENT, receive);
  }, []);

  useEffect(() => {
    if (!toast) {
      return;
    }
    const timeout = window.setTimeout(
      dismiss,
      toast.tone === "error" ? 7000 : 4500,
    );
    return () => window.clearTimeout(timeout);
  }, [dismiss, toast]);

  return (
    <>
      {children}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="pointer-events-none fixed inset-x-4 bottom-4 z-[100] flex justify-center sm:inset-x-auto sm:bottom-6 sm:right-6"
      >
        {toast && (
          <div
            key={toast.id}
            role={toast.tone === "error" ? "alert" : "status"}
            className={`pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-md border px-4 py-3 text-sm shadow-lg motion-safe:animate-[gentle-enter_180ms_ease-out] ${
              toast.tone === "error"
                ? "border-[#b32136]/25 bg-[#fff7f8] text-[#7f1727]"
                : "border-[#246743]/25 bg-[#f4fbf7] text-[#185235]"
            }`}
          >
            <span aria-hidden="true" className="mt-0.5 font-bold">
              {toast.tone === "error" ? "!" : "✓"}
            </span>
            <span className="min-w-0 flex-1 leading-6">{toast.message}</span>
            <button
              type="button"
              onClick={dismiss}
              aria-label="Dismiss notification"
              className="-mr-1 flex size-8 shrink-0 items-center justify-center rounded font-bold hover:bg-black/5"
            >
              ×
            </button>
          </div>
        )}
      </div>
    </>
  );
}
