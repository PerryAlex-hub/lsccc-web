import { TextLink } from "./text-link";

export function LinkPanel({
  links,
}: {
  links: readonly { label: string; href: string }[];
}) {
  return (
    <nav
      aria-label="Related information"
      className="flex flex-col gap-5 bg-paper p-7"
    >
      {links.map((link) => (
        <TextLink
          key={link.href}
          href={link.href}
          className="border-b border-border pb-5 text-[17px] leading-[25px] text-navy last:border-0 last:pb-0"
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
