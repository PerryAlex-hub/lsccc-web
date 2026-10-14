"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { AdminButton, AdminFeedback, AdminField } from "../ui";
import { authRequest, navigateAfterAuth } from "@/lib/auth/client";
import { AuthHeading, PasswordField } from "./ui";

export function LoginForm() {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setMessage("");
    const email = new FormData(event.currentTarget).get("email");
    try {
      await authRequest("/api/auth/login", { email, password });
      setPassword("");
      navigateAfterAuth("/admin");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to log in.");
      setPassword("");
    } finally {
      setBusy(false);
    }
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
        <AdminButton type="submit" className="w-full" disabled={busy}>
          {busy ? "Logging in…" : "Log in"}
        </AdminButton>
        {message && <AdminFeedback message={message} error />}
      </form>
      <div className="mt-8 border-t border-border pt-6">
        <p className="mb-4 text-xs leading-5 text-muted">
          Accounts are created by invitation. Contact your administrator if you
          need access.
        </p>
      </div>
    </>
  );
}
