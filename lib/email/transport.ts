type EmailAddress = { email: string; name?: string };

export type TransactionalEmail = {
  from: EmailAddress;
  to: EmailAddress;
  replyTo?: EmailAddress;
  subject: string;
  text: string;
};

export function mailTransportConfigured() {
  return Boolean(process.env.BREVO_API_KEY?.trim());
}

// Keep provider credentials and responses out of client errors and application logs.
export async function sendTransactionalEmail(
  message: TransactionalEmail,
  apiKey = process.env.BREVO_API_KEY,
  request: typeof fetch = fetch,
) {
  if (!apiKey?.trim()) {
    throw new Error("Email delivery is not configured.");
  }
  const response = await request("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "api-key": apiKey.trim(),
    },
    body: JSON.stringify({
      sender: message.from,
      to: [message.to],
      ...(message.replyTo ? { replyTo: message.replyTo } : {}),
      subject: message.subject,
      textContent: message.text,
    }),
    cache: "no-store",
    redirect: "error",
    signal: AbortSignal.timeout(15000),
  });
  if (response.status !== 201) {
    throw new Error("Email service did not accept the message.");
  }
  const result: unknown = await response.json();
  if (
    !result ||
    typeof result !== "object" ||
    !("messageId" in result) ||
    typeof result.messageId !== "string" ||
    !result.messageId.trim()
  ) {
    throw new Error("Email service did not confirm acceptance.");
  }
}
