# Lagos State Command & Control Centre

Next.js 16.4, TypeScript and Tailwind CSS 4 implementation of the supplied Figma
design. The site uses the original photographs and locally hosted Plus Jakarta
Sans font.

## Run locally

```sh
npm install
npm run dev
```

For a production preview:

```sh
npm run build
npm run start -- --port 3003
```

## Project structure

- `app/`: route composition, metadata and the enquiry API.
- `app/(site)/`: public pages and shared public layout; URLs are unchanged.
- `app/admin/` and `components/admin/`: separate administration UI and screens.
- `lib/admin/`: preview data, types and browser-only storage adapter.
- `components/ui/`: shared page introductions, sections, photographs and links.
- `components/site/`: reusable header, footer, navigation and site search.
- `components/home/`, `about/`, `emergency/`, `safety/`, `news/`, `contact/`:
  page sections and focused interaction components.
- `lib/content/`: interior page content; homepage content is in `lib/home-content.ts`.
- `lib/news/`: news lookup, ordering, related articles and internal URL helpers.
- `lib/enquiries/`: validation shared by the browser and API, and server email delivery.
- `lib/assets.ts` and `lib/navigation.ts`: central asset and destination mappings.
- `tests/`: search and enquiry validation tests.

The routes are `/`, `/about`, `/emergency-services`, `/safety-resources`,
`/news-media`, `/contact`, `/before-you-call`, and `/news-media/[slug]`.
Five local news articles are available for UI review. Homepage news cards and
newsroom cards open these internal article routes.

The newsroom includes a featured story, category and search filters, a responsive
article grid, pagination, article details and related stories. Content is read
through `lib/news/repository.ts` from the local editorial summaries in
`lib/content/news.ts`. The database and real publishing workflow remain future
work; the admin preview is described below.

The shared footer, browser icon and Apple touch icon use the LSCCC emblem.

## Admin UI preview

Open `/admin` for the dashboard. The workspace includes news management, a new
article editor, editing and preview routes, public notices, safety resources,
website pages, a media library and website settings. Desktop uses a separate
sidebar; mobile uses a keyboard-accessible menu.

Edits, uploads and publication status changes are stored in this browser under
`lsccc-admin-ui-v1`. They survive refreshes but do not change public site content.
Use Settings → Reset preview to restore the initial review data. Image uploads
accept JPG, PNG and WebP files up to 2 MB; browser storage limits still apply.
Images used as article covers cannot be removed until those references change.

The preview has no authentication, database or live publishing endpoint. Those
are the next backend stage. All admin routes request `noindex, nofollow`.

## Checks and formatting

```sh
npm run lint
npm test
npm run format:check
npm run build
```

Run `npm run format` after editing files. Prettier formats TypeScript, JSX, CSS,
JSON and Markdown consistently.

## Enquiry email delivery

Email delivery is intentionally unconfigured pending confirmation of the centre's
inbox. The form validates enquiries, preserves messages on failure and reports
that a message has not been sent when delivery is unavailable.

When the inbox and sending service are confirmed, copy `.env.example` to
`.env.local` and set the recipient, approved sender and SMTP credentials. Use a
verified sender belonging to the sending service; the visitor's email is used as
the reply-to address. Restart the server after configuration.

The server uses Nodemailer's [SMTP transport](https://nodemailer.com/smtp), with
TLS on port 465 or STARTTLS on port 587. Credentials remain on the server.
The API returns success only after the mail server accepts delivery; it does not
claim that the message has been read.

See `docs/implementation.md` for the Figma references and review checkpoints.
