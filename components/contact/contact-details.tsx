import { getSiteSettings } from "@/lib/cms/public";
import { publicContact } from "@/lib/content/contact";
import { TextLink } from "@/components/ui/text-link";
import { destinations } from "@/lib/navigation";

export async function ContactDetails() {
  const settings = await getSiteSettings();

  return (
    <aside
      aria-labelledby="contact-details-title"
      className="min-w-0 border border-border bg-paper"
    >
      <div className="border-b border-border p-6 sm:p-8">
        <p className="mb-3 text-xs font-bold tracking-[0.14em] text-blue">
          CONTACT THE CENTRE
        </p>
        <h2
          id="contact-details-title"
          className="text-2xl font-bold leading-8 text-navy"
        >
          We’re here to help.
        </h2>
        <p className="mt-3 text-sm leading-7 text-muted">
          For general, media and partnership enquiries, use the form or email
          the centre directly.
        </p>
      </div>
      <dl className="divide-y divide-border px-6 sm:px-8">
        <div className="py-6">
          <dt className="text-xs font-bold tracking-wide text-navy">
            EMAIL ADDRESS
          </dt>
          <dd className="mt-3">
            <a
              href={`mailto:${publicContact.email}`}
              className="break-all text-sm font-semibold leading-7 text-blue underline-offset-4 hover:underline"
            >
              {publicContact.email}
            </a>
          </dd>
        </div>
        <div className="py-6">
          <dt className="text-xs font-bold tracking-wide text-navy">
            OUR LOCATION
          </dt>
          <dd className="mt-3">
            <address className="text-sm not-italic leading-7 text-muted">
              {settings.address}
            </address>
          </dd>
        </div>
        <div className="py-6">
          <dt className="text-xs font-bold tracking-wide text-navy">
            EMERGENCY ASSISTANCE · 24 HOURS
          </dt>
          <dd className="mt-3 flex items-center gap-3 text-3xl font-bold tabular-nums text-blue">
            <a href="tel:112">112</a>
            <span className="text-lg font-normal text-muted">/</span>
            <a href="tel:767">767</a>
          </dd>
        </div>
      </dl>
      <div className="space-y-3 border-t border-border bg-white p-6 sm:p-8">
        <h3 className="text-sm font-bold text-navy">Government feedback</h3>
        <p className="text-sm leading-7 text-muted">
          Send feedback about Lagos State public services through Citizens Gate.
        </p>
        <TextLink
          href={destinations.citizensGate}
          className="inline-block py-2 text-sm text-blue"
        >
          Open Citizens Gate <span aria-hidden="true">↗</span>
        </TextLink>
      </div>
    </aside>
  );
}
