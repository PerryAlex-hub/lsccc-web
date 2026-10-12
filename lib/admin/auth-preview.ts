import type { AdminTeamMember } from "./types";

// Separate from saved team data so the state review remains repeatable.
export const demoInvitation: AdminTeamMember = {
  id: "invitation-state-preview",
  name: "",
  email: "invited@example.com",
  role: "Editor",
  status: "Invited",
  token: "demo-invitation",
  expiresAt: null,
};

export const passwordHint =
  "Use at least 15 characters. Spaces and passphrases are welcome.";

export function passwordError(password: string, confirmation: string) {
  if (password.length < 15 || password.length > 128) {
    return "Use a password between 15 and 128 characters.";
  }
  if (password !== confirmation) {
    return "The passwords do not match.";
  }
  return "";
}

export function invitationState(member: AdminTeamMember | undefined) {
  if (
    !member ||
    member.status === "Revoked" ||
    member.status === "Deactivated"
  ) {
    return "invalid";
  }
  if (member.status === "Active") {
    return "used";
  }
  if (member.expiresAt && new Date(member.expiresAt).getTime() <= Date.now()) {
    return "expired";
  }
  return "valid";
}

export function invitationHref(token: string) {
  return `/admin/accept-invitation?token=${encodeURIComponent(token)}`;
}
