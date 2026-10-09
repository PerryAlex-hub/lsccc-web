# LSCCC implementation checkpoints

Complete each checkpoint and stop for the user's review before starting the next.

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

## Items to resolve before launch

- The design does not specify an enquiry delivery endpoint or recipient.
- Design annotations request publishing clearance for photography and news
  references. Preserve source attribution.
- Safety topics currently link to official resources; additional topic pages
  would require approved guidance.
