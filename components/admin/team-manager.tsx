"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { invitationHref, invitationState } from "@/lib/admin/auth-preview";
import { updateAdminState, useAdminState } from "@/lib/admin/store";
import type { AdminRole, AdminTeamMember } from "@/lib/admin/types";
import { AdminDialog } from "./dialog";
import { AdminButton, AdminFeedback, AdminField, AdminHeading } from "./ui";

export function TeamManager() {
  const state = useAdminState();
  const [invite, setInvite] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<AdminRole>("Editor");
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [dialogError, setDialogError] = useState("");
  const [confirmation, setConfirmation] = useState<{
    member: AdminTeamMember;
    action: "Revoke" | "Deactivate";
  } | null>(null);
  const members = state.team.filter((member) =>
    `${member.name} ${member.email}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  function save(member: AdminTeamMember, label: string) {
    const result = updateAdminState(
      (current) => ({
        ...current,
        team: current.team.map((item) =>
          item.id === member.id ? member : item,
        ),
      }),
      label,
    );
    setMessage(
      result.ok
        ? `${label}. Saved in this browser only; no email was sent.`
        : result.message,
    );
    setError(!result.ok);
    return result.ok;
  }

  function createInvitation(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalized = email.trim().toLowerCase();
    if (
      state.team.some((member) => member.email.toLowerCase() === normalized)
    ) {
      setDialogError(
        "This email is already listed. Resend its invitation or reactivate the existing member.",
      );
      return;
    }
    const member: AdminTeamMember = {
      id: crypto.randomUUID(),
      name: "",
      email: normalized,
      role,
      status: "Invited",
      token: crypto.randomUUID(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    };
    const result = updateAdminState(
      (current) => ({ ...current, team: [...current.team, member] }),
      "Created team invitation in preview",
    );
    if (!result.ok) {
      setDialogError(result.message);
      return;
    }
    setInvite(false);
    setEmail("");
    setRole("Editor");
    setDialogError("");
    setMessage(
      "Invitation created in this browser. No email was sent. Open its setup preview below.",
    );
    setError(false);
  }

  function resend(member: AdminTeamMember) {
    save(
      {
        ...member,
        status: "Invited",
        token: crypto.randomUUID(),
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      },
      "Replaced invitation link in preview",
    );
  }

  async function copyLink(member: AdminTeamMember) {
    try {
      await navigator.clipboard.writeText(
        `${window.location.origin}${invitationHref(member.token)}`,
      );
      setMessage(
        "Preview invitation link copied. It works only with this browser’s preview data.",
      );
      setError(false);
    } catch {
      setMessage(
        "Could not copy the link. Use Open setup preview to review the invitation.",
      );
      setError(true);
    }
  }

  return (
    <>
      <AdminHeading
        eyebrow="WORKSPACE ACCESS"
        title="Team & access"
        description="Invite staff and define what they can manage. These are sample accounts; roles and access are not enforced until the backend is connected."
        actions={
          <AdminButton
            onClick={() => {
              setDialogError("");
              setInvite(true);
            }}
          >
            Invite staff member
          </AdminButton>
        }
      />
      <div className="mb-7 grid gap-4 sm:grid-cols-2">
        <div className="rounded-md border border-border bg-white p-5">
          <h2 className="font-bold text-navy">Administrator</h2>
          <p className="mt-2 text-sm leading-6 text-muted">
            Manages content, website settings and team access. Can invite staff
            and change roles.
          </p>
        </div>
        <div className="rounded-md border border-border bg-white p-5">
          <h2 className="font-bold text-navy">Editor</h2>
          <p className="mt-2 text-sm leading-6 text-muted">
            Manages news, media and safety resources. Cannot manage staff access
            or website settings.
          </p>
        </div>
      </div>
      {message && (
        <div className="mb-5">
          <AdminFeedback message={message} error={error} />
        </div>
      )}
      <div className="mb-5 max-w-md">
        <AdminField label="Find a team member">
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search name or email"
            className="admin-input"
          />
        </AdminField>
      </div>
      <div className="space-y-3">
        {members.map((member) => {
          const expired =
            member.status === "Invited" &&
            invitationState(member) === "expired";
          const status = expired ? "Expired invitation" : member.status;
          return (
            <article
              key={member.id}
              className="flex min-w-0 flex-col gap-5 rounded-md border border-border bg-white p-5 xl:flex-row xl:items-center xl:justify-between"
            >
              <div className="min-w-0">
                <h2 className="break-words text-sm font-bold text-navy">
                  {member.name || member.email}
                </h2>
                {member.name && (
                  <p className="mt-1 break-all text-xs text-muted">
                    {member.email}
                  </p>
                )}
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${member.status === "Active" ? "bg-[#e8f3ed] text-[#246743]" : "bg-paper text-muted"}`}
                  >
                    {status}
                  </span>
                  {member.owner && (
                    <span className="text-xs text-muted">
                      Initial administrator · Sample account
                    </span>
                  )}
                  {member.expiresAt && member.status === "Invited" && (
                    <span className="text-xs text-muted">
                      Expires{" "}
                      {new Date(member.expiresAt).toLocaleString("en-GB", {
                        timeZone: "Africa/Lagos",
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <label className="text-xs font-semibold text-muted">
                  <span className="sr-only">Role for {member.email}</span>
                  <select
                    value={member.role}
                    disabled={member.owner}
                    onChange={(event) =>
                      save(
                        { ...member, role: event.target.value as AdminRole },
                        "Changed staff role in preview",
                      )
                    }
                    className="admin-input min-w-36 disabled:opacity-60"
                  >
                    <option>Administrator</option>
                    <option>Editor</option>
                  </select>
                </label>
                {member.status === "Invited" && (
                  <>
                    <AdminButton
                      variant="secondary"
                      onClick={() => resend(member)}
                    >
                      Resend invitation
                    </AdminButton>
                    <AdminButton
                      variant="secondary"
                      onClick={() =>
                        setConfirmation({ member, action: "Revoke" })
                      }
                    >
                      Revoke
                    </AdminButton>
                  </>
                )}
                {member.status === "Active" && !member.owner && (
                  <AdminButton
                    variant="secondary"
                    onClick={() =>
                      setConfirmation({ member, action: "Deactivate" })
                    }
                  >
                    Deactivate
                  </AdminButton>
                )}
                {(member.status === "Deactivated" ||
                  member.status === "Revoked") && (
                  <AdminButton
                    variant="secondary"
                    onClick={() => resend(member)}
                  >
                    Invite again
                  </AdminButton>
                )}
                {member.status === "Invited" && !expired && (
                  <div className="flex w-full flex-wrap gap-x-5">
                    <Link
                      href={invitationHref(member.token)}
                      className="inline-flex min-h-11 items-center text-xs font-bold text-blue hover:underline"
                    >
                      Open setup preview
                    </Link>
                    <button
                      type="button"
                      onClick={() => copyLink(member)}
                      className="min-h-11 text-xs font-bold text-blue hover:underline"
                    >
                      Copy preview link
                    </button>
                  </div>
                )}
              </div>
            </article>
          );
        })}
        {!members.length && (
          <p className="rounded-md border border-border bg-white p-8 text-sm text-muted">
            No team members match your search.
          </p>
        )}
      </div>
      <AdminDialog
        open={invite}
        onClose={() => setInvite(false)}
        title="Invite staff member"
      >
        <form onSubmit={createInvitation} className="space-y-5">
          <p className="text-sm leading-6 text-muted">
            The invitation leads to account setup, where the recipient chooses
            their own password. In this preview, no email is sent.
          </p>
          <AdminField label="Email address">
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              maxLength={254}
              autoComplete="email"
              className="admin-input"
            />
          </AdminField>
          <AdminField label="Role">
            <select
              value={role}
              onChange={(event) => setRole(event.target.value as AdminRole)}
              className="admin-input"
            >
              <option>Editor</option>
              <option>Administrator</option>
            </select>
          </AdminField>
          <p className="text-xs leading-5 text-muted">
            Invitations expire after 24 hours. Resending replaces the previous
            link.
          </p>
          {dialogError && <AdminFeedback message={dialogError} error />}
          <div className="flex flex-wrap gap-3">
            <AdminButton type="submit">Create invitation preview</AdminButton>
            <AdminButton variant="secondary" onClick={() => setInvite(false)}>
              Cancel
            </AdminButton>
          </div>
        </form>
      </AdminDialog>
      <AdminDialog
        open={!!confirmation}
        onClose={() => setConfirmation(null)}
        title={`${confirmation?.action || "Update"} access?`}
      >
        <p className="mb-6 break-words text-sm leading-6 text-muted">
          {confirmation?.action === "Revoke"
            ? "The current invitation link will become unavailable"
            : "This staff member will be marked inactive"}{" "}
          for {confirmation?.member.email}. This affects the browser preview
          only.
        </p>
        <div className="flex gap-3">
          <AdminButton
            variant="danger"
            onClick={() => {
              if (!confirmation) {
                return;
              }
              const updated: AdminTeamMember = {
                ...confirmation.member,
                status:
                  confirmation.action === "Revoke" ? "Revoked" : "Deactivated",
              };
              if (save(updated, `${confirmation.action}d access in preview`)) {
                setConfirmation(null);
              }
            }}
          >
            Confirm {confirmation?.action.toLowerCase()}
          </AdminButton>
          <AdminButton
            variant="secondary"
            onClick={() => setConfirmation(null)}
          >
            Cancel
          </AdminButton>
        </div>
      </AdminDialog>
    </>
  );
}
