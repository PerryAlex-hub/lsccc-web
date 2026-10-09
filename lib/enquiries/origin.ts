export function isAllowedOrigin(origin: string | null, host: string) {
  if (!origin) {
    return true;
  }
  try {
    return new URL(origin).host.toLowerCase() === host.toLowerCase();
  } catch {
    return false;
  }
}
