# Lagos State Command & Control Centre

Next.js 16.4, TypeScript and Tailwind CSS 4 implementation of the supplied Figma design, using the original photographs and locally hosted Plus Jakarta Sans font.

## Run locally

Configure the private environment variables from `.env.example`, then:

```sh
npm install
npm run dev
```

Production uses `npm run build` and `npm start`. Keep `APP_URL` aligned with the website origin.

## Content management

Sign in at `/admin/login`. The dashboard, articles, custom categories, notices, safety resources, page copy, media and settings read from Neon PostgreSQL through authenticated Next.js APIs. Changes survive browser refreshes and work across staff devices. Drafts remain private; publishing and unpublishing invalidate public caches.

The public homepage and newsroom show published database articles. Each article has its own internal route. Search, category filters, pagination, image captions, attribution and related stories use this content. Site search includes published pages and articles.

Administrators manage staff, page copy and settings. Editors manage news, categories, media, notices and resources. Permissions are checked on the server. The page editor manages headings, introductions and body text; designed sections, agency lists, navigation and emergency numbers remain in code.

Photographs upload through the server to Neon Object Storage. PostgreSQL holds URLs and metadata, rather than image bytes. Uploads accept JPG, PNG and WebP up to 2 MB and require matching image signatures. Referenced covers cannot be deleted. Original bundled design photographs are retained because other website sections use them.

The original content has already been imported into the configured database. Seed files, preview fixtures, browser persistence and temporary setup/check scripts have been removed. Prisma schema and migration history remain. Deleting these files does not delete existing database records. A fresh empty database needs an approved content/account import or backup restore.

## Staff access and email

Login, logout, sessions, invitations, password changes and roles use the backend. Invitations are single-use and expire after 24 hours. When email is unconfigured, administrators receive a setup link once in the team screen. Password recovery and contact enquiries clearly report that delivery is unavailable.

Email uses Brevo's HTTPS API. Invitations, password resets and enquiry notifications use branded LSCCC HTML with plain-text alternatives. Configure Brevo and the approved sender/recipient variables privately; `EMAIL_LOGO_URL` can reference the public Neon-hosted emblem. Restart the server afterward. See [authentication](docs/authentication.md) and [backend setup](docs/backend.md).

## Structure

- `app/`: public/admin route composition, metadata and API controllers.
- `components/`: page sections, shared design components and administration screens.
- `lib/cms/`: server content reads, writes, validation and public cached queries.
- `lib/admin/`: client state adapter, types and UI helpers.
- `lib/auth/`: custom session, password, invitation and team services.
- `lib/news/`: published article repository and URL helpers.
- `lib/storage/`: private Neon S3 connection and image services.
- `prisma/`: schema and checked-in migrations.
- `public/images/lsccc/`: original design assets used by the website and database records.

## Verification

```sh
npm run lint
npm test
npm run format:check
npm run build
```

Run `npm run format` to format TypeScript, JSX, CSS, JSON and Markdown. Figma references and earlier UI review checkpoints are recorded in [implementation notes](docs/implementation.md).
