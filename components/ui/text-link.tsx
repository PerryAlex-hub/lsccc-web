import Link from "next/link";
import type { ReactNode } from "react";

type TextLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
};

export function TextLink({
  href,
  children,
  className = "",
  ariaLabel,
}: TextLinkProps) {
  const external = href.startsWith("https://");
  const classes = `font-bold underline-offset-4 transition-colors hover:underline ${className}`;
  if (external || href.startsWith("tel:")) {
    return (
      <a
        href={href}
        className={classes}
        aria-label={ariaLabel}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}

export function ActionLink({ className = "", ...props }: TextLinkProps) {
  return (
    <TextLink
      {...props}
      className={`inline-flex min-h-12 items-center px-4 py-3 ${className.includes("text-base") ? "" : "text-sm"} ${className}`}
    />
  );
}
