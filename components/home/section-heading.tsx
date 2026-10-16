import { TextLink } from "@/components/ui/text-link";

type SectionHeadingProps = {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  href?: string;
  linkLabel?: string;
};

export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  href,
  linkLabel,
}: SectionHeadingProps) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-5 lg:mb-10">
      <div className="max-w-2xl">
        <p className="mb-3 text-xs font-bold tracking-[0.14em] text-blue">
          {eyebrow}
        </p>
        <h2
          id={id}
          className="text-[clamp(1.65rem,2.6vw,2.25rem)] font-bold leading-[1.3] tracking-[-0.025em] text-navy"
        >
          {title}
        </h2>
        {description && (
          <p className="mt-4 max-w-xl text-sm leading-7 text-muted sm:text-base">
            {description}
          </p>
        )}
      </div>
      {href && linkLabel && (
        <TextLink href={href} className="shrink-0 py-2 text-sm text-blue">
          {linkLabel}{" "}
          <span aria-hidden="true" className="ml-2">
            →
          </span>
        </TextLink>
      )}
    </div>
  );
}
