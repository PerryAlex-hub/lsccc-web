"use client";

import { useState, type FormEvent } from "react";
import {
  useAdminTeam,
  useTeamMutation,
  type Staff,
} from "@/lib/admin/queries/team";
import { AdminButton, AdminField, AdminFeedback, AdminHeading } from "./ui";
import { AdminDialog } from "./dialog";

export function TeamManager() {
  const { data: team, isPending, isError, error, refetch, isFetching } =
    useAdminTeam();
  const inviteMutation = useTeamMutation();
  const accessMutation = useTeamMutation();
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<Staff["role"]>("EDITOR");
  const [feedback, setFeedback] = useState({ message: "", error: false });
  const [setupUrl, setSetupUrl] = useState("");
  const [confirm, setConfirm] = useState<{
    id: string;
    email: string;
    action: "deactivate" | "revoke";
  } | null>(null);

  async function invite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSetupUrl("");
    try {
      const result = await inviteMutation.mutateAsync({
        data: { email, role },
        method: "POST",
      });
      setFeedback({ message: result.message, error: false });
      setSetupUrl(result.setupUrl || "");
      setEmail("");
    } catch (error) {
      setFeedback({
        message:
          error instanceof Error ? error.message : "Unable to send invitation.",
        error: true,
      });
    }
  }

  async function changeAccess(data: unknown) {
    setSetupUrl("");
    try {
      const result = await accessMutation.mutateAsync({ data, method: "PATCH" });
      setFeedback({ message: result.message, error: false });
      setConfirm(null);
    } catch (error) {
      setFeedback({
        message:
          error instanceof Error ? error.message : "Unable to update access.",
        error: true,
      });
    }
  }

  async function resend(invitation: { email: string; role: Staff["role"] }) {
    setSetupUrl("");
    try {
      const result = await inviteMutation.mutateAsync({
        data: { email: invitation.email, role: invitation.role },
        method: "POST",
      });
      setFeedback({ message: result.message, error: false });
      setSetupUrl(result.setupUrl || "");
    } catch (error) {
      setFeedback({
        message:
          error instanceof Error
            ? error.message
            : "Unable to resend invitation.",
        error: true,
      });
    }
  }

  const busy = inviteMutation.isPending || accessMutation.isPending;

  return (
    <>
      <AdminHeading
        eyebrow="STAFF ACCESS"
        title="Team & access"
        description="Manage staff accounts and invitations. Administrators manage access and settings; editors manage news, media and safety information."
      />
      <form
        onSubmit={invite}
        className="mb-7 space-y-4 rounded-md border border-border bg-white p-5"
      >
        <h2 className="text-lg font-bold text-navy">Invite staff member</h2>
        <div className="grid items-end gap-4 sm:grid-cols-[minmax(0,1fr)_180px_auto]">
          <AdminField label="Email address">
            <input
              type="email"
              required
              maxLength={254}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="admin-input"
            />
          </AdminField>
          <AdminField label="Role">
            <select
              value={role}
              onChange={(event) => setRole(event.target.value as Staff["role"])}
              className="admin-input"
            >
              <option value="EDITOR">Editor</option>
              <option value="ADMINISTRATOR">Administrator</option>
            </select>
          </AdminField>
          <AdminButton
            type="submit"
            loading={inviteMutation.isPending}
            loadingLabel="Creating…"
          >
            Create invitation
          </AdminButton>
        </div>
        <p className="text-xs leading-5 text-muted">
          Invitations expire after 24 hours. Resending replaces the previous
          link.
        </p>
      </form>
      {feedback.message && (
        <div className="mb-5">
          <AdminFeedback {...feedback} />
        </div>
      )}
      {setupUrl && (
        <div className="mb-6 space-y-3 rounded-md border border-border bg-white p-5">
          <p className="text-sm text-muted">
            Email is unavailable. This setup link is shown once and is not
            stored in the browser.
          </p>
          <a
            href={setupUrl}
            className="inline-flex min-h-11 items-center text-sm font-bold text-blue"
          >
            Open setup link
          </a>
          <AdminButton
            variant="secondary"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(setupUrl);
                setFeedback({ message: "Setup link copied.", error: false });
              } catch {
                setFeedback({
                  message: "Could not copy the link. Open it above.",
                  error: true,
                });
              }
            }}
          >
            Copy setup link
          </AdminButton>
        </div>
      )}
      {isPending && <p role="status">Loading staff…</p>}
      {isError && (
        <div
          className="rounded-lg border border-border bg-white p-8"
          role="alert"
        >
          <p>
            {error instanceof Error ? error.message : "Unable to load staff."}
          </p>
          <button
            type="button"
            onClick={() => void refetch()}
            disabled={isFetching}
            className="mt-4 min-h-11 font-bold text-blue disabled:opacity-60"
          >
            {isFetching ? "Trying again…" : "Try again"}
          </button>
        </div>
      )}
      <div className="space-y-3">
        {team?.users.map((member) => (
          <article
            key={member.id}
            className="flex flex-col justify-between gap-4 rounded-md border border-border bg-white p-5 sm:flex-row sm:items-center"
          >
            <div className="min-w-0">
              <h2 className="break-words font-bold text-navy">{member.name}</h2>
              <p className="mt-1 break-all text-sm text-muted">
                {member.email}
              </p>
              <p className="mt-2 text-xs text-muted">
                {member.status === "ACTIVE" ? "Active" : "Deactivated"}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <label>
                <span className="sr-only">Role for {member.email}</span>
                <select
                  value={member.role}
                  disabled={busy}
                  onChange={(event) =>
                    changeAccess({ id: member.id, role: event.target.value })
                  }
                  className="admin-input"
                >
                  <option value="EDITOR">Editor</option>
                  <option value="ADMINISTRATOR">Administrator</option>
                </select>
              </label>
              {member.status === "ACTIVE" ? (
                <AdminButton
                  variant="secondary"
                  disabled={busy}
                  onClick={() =>
                    setConfirm({
                      id: member.id,
                      email: member.email,
                      action: "deactivate",
                    })
                  }
                >
                  Deactivate
                </AdminButton>
              ) : (
                <AdminButton
                  variant="secondary"
                  disabled={busy}
                  onClick={() =>
                    changeAccess({ id: member.id, status: "ACTIVE" })
                  }
                >
                  Reactivate
                </AdminButton>
              )}
            </div>
          </article>
        ))}
      </div>
      {!!team?.invitations.length && (
        <section className="mt-8 space-y-3">
          <h2 className="text-xl font-bold text-navy">Invitations</h2>
          {team.invitations.map((invitation) => (
            <article
              key={invitation.id}
              className="flex flex-col justify-between gap-4 rounded-md border border-border bg-white p-5 sm:flex-row sm:items-center"
            >
              <div className="min-w-0">
                <p className="break-all text-sm font-bold text-navy">
                  {invitation.email}
                </p>
                <p className="mt-2 text-xs text-muted">
                  {invitation.revokedAt
                    ? "Revoked"
                    : new Date(invitation.expiresAt) <= new Date()
                      ? "Expired"
                      : "Pending"}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <AdminButton
                  variant="secondary"
                  disabled={busy}
                  onClick={() => resend(invitation)}
                >
                  Resend invitation
                </AdminButton>
                {!invitation.revokedAt && (
                  <AdminButton
                    variant="secondary"
                    disabled={busy}
                    onClick={() =>
                      setConfirm({
                        id: invitation.id,
                        email: invitation.email,
                        action: "revoke",
                      })
                    }
                  >
                    Revoke
                  </AdminButton>
                )}
              </div>
            </article>
          ))}
        </section>
      )}
      <AdminDialog
        open={!!confirm}
        onClose={() => setConfirm(null)}
        title="Confirm access change"
      >
        <p className="mb-5 break-words text-sm leading-6">
          {confirm?.action === "deactivate"
            ? "Deactivate this account and revoke its sessions"
            : "Revoke this invitation"}{" "}
          for {confirm?.email}?
        </p>
        {confirm && feedback.error && (
          <div className="mb-4">
            <AdminFeedback {...feedback} />
          </div>
        )}
        <div className="flex gap-3">
          <AdminButton
            variant="danger"
            loading={accessMutation.isPending}
            loadingLabel="Updating…"
            onClick={() =>
              confirm &&
              changeAccess(
                confirm.action === "revoke"
                  ? { id: confirm.id, action: "revoke" }
                  : { id: confirm.id, status: "DEACTIVATED" },
              )
            }
          >
            Confirm
          </AdminButton>
          <AdminButton variant="secondary" onClick={() => setConfirm(null)}>
            Cancel
          </AdminButton>
        </div>
      </AdminDialog>
    </>
  );
}
