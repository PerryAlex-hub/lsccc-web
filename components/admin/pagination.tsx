"use client";

import { AdminButton } from "./ui";

type AdminPaginationProps = {
  page: number;
  pageCount: number;
  total: number;
  start: number;
  end: number;
  onPageChange: (page: number) => void;
  label: string;
};

export function AdminPagination({
  page,
  pageCount,
  total,
  start,
  end,
  onPageChange,
  label,
}: AdminPaginationProps) {
  const pages = Array.from(new Set([1, page - 1, page, page + 1, pageCount]))
    .filter((number) => number >= 1 && number <= pageCount)
    .sort((a, b) => a - b);

  return (
    <div className="flex flex-col gap-3 border-t border-border px-5 py-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
      <p
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="text-xs text-muted"
      >
        {total === 0
          ? `0 ${label}`
          : `Showing ${start}–${end} of ${total} ${label}`}
      </p>
      {pageCount > 1 && (
        <nav
          aria-label={`${label} pagination`}
          className="flex flex-wrap items-center justify-between gap-2 sm:justify-start"
        >
          <AdminButton
            variant="secondary"
            disabled={page === 1}
            onClick={() => onPageChange(page - 1)}
            aria-label={`Previous page of ${label}`}
          >
            Previous
          </AdminButton>
          <span className="text-xs text-muted sm:sr-only">
            Page {page} of {pageCount}
          </span>
          <div className="hidden items-center gap-1 sm:flex">
            {pages.map((number, index) => (
              <span key={number} className="flex items-center gap-1">
                {index > 0 && number - pages[index - 1] > 1 && (
                  <span aria-hidden="true" className="px-1 text-muted">
                    …
                  </span>
                )}
                <button
                  type="button"
                  aria-label={`Page ${number} of ${label}`}
                  aria-current={number === page ? "page" : undefined}
                  onClick={() => onPageChange(number)}
                  className={`min-h-11 min-w-11 rounded-md border px-3 text-sm font-semibold ${number === page ? "border-navy bg-navy text-white" : "border-border bg-white text-navy hover:border-blue"}`}
                >
                  {number}
                </button>
              </span>
            ))}
          </div>
          <AdminButton
            variant="secondary"
            disabled={page === pageCount}
            onClick={() => onPageChange(page + 1)}
            aria-label={`Next page of ${label}`}
          >
            Next
          </AdminButton>
        </nav>
      )}
    </div>
  );
}
