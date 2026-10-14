import { AuthError } from "./errors";

export async function readAuthBody(request: Request) {
  const origin = request.headers.get("origin");
  const expected = process.env.APP_URL;
  if (
    !origin ||
    !expected ||
    origin !== new URL(expected).origin ||
    request.headers.get("sec-fetch-site") === "cross-site"
  ) {
    throw new AuthError(403, "Submit this request from the website.");
  }
  if (!request.headers.get("content-type")?.startsWith("application/json")) {
    throw new AuthError(415, "Use a JSON request.");
  }
  if (Number(request.headers.get("content-length")) > 12000) {
    throw new AuthError(413, "Request is too large.");
  }
  const reader = request.body?.getReader();
  if (!reader) {
    throw new AuthError(400, "Check the submitted information.");
  }
  const decoder = new TextDecoder();
  let text = "";
  let size = 0;
  while (true) {
    const { value, done } = await reader.read();
    if (done) {
      break;
    }
    size += value.byteLength;
    if (size > 12000) {
      await reader.cancel();
      throw new AuthError(413, "Request is too large.");
    }
    text += decoder.decode(value, { stream: true });
  }
  text += decoder.decode();
  try {
    const value: unknown = JSON.parse(text);
    if (!value || typeof value !== "object" || Array.isArray(value)) {
      throw new Error();
    }
    return value as Record<string, unknown>;
  } catch {
    throw new AuthError(400, "Check the submitted information.");
  }
}

export function authResponse(body: unknown, status = 200) {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store", "Referrer-Policy": "no-referrer" },
  });
}

export function authFailure(error: unknown) {
  return authResponse(
    {
      message:
        error instanceof AuthError
          ? error.message
          : "Unable to complete this request. Please try again.",
    },
    error instanceof AuthError ? error.status : 503,
  );
}
