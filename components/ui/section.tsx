import type { ReactNode } from "react";

export function Section({
  children,
  id,
  tone = "white",
  className = "",
  nodeId,
}: {
  children: ReactNode;
  id?: string;
  tone?: "white" | "paper" | "navy";
  className?: string;
  nodeId?: string;
}) {
  const tones = {
    white: "bg-white",
    paper: "bg-paper",
    navy: "bg-navy text-white",
  };
  return (
    <section id={id} className={tones[tone]} data-node-id={nodeId}>
      <div className={`site-container py-14 md:py-20 ${className}`}>
        {children}
      </div>
    </section>
  );
}

export function SectionIntro({
  eyebrow,
  title,
  children,
  dark = false,
  className = "",
  gap = 16,
  titleClassName = "text-[clamp(1.65rem,2.6vw,2.25rem)] leading-[1.3]",
}: {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
  dark?: boolean;
  className?: string;
  gap?: number;
  titleClassName?: string;
}) {
  return (
    <div className={`flex flex-col ${className}`} style={{ gap }}>
      <p
        className={`text-xs font-bold tracking-[0.14em] ${dark ? "text-gold" : "text-blue"}`}
      >
        {eyebrow}
      </p>
      <h2
        className={`max-w-3xl whitespace-pre-line font-bold tracking-[-0.025em] text-balance ${dark ? "text-white" : "text-navy"} ${titleClassName}`}
      >
        {title}
      </h2>
      {children}
    </div>
  );
}

export function InfoCard({
  title,
  children,
  number,
  accent = "bg-navy",
  className = "bg-white",
}: {
  title: string;
  children: ReactNode;
  number?: string;
  accent?: string;
  className?: string;
}) {
  return (
    <article
      className={`flex h-full min-w-0 flex-col gap-4 border border-border p-6 sm:p-8 ${className}`}
    >
      <div className={`h-0.5 w-10 ${accent}`} aria-hidden="true" />
      {number && (
        <p className="text-2xl font-semibold tabular-nums text-blue">
          {number}
        </p>
      )}
      <h3 className="text-lg font-bold leading-7 text-navy">{title}</h3>
      <div className="text-sm leading-7 text-muted">{children}</div>
    </article>
  );
}
