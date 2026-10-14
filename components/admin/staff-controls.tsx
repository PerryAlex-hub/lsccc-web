"use client";

import { useState } from "react";
import { authRequest, navigateAfterAuth } from "@/lib/auth/client";

export function StaffControls({ name, role }: { name: string; role: string }) {
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  return (
    <div className="border-t border-white/10 pt-5">
      <p className="break-words text-sm font-semibold">{name}</p>
      <p className="mt-1 text-xs text-white/60">
        {role === "ADMINISTRATOR" ? "Administrator" : "Editor"}
      </p>
      <button
        type="button"
        disabled={busy}
        className="mt-3 min-h-11 text-sm font-semibold text-white/80 hover:text-white"
        onClick={async () => {
          setBusy(true);
          try {
            await authRequest("/api/auth/logout", {});
            navigateAfterAuth("/admin/login");
          } catch {
            setMessage("Could not log out. Please try again.");
            setBusy(false);
          }
        }}
      >
        {busy ? "Logging out…" : "Log out"}
      </button>
      {message && (
        <p role="alert" className="text-xs">
          {message}
        </p>
      )}
    </div>
  );
}
