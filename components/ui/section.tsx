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
      <div className={`site-container section-space ${className}`}>
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
  gap = 24,
  titleClassName = "text-[26px] leading-[38px]",
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
        className={`text-eyebrow font-bold ${dark ? "text-gold" : "text-navy"}`}
      >
        {eyebrow}
      </p>
      <h2 className={`whitespace-pre-line font-extrabold ${titleClassName}`}>
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
    <article className={`flex min-w-0 flex-col gap-4 p-7 ${className}`}>
      <div className={`h-1 ${accent}`} aria-hidden="true" />
      {number && (
        <p className="text-[11px] font-bold leading-[17px] text-navy">
          {number}
        </p>
      )}
      <h3 className="text-[22px] font-bold leading-[33px]">{title}</h3>
      <div className="text-[15px] leading-[23px] text-muted">{children}</div>
    </article>
  );
}
