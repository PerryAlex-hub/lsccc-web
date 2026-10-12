"use client";

import { useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAdminState, updateAdminState } from "@/lib/admin/store";
import {
  demoInvitation,
  invitationState,
  passwordError,
  passwordHint,
} from "@/lib/admin/auth-preview";
import { AdminButton, AdminFeedback, AdminField } from "../ui";
import { AuthBackLink, AuthHeading, PasswordField } from "./ui";

const unavailable = {
  expired: {
    title: "Invitation expired",
    description:
      "Ask your administrator to resend your invitation. New invitations are valid for 24 hours.",
  },
  used: {
    title: "Invitation already accepted",
    description:
      "This invitation has already been used. Log in with the email and password you chose when setting up your account.",
  },
  invalid: {
    title: "Invitation unavailable",
    description:
      "This invitation is invalid or has been revoked. Contact your administrator for a new invitation.",
  },
};

export function InvitationForm() {
  const query = useSearchParams();
  return (
    <InvitationDetails
      key={query.toString()}
      token={query.get("token")}
      scenario={query.get("state")}
    />
  );
}

function InvitationDetails({
  token,
  scenario,
}: {
  token: string | null;
  scenario: string | null;
}) {
  const state = useAdminState();
  const previewState =
    token === demoInvitation.token &&
    (scenario === "valid" ||
      scenario === "expired" ||
      scenario === "used" ||
      scenario === "invalid")
      ? scenario
      : null;
  const member = previewState
    ? demoInvitation
    : state.team.find((item) => item.token && item.token === token);
  const status = previewState ?? invitationState(member);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [error, setError] = useState("");
  const [complete, setComplete] = useState(false);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const issue = passwordError(password, confirmation);
    if (!name.trim() || issue) {
      setError(issue || "Enter your name.");
      return;
    }
    if (!member || invitationState(member) !== "valid") {
      setError("This invitation is no longer available.");
      return;
    }
    if (previewState === "valid") {
      setPassword("");
      setConfirmation("");
      setComplete(true);
      return;
    }
    const result = updateAdminState(
      (current) => ({
        ...current,
        team: current.team.map((item) =>
          item.id === member.id
            ? { ...item, name: name.trim(), status: "Active" }
            : item,
        ),
      }),
      "Accepted invitation in preview",
    );
    if (!result.ok) {
      setError(result.message);
      return;
    }
    setPassword("");
    setConfirmation("");
    setComplete(true);
  }
  if (complete) {
    return (
      <>
        <AuthHeading
          title="Your setup preview is complete"
          description={
            previewState
              ? "The sample setup is complete. Your saved team data was unchanged and your password was discarded."
              : "Your team member is now active in this browser preview. No real account was created and your password was discarded."
          }
        />
        <AuthBackLink />
      </>
    );
  }
  return (
    <>
      {status !== "valid" ? (
        <>
          <AuthHeading {...unavailable[status]} />
          <AuthBackLink />
        </>
      ) : (
        <>
          <AuthHeading
            title="You’re invited"
            description="Join the LSCCC staff workspace. Enter your name and choose a password to finish setting up your account."
          />
          <div className="mb-6 rounded-md border border-border bg-white p-4">
            <p className="break-all text-sm font-bold text-navy">
              {member?.email}
            </p>
            <p className="mt-2 text-xs text-muted">
              Invited as {member?.role}
              {member?.expiresAt
                ? " · Link valid for 24 hours"
                : " · Sample invitation"}
            </p>
          </div>
          <form onSubmit={submit} className="space-y-5">
            <AdminField label="Full name">
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                autoComplete="name"
                required
                maxLength={120}
                className="admin-input"
              />
            </AdminField>
            <PasswordField
              label="Create password"
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
              error={error}
            />
            {error && <AdminFeedback message={error} error />}
            <AdminButton type="submit" className="w-full">
              Accept invitation
            </AdminButton>
          </form>
          <AuthBackLink />
        </>
      )}
      <div className="mt-6 border-t border-border pt-4">
        <p className="text-xs text-muted">Review invitation states</p>
        <div className="mt-2 flex flex-wrap gap-x-4">
          {["valid", "expired", "used", "invalid"].map((item) => (
            <Link
              key={item}
              href={`/admin/accept-invitation?token=demo-invitation&state=${item}`}
              aria-current={previewState === item ? "page" : undefined}
              className="inline-flex min-h-11 items-center text-xs font-semibold capitalize text-blue hover:underline"
            >
              {item}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
