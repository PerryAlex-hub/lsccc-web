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
