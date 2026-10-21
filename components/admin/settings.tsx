"use client";

import Image from "next/image";
import { useState } from "react";
import { assets } from "@/lib/assets";
import { useAdminState, useContentCommand } from "@/lib/admin/queries/content";
import type { AdminSettings } from "@/lib/admin/types";
import { AdminButton, AdminFeedback, AdminField, AdminHeading } from "./ui";

export function AdminSettingsPage() {
  const state = useAdminState();
  const [feedback, setFeedback] = useState({ message: "", error: false });
  const saveMutation = useContentCommand();

  async function save(settings: AdminSettings) {
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
    try {
      const result = await saveMutation.mutateAsync({
        collection: "settings",
        operation: "save",
        value: settings,
      });
      setFeedback({ message: result.message, error: false });
    } catch (error) {
      setFeedback({
        message:
          error instanceof Error
            ? error.message
            : "Could not save settings. Try again.",
        error: true,
      });
    }
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
          saving={saveMutation.isPending}
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
    </>
  );
}

function SettingsForm({
  settings,
  onSave,
  feedback,
  saving,
}: {
  settings: AdminSettings;
  onSave: (settings: AdminSettings) => void;
  feedback: { message: string; error: boolean };
  saving: boolean;
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
        hint="Leave blank until the approved centre inbox is confirmed. Email delivery is configured separately."
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
      {feedback.message && <AdminFeedback {...feedback} />}
      <AdminButton type="submit" loading={saving} loadingLabel="Saving…">
        Save settings
      </AdminButton>
    </form>
  );
}
