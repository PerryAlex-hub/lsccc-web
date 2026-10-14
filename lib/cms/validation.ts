import { AuthError } from "@/lib/auth/errors";

export function text(
  value: unknown,
  label: string,
  max: number,
  required = false,
) {
  if (
    typeof value !== "string" ||
    value.length > max ||
    (required && !value.trim())
  ) {
    throw new AuthError(400, `Check ${label} (maximum ${max} characters).`);
  }
  return value.trim();
}

export function uuid(value: unknown) {
  if (
    typeof value !== "string" ||
    !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
      value,
    )
  ) {
    throw new AuthError(400, "Invalid record identifier.");
  }
  return value;
}

export function publication(value: unknown) {
  if (value !== "Draft" && value !== "Published") {
    throw new AuthError(400, "Choose Draft or Published.");
  }
  return value === "Published" ? ("PUBLISHED" as const) : ("DRAFT" as const);
}

export function destination(value: unknown) {
  const url = text(value, "destination link", 2000);
  if (!url) {
    return url;
  }
  if (/^\/(?!\/)/.test(url) && !/[\\\r\n]/.test(url)) {
    return url;
  }
  try {
    const parsed = new URL(url);
    if (parsed.protocol === "https:" && !parsed.username && !parsed.password) {
      return url;
    }
  } catch {}
  throw new AuthError(400, "Use a website path or an HTTPS link.");
}
