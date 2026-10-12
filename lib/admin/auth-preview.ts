import type { AdminTeamMember } from "./types";

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
