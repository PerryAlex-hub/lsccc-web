"use client";

import { useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { passwordError, passwordHint } from "@/lib/admin/auth-preview";
import { AdminButton, AdminFeedback, AdminField } from "../ui";
import { AuthBackLink, AuthHeading, PasswordField } from "./ui";

export function ForgotPasswordForm() {
  const [submitted, setSubmitted] = useState(false);
  return (
    <>
      <AuthHeading
        title={submitted ? "Check your email" : "Forgot your password?"}
        description={
          submitted
            ? "If an active account matches that email, a password reset link would be sent."
            : "Enter your staff email to request a password reset link."
        }
      />
      {submitted ? (
        <div className="space-y-5">
          <p className="text-sm leading-6 text-muted">
            This is a preview; no email has been sent. In the connected system,
            reset links will expire and can only be used once.
          </p>
          <Link
            href="/admin/reset-password?token=demo-reset"
            className="inline-flex min-h-11 items-center text-sm font-bold text-blue hover:underline"
          >
            Preview password reset
          </Link>
          <AdminButton variant="secondary" onClick={() => setSubmitted(false)}>
            Use another email
          </AdminButton>
        </div>
      ) : (
        <form
          className="space-y-6"
          onSubmit={(event) => {
            event.preventDefault();
            setSubmitted(true);
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
          <AdminButton type="submit" className="w-full">
            Send reset link
          </AdminButton>
        </form>
      )}
      <AuthBackLink />
    </>
  );
}

export function ResetPasswordForm() {
  const query = useSearchParams();
  const valid =
    query.get("token") === "demo-reset" &&
    !["expired", "used", "invalid"].includes(query.get("state") || "");
  return <ResetPasswordDetails key={query.toString()} valid={valid} />;
}

function ResetPasswordDetails({ valid }: { valid: boolean }) {
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [error, setError] = useState("");
  const [complete, setComplete] = useState(false);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const issue = passwordError(password, confirmation);
    setError(issue);
    if (issue) {
      return;
    }
    setPassword("");
    setConfirmation("");
    setComplete(true);
  }
  if (!valid) {
    return (
      <>
        <AuthHeading
          title="Reset link unavailable"
          description="This link is invalid, expired or already used. Request a new link to reset your password."
        />
        <Link
          href="/admin/forgot-password"
          className="inline-flex min-h-11 items-center text-sm font-bold text-blue"
        >
          Request another reset link
        </Link>
        <AuthBackLink />
      </>
    );
  }
  return (
    <>
      <AuthHeading
        title={
          complete ? "Password reset preview complete" : "Choose a new password"
        }
        description={
          complete
            ? "The form is complete. No account password has been changed in this preview."
            : "Use a strong password you do not use for another account."
        }
      />
      {!complete && (
        <form onSubmit={submit} className="space-y-5">
          <PasswordField
            label="New password"
            value={password}
            onChange={setPassword}
            autoComplete="new-password"
            hint={passwordHint}
          />
          <PasswordField
            label="Confirm new password"
            value={confirmation}
            onChange={setConfirmation}
            autoComplete="new-password"
            error={error}
          />
          {error && <AdminFeedback message={error} error />}
          <AdminButton type="submit" className="w-full">
            Reset password
          </AdminButton>
        </form>
      )}
      <AuthBackLink />
    </>
  );
}
