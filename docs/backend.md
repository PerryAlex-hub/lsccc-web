# Backend setup

The site uses Next.js APIs, Prisma 7, Neon PostgreSQL and Neon Object Storage. Authentication, team management, content editing, uploads and public publishing are connected.

## Environment and migrations

Use `.env.example` as the reference for private settings. Runtime and Prisma CLI use the same `DATABASE_URL` through the Neon adapter. No unpooled URL or custom generated-client output is configured. `prisma-client-js` generates inside `node_modules`; this deprecated generator is retained to match the agreed setup.

```sh
npm run db:validate
npm run db:generate
npm run db:deploy
```

Use `db:migrate` to create future development migrations. The initial schema and Neon storage migrations are already applied to the configured database. Keep the schema and migration history. Use distinct Neon development and production branches and preserve database backups.

Seed files and one-off setup/check scripts have been removed after importing and verifying the existing content. Migration deployment creates tables; it does not recreate content or the first administrator. A fresh empty database requires an approved import or backup restore. The configured database already contains the original content and administrator.

## Content services

`lib/cms/read.ts` serializes safe administration data. `write.ts` accepts a single explicit command and whitelists fields, validates publication requirements, checks the active user and role in the transaction, and records an attributed audit entry. Article, page, notice and resource updates reject outdated versions. Article deletion removes it from public reads and releases its cover reference while retaining the deleted database row.

Editors manage articles, categories, media, notices and resources. Administrators additionally manage page copy and site settings. The page editor covers title, introduction and body text. Designed sections remain code-managed; arbitrary HTML and section JSON are not accepted from clients.

Public repositories use `use cache`, cache lifetimes and the `public-content` tag. Successful content writes expire that tag and revalidate the public layout. Public reads include published records only. Homepage news, the newsroom, article details, notices, safety resources, page introductions, site search and site settings use database content.

## Images

Configure `AWS_ENDPOINT_URL_S3`, `AWS_REGION`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY` and `STORAGE_BUCKET_NAME` from Neon Connect > Storage. The bucket must permit public reads of website images. Credentials stay on the server.

The browser sends a bounded image body to `/api/admin/media`; the server checks the session, origin, upload rate, MIME type, size and signature before writing to Neon S3. Object names use generated UUIDs. Only completed uploads become READY database assets. Failed database insertion triggers object cleanup. Upload credentials and reusable upload URLs are never sent to the browser.

Media detail changes accept only filename and alternative text. Deletion checks content references on the server. Bundled LOCAL photographs cannot be deleted through the media screen because static sections also use them. Storage operations and PostgreSQL transactions are separate systems; operational backups and orphan-object reconciliation remain deployment maintenance tasks.

## Email

Email configuration is independent. Staff invitation/reset delivery uses `AUTH_FROM_EMAIL` and SMTP settings. General enquiries additionally use `CONTACT_TO_EMAIL` and `CONTACT_FROM_EMAIL`. The public enquiry email in Site Settings is display information and does not configure the mail transport.

Unconfigured email never produces a false sent confirmation. Administrators receive manual invitation setup links while SMTP is deferred. Password recovery and the contact form report delivery unavailable.

## Dependency maintenance

The earlier dependency audit reported transitive tooling findings in the Prisma/ESLint dependency graph. Forced fixes proposed incompatible major downgrades and were not applied. Review upstream patches before deployment; the application uses the Neon PostgreSQL adapter rather than the optional MySQL adapter.
