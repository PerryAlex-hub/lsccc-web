"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { AdminButton, AdminFeedback, AdminField, AdminLink } from "../ui";
import { AuthHeading, PasswordField } from "./ui";

export function LoginForm() {
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPassword("");
    setSubmitted(true);
  }
  return (
    <>
      <AuthHeading
        title="Welcome back"
        description="Log in with your staff email and password to manage the LSCCC website."
      />
      <form onSubmit={submit} className="space-y-5">
        <AdminField label="Email address">
          <input
            type="email"
            name="email"
            autoComplete="username"
            required
            className="admin-input"
            placeholder="you@example.com"
          />
        </AdminField>
        <PasswordField
          label="Password"
          value={password}
          onChange={setPassword}
          autoComplete="current-password"
        />
        <div className="flex justify-end">
          <Link
            href="/admin/forgot-password"
            className="inline-flex min-h-11 items-center text-sm font-semibold text-blue hover:underline"
          >
            Forgot password?
          </Link>
        </div>
        <AdminButton type="submit" className="w-full">
          Log in
        </AdminButton>
        {submitted && (
          <AdminFeedback message="Login is not connected yet. Your password was discarded. You can open the workspace preview below." />
        )}
      </form>
      <div className="mt-8 border-t border-border pt-6">
        <p className="mb-4 text-xs leading-5 text-muted">
          Accounts are created by invitation. Contact your administrator if you
          need access.
        </p>
        <AdminLink href="/admin" secondary>
          Open workspace preview
        </AdminLink>
        <Link
          href="/admin/accept-invitation?token=demo-invitation&state=valid"
          className="mt-4 block py-2 text-xs font-semibold text-blue hover:underline"
        >
          Review invitation setup
        </Link>
      </div>
    </>
  );
}
