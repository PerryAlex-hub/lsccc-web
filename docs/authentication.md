# Custom staff authentication

Authentication is implemented separately from content publishing. Login, logout,
invitation acceptance, password resets and team permissions use Neon/PostgreSQL.
Content editing and public publishing also use the database.

## First administrator

The first administrator already exists in the configured database. Its credentials
are in the private, ignored `.admin-access.local.txt` file. The one-off bootstrap
script was removed after setup. Create additional staff through Team & Access.
A fresh empty database needs an approved account import or backup restore.

## Sessions and permissions

Passwords use salted scrypt (N=131072, r=8, p=1), constant-time comparisons and
bounded concurrent hashing. Random 256-bit session tokens are stored only as
SHA-256 hashes in the database. Session cookies are HTTP-only, SameSite=Lax,
secure and host-only in production, and expire after seven days. Logout deletes
the session. Deactivation, permission changes and password reset revoke sessions.

Administrators manage staff, website pages and settings. Editors can access news,
media, notices and safety resources. Layout checks are inside Suspense, and each
team API request validates its own session and role. Last-administrator changes
are serialised with a database advisory lock; the final active administrator
cannot be demoted or deactivated. Tokens and credential fields never appear in
team list responses or audit data.

The protected workspace layout sets `instant = false` as documented for
session-dependent routes. This avoids instant-UI validation attempting to render
a workspace that redirects anonymous prefetches to login. Session checks and
API authorization remain active.

Set APP_URL to the canonical website origin. Authentication mutations require
matching Origin and JSON bodies, and reject cross-site requests. Rate limits use
shared PostgreSQL buckets rather than process-local counters. Do not expose the
backend through multiple canonical origins without configuring a deliberate
trusted-origin policy. Expired session/rate-limit rows can be periodically removed.

## Invitations and email

Invitations are valid for 24 hours and may be accepted once. Resending replaces
the token. The account is created transactionally with invitation acceptance.
Pending invitations and access changes are actual database records, not UI previews.

Email may remain unconfigured. In that case, administrators receive a setup link
once in the team UI, accompanied by a clear no-email-sent message. The raw link
is not persisted; resending creates a new link if it is lost. Never log or paste
these links into public channels. Configuring AUTH_FROM_EMAIL and BREVO_API_KEY
enables email delivery. Successful delivery means Brevo accepted it for processing.

Password recovery returns 503 with a clear message while email is unconfigured.
Once configured, it gives a generic response to avoid disclosing account existence.
Reset tokens expire after 30 minutes, are single-use, and revoke all account
sessions when consumed. Existing-account provider failures invalidate that token and
retain the generic public response; they do not claim that an email was sent.

No demo invitation or reset tokens grant access. Staff sessions are validated on
the server. Content changes persist in the database rather than browser storage.
