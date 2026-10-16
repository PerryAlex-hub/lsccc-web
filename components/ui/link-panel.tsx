import { TextLink } from "./text-link";

export function LinkPanel({
  links,
}: {
  links: readonly { label: string; href: string }[];
}) {
  return (
    <nav
      aria-label="Related information"
      className="flex flex-col border border-border bg-paper px-6 sm:px-8"
    >
      {links.map((link) => (
        <TextLink
          key={link.href}
          href={link.href}
          className="flex items-center justify-between gap-4 border-b border-border py-6 text-sm leading-7 text-navy last:border-0"
        >
          {link.label}{" "}
          <span aria-hidden="true">
            {link.href.startsWith("https:") ? "↗" : "→"}
          </span>
        </TextLink>
      ))}
    </nav>
  );
}
