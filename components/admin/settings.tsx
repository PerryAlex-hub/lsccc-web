"use client";

import Image from "next/image";
import { useState } from "react";
import { assets } from "@/lib/assets";
import {
  resetAdminState,
  updateAdminState,
  useAdminState,
} from "@/lib/admin/store";
import type { AdminSettings } from "@/lib/admin/types";
import { AdminButton, AdminFeedback, AdminField, AdminHeading } from "./ui";
import { AdminDialog } from "./dialog";

export function AdminSettingsPage() {
  const state = useAdminState();
  const [reset, setReset] = useState(false);
  const [feedback, setFeedback] = useState({ message: "", error: false });

  function save(settings: AdminSettings) {
    if (
      !settings.siteName.trim() ||
      !settings.description.trim() ||
      !settings.address.trim()
    ) {
      setFeedback({
        message: "Add the site name, description and centre address.",
        error: true,
      });
      return;
    }
    if (
      settings.enquiryEmail &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(settings.enquiryEmail)
    ) {
      setFeedback({
        message:
          "Enter a valid enquiry email address, or leave it blank for now.",
        error: true,
      });
      return;
    }
    const result = updateAdminState(
      (current) => ({ ...current, settings }),
      "Updated website settings",
    );
    setFeedback({ message: result.message, error: !result.ok });
  }

  return (
    <>
      <AdminHeading
        title="Website settings"
        description="Prepare the centre’s identity, contact details and website description."
      />
      <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <SettingsForm
          key={JSON.stringify(state.settings)}
          settings={state.settings}
          onSave={save}
          feedback={feedback}
        />
        <div className="space-y-6">
          <section className="rounded-lg border border-border bg-white p-6">
            <h2 className="text-lg font-bold text-navy">Centre identity</h2>
            <Image
              src={assets.lscccEmblem.image}
              alt={assets.lscccEmblem.alt}
              width={88}
              height={88}
              className="my-5 size-[88px] rounded-full object-cover"
            />
            <p className="text-sm font-semibold text-navy">
              Lagos State Command &amp; Control Centre
            </p>
            <p className="mt-3 text-xs leading-6 text-muted">
              Used in the admin workspace, public footer and browser icon.
            </p>
          </section>
          <section className="space-y-3 rounded-lg bg-navy p-6 text-white">
            <p className="text-eyebrow font-bold text-gold">
              EMERGENCY INFORMATION
            </p>
            <p className="text-[32px] font-bold">112 / 767</p>
            <p className="text-sm leading-6 text-white/80">
              The public website uses the centre’s published emergency lines.
            </p>
          </section>
        </div>
      </div>
      <section className="mt-8 flex flex-col justify-between gap-5 rounded-lg border border-border bg-white p-6 sm:flex-row sm:items-center">
        <div>
          <h2 className="font-bold text-navy">Reset the preview workspace</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
            Remove your browser-only changes and restore the original review
            content.
          </p>
        </div>
        <AdminButton variant="secondary" onClick={() => setReset(true)}>
          Reset preview
        </AdminButton>
      </section>
      <AdminDialog
        open={reset}
        onClose={() => setReset(false)}
        title="Reset this workspace?"
      >
        <p className="text-sm leading-6 text-muted">
          Your preview articles, uploaded images and other local changes will be
          replaced with the original review content. The live website is
          unchanged.
        </p>
        <div className="mt-6 flex flex-wrap justify-end gap-3">
          <AdminButton variant="secondary" onClick={() => setReset(false)}>
            Cancel
          </AdminButton>
          <AdminButton
            variant="danger"
            onClick={() => {
              const ok = resetAdminState();
              setFeedback({
                message: ok
                  ? "Preview workspace reset."
                  : "Could not reset browser storage.",
                error: !ok,
              });
              if (ok) {
                setReset(false);
              }
            }}
          >
            Reset workspace
          </AdminButton>
        </div>
      </AdminDialog>
    </>
  );
}

function SettingsForm({
  settings,
  onSave,
  feedback,
}: {
  settings: AdminSettings;
  onSave: (settings: AdminSettings) => void;
  feedback: { message: string; error: boolean };
}) {
  const [form, setForm] = useState(settings);
  return (
    <form
      className="space-y-6 rounded-lg border border-border bg-white p-5 sm:p-7"
      onSubmit={(event) => {
        event.preventDefault();
        onSave(form);
      }}
    >
      <h2 className="text-lg font-bold text-navy">General information</h2>
      <AdminField label="Site name">
        <input
          className="admin-input"
          value={form.siteName}
          onChange={(event) =>
            setForm({ ...form, siteName: event.target.value })
          }
        />
      </AdminField>
      <AdminField
        label="Website description"
        hint="A short description for the homepage and search results."
      >
        <textarea
          className="admin-input min-h-28"
          value={form.description}
          onChange={(event) =>
            setForm({ ...form, description: event.target.value })
          }
        />
      </AdminField>
      <AdminField label="Centre address">
        <textarea
          className="admin-input min-h-28"
          value={form.address}
          onChange={(event) =>
            setForm({ ...form, address: event.target.value })
          }
        />
      </AdminField>
      <AdminField
        label="Enquiry email (optional)"
        hint="Leave blank until the approved centre inbox is confirmed. This preview does not configure email delivery."
      >
        <input
          type="email"
          className="admin-input"
          value={form.enquiryEmail}
          placeholder="Not configured"
          onChange={(event) =>
            setForm({ ...form, enquiryEmail: event.target.value })
          }
        />
      </AdminField>
      <AdminFeedback {...feedback} />
      <AdminButton type="submit">Save settings preview</AdminButton>
    </form>
  );
}
