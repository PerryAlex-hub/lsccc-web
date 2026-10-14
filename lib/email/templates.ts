export type EmailBrand = {
  appUrl: string;
  logoUrl: string;
};

export type EmailContent = {
  subject: string;
  text: string;
  html: string;
};

const centreName = "Lagos State Command & Control Centre";
const centreAddress =
  "Governor’s Road, opposite the Deputy Governor’s Office, Alausa, Ikeja, Lagos State, Nigeria.";

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[character];
  });
}

function websiteUrl(value: string) {
  const url = new URL(value);
  if (
    url.username ||
    url.password ||
    (url.protocol !== "https:" &&
      !(
        url.protocol === "http:" &&
        ["localhost", "127.0.0.1"].includes(url.hostname)
      ))
  ) {
    throw new Error(
      "Email website URLs must use HTTPS, or localhost during development.",
    );
  }
  return url;
}

function staffActionUrl(brand: EmailBrand, value: string, path: string) {
  const url = websiteUrl(value);
  if (url.origin !== websiteUrl(brand.appUrl).origin || url.pathname !== path) {
    throw new Error(
      "Staff email links must point to the configured LSCCC website.",
    );
  }
  return url.toString();
}

function paragraph(value: string) {
  return `<p style="margin:0 0 20px;color:#56616f;font-size:16px;line-height:26px;">${escapeHtml(value)}</p>`;
}

function button(label: string, href: string) {
  return `<table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:28px 0;width:auto;">
    <tr><td bgcolor="#0057a8" style="border-radius:4px;mso-padding-alt:16px 24px;">
      <a href="${escapeHtml(href)}" style="display:inline-block;padding:16px 24px;border:1px solid #0057a8;border-radius:4px;color:#ffffff;font-size:16px;font-weight:700;line-height:20px;text-align:center;text-decoration:none;">${escapeHtml(label)}</a>
    </td></tr>
  </table>`;
}

function fallbackLink(url: string) {
  return `<p style="margin:24px 0 8px;color:#56616f;font-size:13px;line-height:21px;">If the button does not work, copy this link into your browser:</p>
    <p style="margin:0;color:#0057a8;font-size:12px;line-height:20px;overflow-wrap:anywhere;word-break:break-all;">
      <a href="${escapeHtml(url)}" style="color:#0057a8;text-decoration:underline;word-break:break-all;">${escapeHtml(url)}</a>
    </p>`;
}

function layout(
  brand: EmailBrand,
  eyebrow: string,
  title: string,
  preheader: string,
  content: string,
) {
  const home = websiteUrl(brand.appUrl).origin;
  const logo = websiteUrl(brand.logoUrl).toString();
  return `<!doctype html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="color-scheme" content="light">
  <meta name="supported-color-schemes" content="light">
  <title>${escapeHtml(title)} | LSCCC</title>
  <style>
    body,table,td,a { -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; }
    table,td { mso-table-lspace:0pt; mso-table-rspace:0pt; }
    img { border:0; outline:none; text-decoration:none; -ms-interpolation-mode:bicubic; }
    @media only screen and (max-width:620px) {
      .email-outer { padding:16px 8px !important; }
      .email-panel { padding:24px 20px !important; }
      .email-title { font-size:26px !important; line-height:34px !important; }
      .email-logo-cell { width:64px !important; }
      .email-logo { width:48px !important; height:48px !important; }
      .email-brand-name { font-size:16px !important; line-height:23px !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;width:100%;background-color:#f3f5f7;font-family:Arial,Helvetica,sans-serif;color:#18212d;">
  <div style="display:none;font-size:1px;color:#f3f5f7;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;mso-hide:all;">${escapeHtml(preheader)}</div>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="#f3f5f7">
    <tr><td align="center" class="email-outer" style="padding:40px 16px;">
      <!--[if mso]><table role="presentation" width="600" align="center" cellspacing="0" cellpadding="0"><tr><td><![endif]-->
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;max-width:600px;table-layout:fixed;" bgcolor="#ffffff">
        <tr><td height="5" bgcolor="#f4b400" style="height:5px;font-size:0;line-height:0;">&nbsp;</td></tr>
        <tr><td bgcolor="#09284b" class="email-panel" style="padding:30px 32px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
            <tr>
              <td width="84" class="email-logo-cell" style="width:84px;vertical-align:middle;">
                <img class="email-logo" src="${escapeHtml(logo)}" width="64" height="64" alt="LSCCC logo" style="display:block;width:64px;height:64px;border-radius:50%;background-color:#ffffff;">
              </td>
              <td style="vertical-align:middle;">
                <p style="margin:0 0 6px;color:#f4b400;font-size:11px;font-weight:700;line-height:16px;letter-spacing:1.5px;">LAGOS STATE</p>
                <p class="email-brand-name" style="margin:0;color:#ffffff;font-size:20px;font-weight:700;line-height:28px;">Command &amp; Control Centre</p>
              </td>
            </tr>
          </table>
        </td></tr>
        <tr><td class="email-panel" style="padding:36px 32px;">
          <p style="margin:0 0 12px;color:#0057a8;font-size:11px;font-weight:700;line-height:17px;letter-spacing:1.4px;">${escapeHtml(eyebrow)}</p>
          <h1 class="email-title" style="margin:0 0 24px;color:#09284b;font-size:30px;font-weight:700;line-height:39px;">${escapeHtml(title)}</h1>
          ${content}
        </td></tr>
        <tr><td class="email-panel" bgcolor="#f8fafc" style="padding:24px 32px;border-top:1px solid #dce1e7;">
          <p style="margin:0 0 8px;color:#09284b;font-size:13px;font-weight:700;line-height:20px;">${escapeHtml(centreName)}</p>
          <p style="margin:0 0 14px;color:#56616f;font-size:12px;line-height:20px;">${escapeHtml(centreAddress)}</p>
          <a href="${escapeHtml(home)}" style="color:#0057a8;font-size:12px;font-weight:700;line-height:20px;text-decoration:underline;">Visit the LSCCC website</a>
        </td></tr>
      </table>
      <!--[if mso]></td></tr></table><![endif]-->
      <p style="max-width:560px;margin:20px 0 0;color:#56616f;font-size:11px;line-height:18px;">This is an automated LSCCC website notification.<br>For emergency assistance, call 112 or 767.</p>
    </td></tr>
  </table>
</body>
</html>`;
}

export function invitationEmail(
  brand: EmailBrand,
  link: string,
  role: "ADMINISTRATOR" | "EDITOR",
): EmailContent {
  const url = staffActionUrl(brand, link, "/admin/accept-invitation");
  const roleName = role === "ADMINISTRATOR" ? "Administrator" : "Editor";
  return {
    subject: "You are invited to the LSCCC workspace",
    text: `${centreName}\n\nYou are invited to the LSCCC staff workspace as an ${roleName.toLowerCase()}. Create your account and choose your own password.\n\nAccept invitation: ${url}\n\nThis one-time link expires in 24 hours. No temporary password is provided. If you were not expecting this invitation, ignore this email or contact your administrator.\n\n${centreAddress}`,
    html: layout(
      brand,
      "STAFF INVITATION",
      "You’re invited to the workspace",
      "Create your LSCCC staff account. Your invitation expires in 24 hours.",
      paragraph(
        `You have been invited to the LSCCC staff workspace as an ${roleName.toLowerCase()}.`,
      ) +
        paragraph(
          "Create your account and choose your own password to get started.",
        ) +
        button("Accept invitation", url) +
        `<p style="margin:0 0 20px;padding:14px 16px;border-left:3px solid #f4b400;background-color:#fff8e6;color:#705b25;font-size:14px;line-height:23px;">This link can be used once and expires in <strong>24 hours</strong>.</p>` +
        paragraph(
          "If you were not expecting this invitation, ignore this email or contact your administrator.",
        ) +
        fallbackLink(url),
    ),
  };
}

export function passwordResetEmail(
  brand: EmailBrand,
  link: string,
  name: string,
): EmailContent {
  const url = staffActionUrl(brand, link, "/admin/reset-password");
  const greeting = name.trim() ? `Hello ${name.trim()},` : "Hello,";
  return {
    subject: "Reset your LSCCC password",
    text: `${centreName}\n\n${greeting}\nWe received a request to reset your LSCCC staff password.\n\nReset password: ${url}\n\nThis one-time link expires in 30 minutes. Your password will stay the same until you choose a new one. If you did not request this, ignore this email. Never share this link or your password.\n\n${centreAddress}`,
    html: layout(
      brand,
      "ACCOUNT SECURITY",
      "Reset your password",
      "Your LSCCC password reset link expires in 30 minutes.",
      paragraph(greeting) +
        paragraph(
          "We received a request to reset the password for your LSCCC staff account.",
        ) +
        button("Reset password", url) +
        `<p style="margin:0 0 20px;padding:14px 16px;border-left:3px solid #f4b400;background-color:#fff8e6;color:#705b25;font-size:14px;line-height:23px;">This link can be used once and expires in <strong>30 minutes</strong>.</p>` +
        paragraph(
          "If you did not request this, ignore this email. Your password will stay the same until you choose a new one.",
        ) +
        paragraph("Never share this link or your password.") +
        fallbackLink(url),
    ),
  };
}

type EnquiryDetails = {
  name: string;
  email: string;
  topic: string;
  phone: string;
  subject: string;
  message: string;
};

export function enquiryEmail(
  brand: EmailBrand,
  enquiry: EnquiryDetails,
): EmailContent {
  const fields = [
    ["Name", enquiry.name],
    ["Email", enquiry.email],
    ["Topic", enquiry.topic],
    ["Phone", enquiry.phone || "Not provided"],
  ];
  const details = fields
    .map(
      ([label, value]) =>
        `<tr><td style="padding:9px 12px;width:72px;vertical-align:top;color:#56616f;font-size:13px;line-height:21px;">${escapeHtml(label)}</td><td style="padding:9px 12px;color:#18212d;font-size:14px;line-height:21px;overflow-wrap:anywhere;word-break:break-word;">${escapeHtml(value)}</td></tr>`,
    )
    .join("\n");
  const replyUrl = `mailto:${encodeURIComponent(enquiry.email)}?subject=${encodeURIComponent(`Re: ${enquiry.subject}`)}`;
  return {
    subject: `LSCCC enquiry: ${enquiry.subject}`,
    text: `${centreName}\n\nNew website enquiry\nSubject: ${enquiry.subject}\n${fields.map(([label, value]) => `${label}: ${value}`).join("\n")}\n\n${enquiry.message}\n\nReply to this email to respond directly to the sender.\n\n${centreAddress}`,
    html: layout(
      brand,
      "WEBSITE ENQUIRY",
      "A new enquiry has arrived",
      `New ${enquiry.topic.toLowerCase()} from ${enquiry.name}.`,
      paragraph(
        "A visitor submitted the following enquiry through the LSCCC website.",
      ) +
        `<h2 style="margin:0 0 18px;color:#09284b;font-size:20px;line-height:29px;overflow-wrap:anywhere;">${escapeHtml(enquiry.subject)}</h2>
       <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="#f3f5f7" style="table-layout:fixed;margin:0 0 24px;">${details}</table>
       <div style="color:#18212d;font-size:16px;line-height:26px;overflow-wrap:anywhere;word-break:break-word;">${escapeHtml(enquiry.message).replace(/\r?\n/g, "<br>")}</div>` +
        button("Reply to enquiry", replyUrl) +
        paragraph(
          "You can also reply to this email to respond directly to the sender.",
        ),
    ),
  };
}
