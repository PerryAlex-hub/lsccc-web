# LSCCC implementation checkpoints

Complete each checkpoint and stop for the user's review before starting the next.

The user approved the foundation, then the reusable header, footer and homepage.
The current review combines checkpoints 4 and 5: all seven interior page designs
and their interactions. Internal links now use the completed page routes.

Checkpoint 2 + 3 review includes the full editorial homepage and shared shell.
The mobile menu, About dropdown, section search, source links and emergency
phone links are implemented. Lint, TypeScript and production build pass.
Browser checks cover 1440, 1280, 1024, 768, 390 and 320px widths, all 12 image
placements, anchor targets, menu navigation, search filtering and keyboard
Escape with focus restoration. The desktop header and hero match the design's
283px and 570px heights, and the complete desktop page is approximately 5099px.

1. Shared foundation: Figma colours, local Plus Jakarta Sans, original local assets,
   typography and responsive spacing. Review at `/design-preview`.
2. Reusable header and footer, including responsive navigation.
3. Editorial homepage, based on Figma node `32:682`.
4. Interior pages: About, Emergency Services, Safety Resources, News & Media,
   Contact, news article and Before You Call.
5. Search, filters, form handling and remaining interactions.
6. Responsive and visual verification; remove the temporary review page.

## Design sources

- File: https://www.figma.com/design/wCJpKU40TV32byGA1UkBFg
- Current homepage: `32:682`; header: `17:47`; footer: `17:74`.
- Interior layouts: `17:40` through `17:46`.
- Desktop reference width: 1440px. Tablet and mobile layouts must be adapted;
  separate mobile frames were not found in the inspected file.
- `lib/assets.ts` maps original image fills to their Figma nodes. Images retain
  the original JPEG data. Photos are 600px wide in the source file; higher
  resolution originals would improve their appearance in large desktop slots.
- The locally hosted variable font is distributed by Google Fonts under the
  SIL Open Font License; its license is saved alongside the font in `app/fonts`.

## Interior architecture and interactions

Route files compose page sections and define metadata. Shared UI, content data,
client interactions and server enquiry handling live in separate modules. The
homepage has also been split into reusable sections, and site search is separate
from navigation. Prettier configuration and formatting scripts cover the project.

Safety resources support text search, topic selection, result counts, empty
states and filter reset. News supports category and text filters, the local
article route, source attribution and article return navigation. Emergency FAQs
can be collapsed with native keyboard-accessible disclosure controls. Navigation
shows the current page, supports the About dropdown and mobile menu, and restores
focus when search or menus are closed with Escape.

The enquiry form validates fields using the same schema as the API, focuses the
first invalid field, preselects approved enquiry topics from links, prevents
duplicate submissions and preserves a message if delivery fails. The user
explicitly deferred the email destination. SMTP delivery is prepared but remains
unconfigured; no enquiry is reported as sent while configuration is missing.

## Items to resolve before launch

- Confirm the centre's exact enquiry email and approved sending service. The
  required server environment variables are documented in `.env.example`.
- Design annotations request publishing clearance for photography and news
  references. Preserve source attribution.
- Safety topics currently link to official resources; additional topic pages
  would require approved guidance.
