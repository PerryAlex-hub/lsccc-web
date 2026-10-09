import { ActionLink } from "@/components/ui/text-link";
import { destinations } from "@/lib/navigation";

export default function NotFound() {
  return (
    <div className="site-container section-space space-y-6">
      <p className="text-eyebrow font-bold text-navy">PAGE NOT FOUND</p>
      <h1 className="text-page font-bold">We couldn’t find that page.</h1>
      <p className="text-muted">
        Return to the homepage or browse the latest centre updates.
      </p>
      <div className="flex flex-wrap gap-4">
        <ActionLink href="/" className="bg-navy text-white">
          Go to homepage →
        </ActionLink>
        <ActionLink
          href={destinations.news}
          className="border border-border text-navy"
        >
          News &amp; Media →
        </ActionLink>
      </div>
    </div>
  );
}
