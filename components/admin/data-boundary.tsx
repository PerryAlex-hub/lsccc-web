"use client";

import { useEffect, useState, type ReactNode } from "react";
import { refreshAdminState } from "@/lib/admin/store";

export function AdminDataBoundary({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");
  async function load() {
    try {
      await refreshAdminState();
      setError("");
      setReady(true);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Content could not be loaded.",
      );
    }
  }
  useEffect(() => {
    let active = true;
    refreshAdminState()
      .then(() => {
        if (active) {
          setReady(true);
        }
      })
      .catch((error) => {
        if (active) {
          setError(
            error instanceof Error
              ? error.message
              : "Content could not be loaded.",
          );
        }
      });
    return () => {
      active = false;
    };
  }, []);
  if (ready) {
    return children;
  }
  return (
    <div
      className="rounded-lg border border-border bg-white p-8"
      role={error ? "alert" : "status"}
    >
      <p>{error || "Loading website content…"}</p>
      {error && (
        <button
          type="button"
          onClick={() => void load()}
          className="mt-4 min-h-11 font-bold text-blue"
        >
          Try again
        </button>
      )}
    </div>
  );
}
