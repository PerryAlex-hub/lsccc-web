"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { updateAdminState, useAdminState } from "@/lib/admin/store";
import type { AdminMedia } from "@/lib/admin/types";
import { matchesQuery } from "@/lib/search";
import { AdminButton, AdminFeedback, AdminField, AdminHeading } from "./ui";
import { AdminDialog } from "./dialog";
import { AdminIcon } from "./icons";

export function AdminMediaLibrary() {
  const state = useAdminState();
  const input = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<AdminMedia | null>(null);
  const [confirmRemove, setConfirmRemove] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [feedback, setFeedback] = useState({ message: "", error: false });
  const images = state.media.filter((image) =>
    matchesQuery(query, image.name, image.alt),
  );

  async function upload(file?: File) {
    if (!file) {
      return;
    }
    if (
      !["image/jpeg", "image/png", "image/webp"].includes(file.type) ||
      file.size > 2 * 1024 * 1024
    ) {
      setFeedback({
        message: "Choose a JPG, PNG or WebP image smaller than 2 MB.",
        error: true,
      });
      return;
    }
    setUploading(true);
    try {
      const url = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result));
        reader.onerror = () => reject(new Error("Image could not be read."));
        reader.readAsDataURL(file);
      });
      const image: AdminMedia = {
        id: crypto.randomUUID(),
        name: file.name,
        url,
        alt: file.name.replace(/\.[^.]+$/, "").replace(/[-_]/g, " "),
        size: `${Math.max(1, Math.round(file.size / 1024))} KB`,
      };
      const result = updateAdminState(
        (current) => ({ ...current, media: [image, ...current.media] }),
        `Uploaded image: ${file.name}`,
      );
      setFeedback({ message: result.message, error: !result.ok });
      if (result.ok) {
        setSelected(image);
      }
    } catch {
      setFeedback({
        message: "The image could not be read. Try another file.",
        error: true,
      });
    } finally {
      setUploading(false);
      if (input.current) {
        input.current.value = "";
      }
    }
  }

  function saveDetails() {
    if (!selected) {
      return;
    }
    if (!selected.name.trim() || !selected.alt.trim()) {
      setFeedback({
        message: "Add a name and descriptive alternative text for this image.",
        error: true,
      });
      return;
    }
    const result = updateAdminState(
      (current) => ({
        ...current,
        media: current.media.map((image) =>
          image.id === selected.id ? selected : image,
        ),
      }),
      `Updated image details: ${selected.name}`,
    );
    setFeedback({ message: result.message, error: !result.ok });
    if (result.ok) {
      setSelected(null);
    }
  }

  function remove() {
    if (!selected) {
      return;
    }
    if (state.articles.some((article) => article.coverId === selected.id)) {
      setFeedback({
        message:
          "This image is used by an article. Change or remove its cover image before deleting it.",
        error: true,
      });
      setConfirmRemove(false);
      return;
    }
    const result = updateAdminState(
      (current) => ({
        ...current,
        media: current.media.filter((image) => image.id !== selected.id),
      }),
      `Removed image: ${selected.name}`,
    );
    setFeedback({ message: result.message, error: !result.ok });
    if (result.ok) {
      setSelected(null);
      setConfirmRemove(false);
    }
  }

  return (
    <>
      <AdminHeading
        title="Media library"
        description="Organise photographs and keep image descriptions clear and accessible."
        actions={
          <AdminButton
            disabled={uploading}
            onClick={() => input.current?.click()}
          >
            <AdminIcon name="plus" />{" "}
            {uploading ? "Uploading…" : "Upload image"}
          </AdminButton>
        }
      />
      <input
        ref={input}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="sr-only"
        aria-label="Upload image file"
        onChange={(event) => void upload(event.target.files?.[0])}
      />
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <label className="min-w-0 sm:w-80">
          <span className="sr-only">Search media</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search images…"
            className="admin-input"
          />
        </label>
        <p className="text-xs text-muted">
          JPG, PNG or WebP · Up to 2 MB per image
        </p>
      </div>
      <div className="mb-4">
        <AdminFeedback {...feedback} />
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {images.map((image) => (
          <button
            key={image.id}
            type="button"
            onClick={() => {
              setSelected(image);
              setConfirmRemove(false);
              setFeedback({ message: "", error: false });
            }}
            className="group overflow-hidden rounded-lg border border-border bg-white text-left hover:border-blue"
          >
            <Image
              src={image.url}
              alt={image.alt}
              width={420}
              height={260}
              unoptimized
              className="aspect-[8/5] w-full object-cover"
            />
            <span className="block space-y-2 p-4">
              <span className="block truncate text-sm font-bold text-navy group-hover:underline">
                {image.name}
              </span>
              <span className="block text-xs text-muted">{image.size}</span>
            </span>
          </button>
        ))}
      </div>
      {images.length === 0 && (
        <div className="rounded-lg border border-border bg-white p-10 text-center">
          <h2 className="font-bold text-navy">No images found</h2>
          <p className="mt-3 text-sm text-muted">
            Try another search or upload a photograph.
          </p>
        </div>
      )}
      <p role="status" className="mt-5 text-xs text-muted">
        {images.length} {images.length === 1 ? "image" : "images"}
      </p>
      <AdminDialog
        open={Boolean(selected)}
        onClose={() => {
          setSelected(null);
          setConfirmRemove(false);
        }}
        title={confirmRemove ? "Remove this image?" : "Image details"}
      >
        {selected &&
          (confirmRemove ? (
            <div className="space-y-6">
              <p className="text-sm leading-6 text-muted">
                Remove “{selected.name}” from this browser’s media library?
              </p>
              <div className="flex flex-wrap justify-end gap-3">
                <AdminButton
                  variant="secondary"
                  onClick={() => setConfirmRemove(false)}
                >
                  Cancel
                </AdminButton>
                <AdminButton variant="danger" onClick={remove}>
                  Remove image
                </AdminButton>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              <Image
                src={selected.url}
                alt={selected.alt}
                width={720}
                height={450}
                unoptimized
                className="max-h-72 w-full rounded object-contain"
              />
              <AdminField label="Image name">
                <input
                  className="admin-input"
                  value={selected.name}
                  onChange={(event) =>
                    setSelected({ ...selected, name: event.target.value })
                  }
                />
              </AdminField>
              <AdminField
                label="Alternative text"
                hint="Describe what the photograph shows for people using screen readers."
              >
                <textarea
                  className="admin-input min-h-24"
                  value={selected.alt}
                  onChange={(event) =>
                    setSelected({ ...selected, alt: event.target.value })
                  }
                />
              </AdminField>
              <AdminFeedback {...feedback} />
              <div className="flex flex-wrap justify-between gap-3">
                <AdminButton
                  variant="secondary"
                  onClick={() => setConfirmRemove(true)}
                >
                  Remove image
                </AdminButton>
                <AdminButton onClick={saveDetails}>
                  Save image details
                </AdminButton>
              </div>
            </div>
          ))}
      </AdminDialog>
    </>
  );
}
