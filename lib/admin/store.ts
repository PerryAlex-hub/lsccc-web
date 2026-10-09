"use client";

import { useSyncExternalStore } from "react";
import { initialAdminState } from "./data";
import type { AdminState } from "./types";

const STORAGE_KEY = "lsccc-admin-ui-v1";
let snapshot = initialAdminState;
let initialized = false;
const listeners = new Set<() => void>();

function readStoredState(): AdminState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return initialAdminState;
    }
    const stored = JSON.parse(raw) as AdminState;
    if (
      stored.version !== 1 ||
      !Array.isArray(stored.articles) ||
      !Array.isArray(stored.media) ||
      !Array.isArray(stored.notices) ||
      !Array.isArray(stored.resources) ||
      !Array.isArray(stored.pages) ||
      !Array.isArray(stored.activity) ||
      !stored.settings
    ) {
      return initialAdminState;
    }
    return stored;
  } catch {
    return initialAdminState;
  }
}

function notify() {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  function sync(event: StorageEvent) {
    if (event.key === STORAGE_KEY || event.key === null) {
      snapshot = readStoredState();
      notify();
    }
  }
  window.addEventListener("storage", sync);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", sync);
  };
}

function getSnapshot() {
  if (!initialized) {
    snapshot = readStoredState();
    initialized = true;
  }
  return snapshot;
}

export function useAdminState() {
  return useSyncExternalStore(subscribe, getSnapshot, () => initialAdminState);
}

export function updateAdminState(
  update: (current: AdminState) => AdminState,
  label: string,
): { ok: boolean; message: string } {
  const current = getSnapshot();
  const next = update(current);
  next.activity = [
    { id: crypto.randomUUID(), label, date: new Date().toISOString() },
    ...current.activity,
  ].slice(0, 12);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    snapshot = next;
    notify();
    return {
      ok: true,
      message: "Saved in this browser. The live website is unchanged.",
    };
  } catch {
    return {
      ok: false,
      message:
        "Could not save this preview. Browser storage may be full or unavailable.",
    };
  }
}

export function resetAdminState() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    snapshot = initialAdminState;
    notify();
    return true;
  } catch {
    return false;
  }
}
