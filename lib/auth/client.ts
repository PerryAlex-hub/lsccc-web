"use client";

export function navigateAfterAuth(path: "/admin" | "/admin/login") {
  // A new document clears per-user client state preserved by React Activity.
  window.location.assign(path);
}

export async function authRequest(
  path: string,
  data: unknown,
  method = "POST",
) {
  const response = await fetch(path, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    cache: "no-store",
  });
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || "Unable to complete this request.");
  }
  return result;
}
