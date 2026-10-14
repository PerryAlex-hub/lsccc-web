"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { authRequest } from "@/lib/auth/client";
import { passwordError, passwordHint } from "@/lib/admin/password";
import { AdminButton, AdminField, AdminFeedback } from "../ui";
import { AuthHeading, AuthBackLink, PasswordField } from "./ui";

export function TokenForm({ invitation = false }: { invitation?: boolean }) {
  const query = useSearchParams();
  const token = query.get("token") || "";
  return <TokenDetails key={token} token={token} invitation={invitation} />;
}

function TokenDetails({
  token,
  invitation,
}: {
  token: string;
  invitation: boolean;
}) {
  const [details, setDetails] = useState<{
    state?: string;
    valid?: boolean;
    email?: string;
  } | null>(null);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [complete, setComplete] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    fetch(
      `/api/auth/${invitation ? "invitation" : "reset-password"}?token=${encodeURIComponent(token)}`,
      { cache: "no-store", signal: controller.signal },
    )
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Unable to check this link. Please try again.");
        }
        return response.json();
      })
      .then(setDetails)
      .catch((error) => {
        if (!controller.signal.aborted) {
          setMessage(error.message);
        }
      });
    return () => controller.abort();
  }, [token, invitation]);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const error = passwordError(password, confirmation);
    if (error) {
      setMessage(error);
      return;
    }
    setBusy(true);
    setMessage("");
    try {
      const result = await authRequest(
        `/api/auth/${invitation ? "accept-invitation" : "reset-password"}`,
        { token, name, password, confirmation },
      );
      setMessage(result.message);
      setPassword("");
      setConfirmation("");
      setComplete(true);
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Unable to complete setup.",
      );
    } finally {
      setBusy(false);
    }
  }
  if (!details && !message) {
    return <p role="status">Checking your link…</p>;
  }
  const valid = invitation ? details?.state === "valid" : details?.valid;
  const title = complete
    ? invitation
      ? "Your account is ready"
      : "Password changed"
    : valid
      ? invitation
        ? "You’re invited"
        : "Choose a new password"
      : details?.state === "expired"
        ? "Invitation expired"
        : details?.state === "used"
          ? "Invitation already accepted"
          : invitation
            ? "Invitation unavailable"
            : "Reset link unavailable";
  return (
    <>
      <AuthHeading
        title={title}
        description={
          complete
            ? message
            : valid
              ? "Choose a strong password to secure your staff account."
              : "This link cannot be used. Contact your administrator or request a new password reset link."
        }
      />
      {details?.email && valid && (
        <p className="mb-6 break-all text-sm font-semibold text-navy">
          {details.email}
        </p>
      )}
      {valid && !complete && (
        <form onSubmit={submit} className="space-y-5">
          {invitation && (
            <AdminField label="Full name">
              <input
                autoComplete="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
                maxLength={120}
                className="admin-input"
              />
            </AdminField>
          )}
          <PasswordField
            label="New password"
            value={password}
            onChange={setPassword}
            autoComplete="new-password"
            hint={passwordHint}
          />
          <PasswordField
            label="Confirm password"
            value={confirmation}
            onChange={setConfirmation}
            autoComplete="new-password"
          />
          {message && <AdminFeedback message={message} error />}
          <AdminButton type="submit" disabled={busy} className="w-full">
            {busy
              ? "Saving…"
              : invitation
                ? "Accept invitation"
                : "Reset password"}
          </AdminButton>
        </form>
      )}
      {!valid && message && <AdminFeedback message={message} error />}
      <AuthBackLink />
    </>
  );
}
