"use client";

import { useState } from "react";

export function ArticleShare() {
  const [status, setStatus] = useState("");

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setStatus("Article link copied.");
    } catch {
      setStatus("Copy the address from your browser to share this article.");
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-3 sm:ml-auto">
      <button
        type="button"
        onClick={copyLink}
        className="min-h-11 font-bold text-blue hover:underline hover:underline-offset-4"
      >
        Copy article link
      </button>
      <span role="status" className="text-xs text-muted">
        {status}
      </span>
    </div>
  );
}
