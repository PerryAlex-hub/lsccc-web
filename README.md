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
- `components/ui/`: shared page introductions, sections, photographs and links.
- `components/site/`: reusable header, footer, navigation and site search.
- `components/home/`, `about/`, `emergency/`, `safety/`, `news/`, `contact/`:
  page sections and focused interaction components.
- `lib/content/`: interior page content; homepage content is in `lib/home-content.ts`.
- `lib/enquiries/`: validation shared by the browser and API, and server email delivery.
- `lib/assets.ts` and `lib/navigation.ts`: central asset and destination mappings.
- `tests/`: search and enquiry validation tests.

The routes are `/`, `/about`, `/emergency-services`, `/safety-resources`,
`/news-media`, `/contact`, `/before-you-call`, and
`/news-media/lagos-strengthens-emergency-coordination-hub`.
The temporary foundation review remains at `/design-preview`.

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
