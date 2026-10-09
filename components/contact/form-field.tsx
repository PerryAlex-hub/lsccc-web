import type { InputHTMLAttributes, ReactNode } from "react";

export function FormField({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="min-w-0 space-y-2">
      <label
        htmlFor={id}
        className="block text-[13px] font-semibold leading-5 text-ink"
      >
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-sm font-medium text-[#b32136]">
          {error}
        </p>
      )}
    </div>
  );
}

export function FormInput({
  error,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { error?: string }) {
  return (
    <input
      {...props}
      className="form-input"
      aria-invalid={Boolean(error)}
      aria-describedby={error ? `${props.id}-error` : undefined}
    />
  );
}
