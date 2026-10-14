"use client";

import { useEffect, useState, type FormEvent } from "react";
import { authRequest, navigateAfterAuth } from "@/lib/auth/client";
import { AdminButton, AdminField, AdminFeedback, AdminHeading } from "./ui";
import { AdminDialog } from "./dialog";

type Staff = {
  id: string;
  name: string;
  email: string;
  role: "ADMINISTRATOR" | "EDITOR";
  status: "ACTIVE" | "DEACTIVATED";
};
type Invite = {
  id: string;
  email: string;
  role: Staff["role"];
  expiresAt: string;
  revokedAt: string | null;
};
type Team = { users: Staff[]; invitations: Invite[] };

export function TeamManager() {
  const [team, setTeam] = useState<Team | null>(null);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<Staff["role"]>("EDITOR");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [busy, setBusy] = useState(false);
  const [setupUrl, setSetupUrl] = useState("");
  const [confirm, setConfirm] = useState<{
    id: string;
    email: string;
    action: "deactivate" | "revoke";
  } | null>(null);

  async function load() {
    const response = await fetch("/api/admin/team", { cache: "no-store" });
    if (response.status === 401) {
      navigateAfterAuth("/admin/login");
      return;
    }
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || "Unable to load staff.");
    }
    setTeam(result);
  }
  useEffect(() => {
    let active = true;
    fetch("/api/admin/team", { cache: "no-store" })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(
            "Unable to load staff. Administrator access is required.",
          );
        }
        return response.json();
      })
      .then((result) => {
        if (active) {
          setTeam(result);
        }
      })
      .catch((error) => {
        if (active) {
          setMessage(error.message);
          setError(true);
        }
      });
    return () => {
      active = false;
    };
  }, []);
  async function update(data: unknown, method = "PATCH") {
    setBusy(true);
    setMessage("");
    setSetupUrl("");
    try {
      const result = await authRequest("/api/admin/team", data, method);
      setMessage(result.message);
      setError(false);
      setSetupUrl(result.setupUrl || "");
      setConfirm(null);
      await load();
      return true;
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Unable to update access.",
      );
      setError(true);
      return false;
    } finally {
      setBusy(false);
    }
  }
  async function invite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (await update({ email, role }, "POST")) {
      setEmail("");
    }
  }

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
          <AdminButton type="submit" disabled={busy}>
            Create invitation
          </AdminButton>
        </div>
        <p className="text-xs leading-5 text-muted">
          Invitations expire after 24 hours. Resending replaces the previous
          link.
        </p>
      </form>
      {message && (
        <div className="mb-5">
          <AdminFeedback message={message} error={error} />
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
                setMessage("Setup link copied.");
              } catch {
                setMessage("Could not copy the link. Open it above.");
              }
            }}
          >
            Copy setup link
          </AdminButton>
        </div>
      )}
      {!team && !error && <p role="status">Loading staff…</p>}
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
                    update({ id: member.id, role: event.target.value })
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
                  onClick={() => update({ id: member.id, status: "ACTIVE" })}
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
                  onClick={() =>
                    update(
                      { email: invitation.email, role: invitation.role },
                      "POST",
                    )
                  }
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
        {confirm && error && (
          <div className="mb-4">
            <AdminFeedback message={message} error />
          </div>
        )}
        <div className="flex gap-3">
          <AdminButton
            variant="danger"
            disabled={busy}
            onClick={() =>
              confirm &&
              update(
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
