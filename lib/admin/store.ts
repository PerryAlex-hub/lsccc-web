"use client";

import { useSyncExternalStore } from "react";
import type { AdminState } from "./types";
import { showAdminToast } from "@/components/admin/toast";

export const emptyAdminState: AdminState = {
  version: 1,
  articles: [],
  media: [],
  notices: [],
  resources: [],
  pages: [],
  categories: [],
  activity: [],
  settings: { siteName: "", description: "", address: "", enquiryEmail: "" },
};
let snapshot = emptyAdminState;
let saving = false;
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function useAdminState() {
  return useSyncExternalStore(
    subscribe,
    () => snapshot,
    () => emptyAdminState,
  );
}

export function replaceAdminState(state: AdminState) {
  snapshot = state;
  listeners.forEach((listener) => listener());
}

export async function refreshAdminState() {
  const response = await fetch("/api/admin/content", { cache: "no-store" });
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message);
  }
  replaceAdminState(result.state);
}

// Translate one UI edit into one server-validated command; never persist a snapshot.
export async function updateAdminState(
  update: (current: AdminState) => AdminState,
  _label: string,
): Promise<{ ok: boolean; message: string }> {
  // Audit messages are derived by the server, rather than trusted from the UI.
  void _label;
  if (saving) {
    return { ok: false, message: "A change is being saved. Please wait." };
  }
  saving = true;
  try {
    const current = snapshot;
    const next = update(current);
    let command: Record<string, unknown> | undefined;
    for (const collection of [
      "articles",
      "media",
      "notices",
      "resources",
      "pages",
    ] as const) {
      const removed = current[collection].find(
        (item) => !next[collection].some((other) => other.id === item.id),
      );
      const changed = next[collection].find(
        (item) =>
          JSON.stringify(item) !==
          JSON.stringify(
            current[collection].find((other) => other.id === item.id),
          ),
      );
      const value = removed ?? changed;
      if (value) {
        const previous = current[collection].find(
          (item) => item.id === value.id,
        );
        command = {
          collection,
          operation: removed ? "delete" : "save",
          value,
          expectedUpdatedAt:
            previous && "updatedAt" in previous
              ? previous.updatedAt
              : undefined,
        };
        break;
      }
    }
    if (
      !command &&
      JSON.stringify(current.settings) !== JSON.stringify(next.settings)
    ) {
      command = {
        collection: "settings",
        operation: "save",
        value: next.settings,
      };
    }
    const category = next.categories.find(
      (name) => !current.categories.includes(name),
    );
    if (!command && category) {
      command = {
        collection: "categories",
        operation: "save",
        value: { name: category },
      };
    }
    if (!command) {
      const result = { ok: true, message: "No changes to save." };
      showAdminToast({ message: result.message, tone: "success" });
      return result;
    }
    const response = await fetch("/api/admin/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(command),
    });
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message);
    }
    replaceAdminState(result.state);
    showAdminToast({ message: result.message, tone: "success" });
    return { ok: true, message: result.message };
  } catch (error) {
    const result = {
      ok: false,
      message:
        error instanceof Error
          ? error.message
          : "Could not save changes. Try again.",
    };
    showAdminToast({ message: result.message, tone: "error" });
    return result;
  } finally {
    saving = false;
  }
}
