export function normalizedEmail(value: unknown) {
  if (typeof value !== "string") {
    return "";
  }
  const email = value.trim().toLowerCase();
  return email.length <= 254 && /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email)
    ? email
    : "";
}

export function validPassword(value: unknown): value is string {
  return typeof value === "string" && value.length >= 15 && value.length <= 128;
}

export function validName(value: unknown): value is string {
  return (
    typeof value === "string" &&
    value.trim().length > 0 &&
    value.trim().length <= 120
  );
}
