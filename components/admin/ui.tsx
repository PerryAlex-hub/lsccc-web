import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import type { PublicationStatus } from "@/lib/admin/types";

export function AdminHeading({
  eyebrow = "CONTENT WORKSPACE",
  title,
  description,
  actions,
}: {
  eyebrow?: string;
  title: string;
  description: string;
  actions?: ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
      <div className="max-w-2xl">
        <p className="mb-2 text-[11px] font-bold tracking-[0.12em] text-blue">
          {eyebrow}
        </p>
        <h1 className="text-[28px] font-bold leading-[1.3] text-navy sm:text-[32px]">
          {title}
        </h1>
        <p className="mt-3 text-sm leading-6 text-muted">{description}</p>
      </div>
      {actions && (
        <div className="flex shrink-0 flex-wrap gap-3">{actions}</div>
      )}
    </div>
  );
}

const buttonClasses = {
  primary: "border-navy bg-navy text-white hover:bg-blue hover:border-blue",
  secondary:
    "border-border bg-white text-navy hover:border-blue hover:bg-paper",
  danger: "border-[#b32136] bg-[#b32136] text-white hover:bg-[#921d2e]",
};

export function AdminButton({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof buttonClasses;
}) {
  return (
    <button
      type="button"
      {...props}
      className={`motion-control inline-flex min-h-11 items-center justify-center gap-2 rounded-md border px-4 py-2.5 text-sm font-bold disabled:cursor-default disabled:opacity-45 ${buttonClasses[variant]} ${className}`}
    >
      {children}
    </button>
  );
}

export function AdminLink({
  href,
  children,
  secondary = false,
}: {
  href: string;
  children: ReactNode;
  secondary?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`motion-control inline-flex min-h-11 items-center justify-center gap-2 rounded-md border px-4 py-2.5 text-sm font-bold ${buttonClasses[secondary ? "secondary" : "primary"]}`}
    >
      {children}
    </Link>
  );
}

export function StatusBadge({ status }: { status: PublicationStatus }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${status === "Published" ? "bg-[#e8f3ed] text-[#246743]" : "bg-[#fff3d6] text-[#795611]"}`}
    >
      <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

export function AdminField({
  label,
  children,
  hint,
}: {
  label: string;
  children: ReactNode;
  hint?: string;
}) {
  return (
    <label className="block space-y-2 text-sm font-semibold text-navy">
      <span>{label}</span>
      {children}
      {hint && (
        <span className="block text-xs font-normal leading-5 text-muted">
          {hint}
        </span>
      )}
    </label>
  );
}

export function AdminFeedback({
  message,
  error = false,
}: {
  message: string;
  error?: boolean;
}) {
  return (
    <p
      role={error ? "alert" : "status"}
      className={`text-sm leading-6 ${error ? "text-[#b32136]" : "text-[#246743]"}`}
    >
      {message}
    </p>
  );
}
