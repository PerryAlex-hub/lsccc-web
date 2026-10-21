"use client";

import { useState } from "react";
import { paginateItems } from "./pagination";

export function usePagination<T>(
  items: readonly T[],
  filterKey = "",
  pageSize = 10,
) {
  const [selection, setSelection] = useState({ filterKey, page: 1 });
  const requestedPage = selection.filterKey === filterKey ? selection.page : 1;
  const pagination = paginateItems(items, requestedPage, pageSize);

  // Reset changed filters and keep the selected page valid after deletions.
  if (selection.filterKey !== filterKey || selection.page !== pagination.page) {
    setSelection({ filterKey, page: pagination.page });
  }

  return {
    ...pagination,
    onPageChange: (page: number) => setSelection({ filterKey, page }),
  };
}
