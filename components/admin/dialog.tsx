"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";
import { AdminIcon } from "./icons";

export function AdminDialog({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) {
      return;
    }
    if (!open) {
      dialog.close();
      return;
    }
    dialog.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
      dialog.close();
    };
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
      className="admin-dialog m-auto max-h-[85vh] w-[calc(100%-32px)] max-w-3xl overflow-y-auto rounded-lg border border-border bg-white p-0 text-ink shadow-xl backdrop:bg-navy/50"
    >
      <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-4 sm:px-7">
        <h2 id={titleId} className="text-xl font-bold text-navy">
          {title}
        </h2>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className="flex size-11 shrink-0 items-center justify-center rounded-md hover:bg-paper"
        >
          <AdminIcon name="close" />
        </button>
      </div>
      <div className="p-5 sm:p-7">{children}</div>
    </dialog>
  );
}
