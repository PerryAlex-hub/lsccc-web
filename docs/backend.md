# Backend foundation

This is the first backend review batch. The database schema, migration, seed and
Neon Object Storage service are implemented. Authentication and team management
are connected. Content edits still use browser preview data until publishing
integration is complete.

## Stack and environment

Prisma 7 with `prisma-client-js` generates into `node_modules`, with no custom
output directory. This generator is deprecated but retained deliberately to match
the agreed setup. Runtime connections use `@prisma/adapter-neon`. Both runtime and
Prisma CLI use the same `DATABASE_URL`; there is no unpooled URL configuration.

Copy `.env.example` to the ignored `.env.local` and configure `DATABASE_URL` for
the intended Neon development branch. Prisma scripts load the same environment
files as Next.js. Never put database or storage credentials in a `NEXT_PUBLIC_` variable.

```sh
npm run db:validate
npm run db:generate
npm run db:check
npm run db:deploy
npm run db:seed
npm run storage:check
npm run backend:check
```

`db:deploy` applies the checked-in migration to the configured database. Use
`db:migrate` to create future migrations on the development branch. The existing
initial and storage migrations have been applied to the configured Neon database.
Use separate development and production environments/branches.

## Schema

- User, Session, Invitation and PasswordResetToken support custom authentication.
  Raw passwords, session tokens and invitation tokens are never database fields.
  Store a password hash and SHA-256 token hashes. Only invitation acceptance creates
  a user. A bootstrap invitation may have no inviter.
- RateLimitBucket supports shared authentication rate limits across server instances.
- Category has unique normalized names and slugs; NewsArticle references Category
  and MediaAsset. A display byline is separate from the staff creator.
- MediaAsset records Neon object metadata and upload state. Existing bundled photographs
  are recorded as LOCAL/READY and contain only paths/metadata, not binary data.
- PublicNotice, SafetyResource, WebsitePage and PageSection support content editing.
  Section JSON must be validated by the content service in the integration batch.
- SiteSettings is a singleton; AuditLog preserves attributed content/access actions.

Foreign keys protect referenced categories and cover images. Deleting a user
removes their sessions/reset tokens and preserves content attribution records with
nullable actor references. Staff access management should deactivate rather than
delete users. Last-administrator protection and transactional invitation acceptance
are implemented in the authentication service.

The seed preserves existing records on reruns. It imports the five public news
summaries, four original bundled photographs, notices, safety resource summaries,
seven page introductions and settings. It does not create sample staff, passwords,
invitations or tokens. Further page sections will be mapped during content integration.

## Neon Object Storage setup

Create a `public_read` bucket in the selected Neon branch. Configure the private
`AWS_ENDPOINT_URL_S3`, `AWS_REGION`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`,
and `STORAGE_BUCKET_NAME` variables using Connect > Storage. The S3 client uses
path-style addressing and avoids signing empty-body checksums on presigned uploads.
Public image URLs are derived from the branch endpoint, bucket and object key.
Storage credentials are separate from DATABASE_URL. No AWS account is needed.

The storage service creates random object keys and five-minute signed PUT URLs.
The integration batch will create a PENDING media row before issuing a URL, then
verify the actual object's size, content type and image signature before marking
it READY. Upload endpoints must require an active staff session and verify object
ownership. Objects referenced by content must not be deleted.

Browser PUT uploads need bucket CORS with the exact site origin, PUT method and
Content-Type header. Run `npm run storage:check -- --configure-cors` to add APP_URL
to upload CORS while preserving existing rules. The check uses one temporary image
and deletes it afterward. It verifies upload, metadata, signature and public read.
Neon does not enforce S3 lifecycle expiration rules; abandoned-upload cleanup must
run in application code. File types are JPG/PNG/WebP, with
the same 2 MB limit as the current UI. SVG/HTML uploads are rejected.

## Next review batches

Dependency audit currently flags high-severity transitive advisories in the
Prisma and ESLint toolchains. `npm audit --omit=dev` also includes Prisma via its
optional dependency graph and reports four findings. The reported paths concern
`deepmerge-ts` and `mysql2`; this application uses PostgreSQL, not MySQL. These
findings are not claimed resolved. Audit's automatic recommendation downgrades
Prisma to 6 and ESLint's Next config to 14, so no forced downgrade was applied.
Recheck patched compatible toolchain versions before production deployment.

1. Content integration: replace preview persistence with authenticated services,
   wire Neon uploads, read published records publicly and invalidate content caches.

## Email configuration

The shared SMTP transport is ready for enquiry delivery and the authentication
service. Configure SMTP_HOST, SMTP_PORT, SMTP_USER and SMTP_PASSWORD. Configure
AUTH_FROM_EMAIL for invitation/reset senders, and CONTACT_FROM_EMAIL plus
CONTACT_TO_EMAIL for enquiries. Senders must be approved by the email provider.
`backend:check` reports missing variable names and, if transport credentials are
present, verifies SMTP authentication without sending an email. Never paste
credentials into chat. Authentication is implemented; content publishing still
requires the next integration batch. See authentication.md for details.
