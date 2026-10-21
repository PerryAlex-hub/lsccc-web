export function paginateItems<T>(
  items: readonly T[],
  requestedPage: number,
  pageSize: number,
) {
  const size = Math.max(1, Math.floor(pageSize) || 1);
  const total = items.length;
  const pageCount = Math.max(1, Math.ceil(total / size));
  const page = Math.min(pageCount, Math.max(1, Math.floor(requestedPage) || 1));
  const offset = (page - 1) * size;

  return {
    items: items.slice(offset, offset + size),
    total,
    page,
    pageCount,
    start: total === 0 ? 0 : offset + 1,
    end: Math.min(offset + size, total),
  };
}
