"use client";

import type { ReactNode } from "react";
import { useAdminContent } from "@/lib/admin/queries/content";

export function AdminDataBoundary({ children }: { children: ReactNode }) {
  const { isPending, isError, error, refetch, isFetching } =
    useAdminContent();
  if (isPending) {
    return (
      <div
        className="rounded-lg border border-border bg-white p-8"
        role="status"
      >
        <p>Loading website content…</p>
      </div>
    );
  }
  if (isError) {
    return (
      <div
        className="rounded-lg border border-border bg-white p-8"
        role="alert"
      >
        <p>
          {error instanceof Error
            ? error.message
            : "Content could not be loaded."}
        </p>
        <button
          type="button"
          onClick={() => void refetch()}
          disabled={isFetching}
          className="mt-4 min-h-11 font-bold text-blue disabled:opacity-60"
        >
          {isFetching ? "Trying again…" : "Try again"}
        </button>
      </div>
    );
  }
  return children;
}
