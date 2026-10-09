"use client";

import Image from "next/image";
import { useAdminState } from "@/lib/admin/store";

export function MediaPicker({ onSelect }: { onSelect: (id: string) => void }) {
  const state = useAdminState();
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
      {state.media.map((image) => (
        <button
          key={image.id}
          type="button"
          onClick={() => onSelect(image.id)}
          aria-label={`Select image: ${image.alt}`}
          className="group overflow-hidden rounded-md border border-border text-left hover:border-blue"
        >
          <Image
            src={image.url}
            alt={image.alt}
            width={240}
            height={150}
            unoptimized
            className="aspect-[8/5] w-full object-cover"
          />
          <span className="block truncate p-3 text-xs font-semibold text-navy group-hover:underline">
            {image.name}
          </span>
        </button>
      ))}
      {state.media.length === 0 && (
        <p className="col-span-full text-sm text-muted">
          Upload an image in the media library first.
        </p>
      )}
    </div>
  );
}
