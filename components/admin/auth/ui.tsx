"use client";

import { useId, useState } from "react";
import Link from "next/link";

export function AuthHeading({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="mb-8">
      <p className="mb-3 text-[11px] font-bold tracking-[0.13em] text-blue">
        LSCCC ADMINISTRATION
      </p>
      <h1 className="text-[30px] font-bold leading-tight text-navy">{title}</h1>
      <p className="mt-4 text-sm leading-6 text-muted">{description}</p>
    </div>
  );
}

export function PasswordField({
  label,
  value,
  onChange,
  autoComplete,
  error,
  hint,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  autoComplete: "current-password" | "new-password";
  error?: string;
  hint?: string;
}) {
  const [visible, setVisible] = useState(false);
  const id = useId();
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-semibold text-navy">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={visible ? "text" : "password"}
          autoComplete={autoComplete}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          required
          maxLength={128}
          aria-invalid={!!error}
          aria-describedby={error || hint ? `${id}-help` : undefined}
          className="admin-input pr-20"
        />
        <button
          type="button"
          onClick={() => setVisible(!visible)}
          aria-label={`${visible ? "Hide" : "Show"} ${label.toLowerCase()}`}
          aria-pressed={visible}
          className="absolute inset-y-0 right-0 min-w-16 px-3 text-xs font-bold text-blue"
        >
          {visible ? "Hide" : "Show"}
        </button>
      </div>
      {(error || hint) && (
        <p
          id={`${id}-help`}
          className={`text-xs leading-5 ${error ? "text-[#b32136]" : "text-muted"}`}
        >
          {error || hint}
        </p>
      )}
    </div>
  );
}

export function AuthBackLink() {
  return (
    <Link
      href="/admin/login"
      className="mt-7 inline-flex min-h-11 items-center text-sm font-semibold text-blue hover:underline"
    >
      Back to login
    </Link>
  );
}
