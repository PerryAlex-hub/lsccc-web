type NewsPaginationProps = {
  page: number;
  pages: number;
  onChange: (page: number) => void;
};

export function NewsPagination({ page, pages, onChange }: NewsPaginationProps) {
  if (pages <= 1) {
    return null;
  }

  return (
    <nav
      aria-label="News pagination"
      className="mt-10 flex flex-wrap items-center justify-center gap-2 border-t border-border pt-8 text-sm font-bold text-navy"
    >
      <button
        type="button"
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
        className="motion-control min-h-11 border border-border px-3 hover:bg-paper disabled:cursor-default disabled:opacity-40 sm:px-5"
      >
        <span aria-hidden="true">← </span> Previous
      </button>
      {Array.from({ length: pages }, (_, index) => index + 1).map((number) => (
        <button
          key={number}
          type="button"
          aria-label={`Page ${number}`}
          aria-current={number === page ? "page" : undefined}
          onClick={() => onChange(number)}
          className={`motion-control size-11 border ${number === page ? "border-navy bg-navy text-white" : "border-border hover:bg-paper"}`}
        >
          {number}
        </button>
      ))}
      <button
        type="button"
        disabled={page === pages}
        onClick={() => onChange(page + 1)}
        className="motion-control min-h-11 border border-border px-3 hover:bg-paper disabled:cursor-default disabled:opacity-40 sm:px-5"
      >
        Next <span aria-hidden="true">→</span>
      </button>
    </nav>
  );
}
