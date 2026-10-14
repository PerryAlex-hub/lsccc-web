"use client";

import { useState } from "react";
import { AdminButton, AdminFeedback, AdminField } from "../ui";
import { AuthBackLink, AuthHeading } from "./ui";
import { authRequest } from "@/lib/auth/client";

export function ForgotPasswordForm() {
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  return (
    <>
      <AuthHeading
        title={submitted ? "Check your email" : "Forgot your password?"}
        description={
          submitted
            ? "If an active account matches that email, a reset link has been requested."
            : "Enter your staff email to request a password reset link."
        }
      />
      {submitted ? (
        <div className="space-y-5">
          <p className="text-sm leading-6 text-muted">
            Reset links expire after 30 minutes and can only be used once.
          </p>
          <AdminButton variant="secondary" onClick={() => setSubmitted(false)}>
            Use another email
          </AdminButton>
        </div>
      ) : (
        <form
          className="space-y-6"
          onSubmit={async (event) => {
            event.preventDefault();
            const email = new FormData(event.currentTarget).get("email");
            setBusy(true);
            setMessage("");
            try {
              await authRequest("/api/auth/forgot-password", { email });
              setSubmitted(true);
            } catch (error) {
              setMessage(
                error instanceof Error
                  ? error.message
                  : "Unable to request a reset.",
              );
            } finally {
              setBusy(false);
            }
          }}
        >
          <AdminField label="Email address">
            <input
              type="email"
              name="email"
              autoComplete="email"
              required
              className="admin-input"
              placeholder="you@example.com"
            />
          </AdminField>
          {message && <AdminFeedback message={message} error />}
          <AdminButton type="submit" className="w-full" disabled={busy}>
            {busy ? "Requesting…" : "Send reset link"}
          </AdminButton>
        </form>
      )}
      <AuthBackLink />
    </>
  );
}
