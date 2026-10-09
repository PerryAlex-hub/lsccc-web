const paths = {
  overview: "M3 3h7v7H3z M14 3h7v7h-7z M3 14h7v7H3z M14 14h7v7h-7z",
  news: "M4 3h16v18H4z M8 7h8 M8 11h8 M8 15h5",
  notice: "M4 10v5l5 2V8l-5 2z M9 8l11-4v17L9 17 M6 16l1 5h3",
  shield: "M12 3l8 3v6c0 5-8 9-8 9s-8-4-8-9V6l8-3z M8 12l3 3 5-6",
  pages: "M7 3h10l4 4v14H7z M17 3v5h4 M3 7v14 M11 12h6 M11 16h6",
  image: "M3 3h18v18H3z M3 17l6-6 4 4 3-3 5 5 M7 7h.01",
  settings:
    "M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8 M9 3h6l1 3 3 1 2 5-2 5-3 1-1 3H9l-1-3-3-1-2-5 2-5 3-1 1-3z",
  arrow: "M7 17L17 7 M7 7h10v10",
  menu: "M3 6h18 M3 12h18 M3 18h18",
  close: "M6 6l12 12 M6 18L18 6",
  plus: "M12 4v16 M4 12h16",
  search: "M10 3a7 7 0 1 0 0 14 7 7 0 0 0 0-14 M15 15l6 6",
} as const;

export function AdminIcon({
  name,
  className = "size-5",
}: {
  name: keyof typeof paths;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d={paths[name]} />
    </svg>
  );
}
