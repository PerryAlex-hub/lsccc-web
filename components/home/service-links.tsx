import Link from "next/link";
import { destinations } from "@/lib/navigation";

const services = [
  {
    title: "Report an emergency",
    description: "Find the right help through 112 or 767.",
    href: destinations.emergency,
    path: "M22 16.9v3a2 2 0 0 1-2.18 2A19.8 19.8 0 0 1 3.1 5.18 2 2 0 0 1 5.1 3h3a2 2 0 0 1 2 1.72l.46 3.2a2 2 0 0 1-.57 1.7L8.6 11a16 16 0 0 0 4.4 4.4l1.38-1.39a2 2 0 0 1 1.7-.57l3.2.46A2 2 0 0 1 22 16.9Z",
  },
  {
    title: "Before you call",
    description: "Know the details your call agent needs.",
    href: destinations.beforeYouCall,
    path: "M9 5H5v16h14V5h-4M9 3h6v4H9zM8 12h8M8 16h5",
  },
  {
    title: "Stay informed. Stay safe.",
    description: "Read safety guidance and useful resources.",
    href: destinations.safety,
    path: "m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6l8-3ZM8 12l3 3 5-6",
  },
] as const;

export function HomeServiceLinks() {
  return (
    <nav
      aria-label="Essential services"
      className="border-b border-border bg-white"
    >
      <div className="editorial-container grid md:grid-cols-3">
        {services.map((service) => (
          <Link
            key={service.href}
            href={service.href}
            className="group flex items-start gap-4 border-b border-border py-6 transition-colors last:border-0 hover:bg-paper md:border-b-0 md:border-r md:px-6 md:py-8 md:first:pl-0 md:last:pr-0"
          >
            <svg
              aria-hidden="true"
              className="mt-1 size-7 shrink-0 text-blue"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d={service.path} />
            </svg>
            <div className="flex-1">
              <p className="text-sm font-bold text-navy sm:text-base">
                {service.title}
              </p>
              <p className="mt-2 max-w-64 text-xs leading-6 text-muted sm:text-sm">
                {service.description}
              </p>
            </div>
            <span
              aria-hidden="true"
              className="mt-1 text-blue transition-transform group-hover:translate-x-1 motion-reduce:transform-none"
            >
              →
            </span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
