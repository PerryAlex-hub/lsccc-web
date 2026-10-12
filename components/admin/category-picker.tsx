"use client";

import { useEffect, useRef, useState } from "react";
import { categoryError, getAdminCategories } from "@/lib/admin/categories";
import { updateAdminState, useAdminState } from "@/lib/admin/store";
import { AdminButton, AdminFeedback, AdminField } from "./ui";

export function CategoryPicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const state = useAdminState();
  const categories = getAdminCategories(state);
  const [adding, setAdding] = useState(false);
  const [name, setName] = useState("");
  const [feedback, setFeedback] = useState({ message: "", error: false });
  const trigger = useRef<HTMLButtonElement>(null);
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (adding) {
      input.current?.focus();
    }
  }, [adding]);

  function close() {
    setAdding(false);
    setName("");
    trigger.current?.focus();
  }

  function create() {
    const category = name.trim().replace(/\s+/g, " ");
    const error = categoryError(category, categories);
    if (error) {
      setFeedback({ message: error, error: true });
      return;
    }
    const result = updateAdminState(
      (current) => ({
        ...current,
        categories: [...current.categories, category],
      }),
      `Created news category: ${category}`,
    );
    setFeedback({
      message: result.ok
        ? "Category created and selected. Saved in this browser only."
        : result.message,
      error: !result.ok,
    });
    if (result.ok) {
      onChange(category);
      close();
    }
  }

  return (
    <div className="space-y-3">
      <AdminField label="Category">
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="admin-input"
        >
          {categories.map((category) => (
            <option key={category}>{category}</option>
          ))}
        </select>
      </AdminField>
      <button
        ref={trigger}
        type="button"
        aria-expanded={adding}
        onClick={() => {
          setAdding(!adding);
          setFeedback({ message: "", error: false });
        }}
        className="min-h-11 text-xs font-bold text-blue hover:underline"
      >
        {adding ? "Cancel new category" : "Add category"}
      </button>
      {adding && (
        <div className="space-y-3 rounded-md border border-border bg-paper p-4">
          <AdminField label="New category name">
            <input
              ref={input}
              value={name}
              onChange={(event) => setName(event.target.value)}
              maxLength={60}
              className="admin-input"
              placeholder="e.g. Community updates"
              aria-invalid={feedback.error}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  create();
                } else if (event.key === "Escape") {
                  event.preventDefault();
                  close();
                }
              }}
            />
          </AdminField>
          <div className="flex flex-wrap gap-2">
            <AdminButton onClick={create}>Create category</AdminButton>
            <AdminButton variant="secondary" onClick={close}>
              Cancel
            </AdminButton>
          </div>
        </div>
      )}
      {feedback.message && <AdminFeedback {...feedback} />}
    </div>
  );
}
