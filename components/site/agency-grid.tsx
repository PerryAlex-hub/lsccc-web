import Image from "next/image";
import { agencies } from "@/lib/content/agencies";

export function AgencyGrid() {
  return (
    <div className="grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
      {agencies.map((agency) => (
        <article
          key={agency.abbreviation}
          className="flex gap-5 bg-white p-6 sm:flex-col sm:p-8 xl:flex-row"
        >
          <div className="flex h-24 w-24 shrink-0 items-center justify-center self-start bg-white">
            <Image
              src={agency.logo}
              alt={`${agency.abbreviation} emblem`}
              width={96}
              height={96}
              className="h-24 w-24 object-contain"
            />
          </div>
          <div>
            <p className="mb-2 text-[11px] font-bold tracking-wide text-blue">
              {agency.abbreviation}
            </p>
            <h3 className="text-sm font-bold leading-6 text-navy">
              {agency.name}
            </h3>
            <p className="mt-3 text-xs leading-6 text-muted">
              {agency.description}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}
