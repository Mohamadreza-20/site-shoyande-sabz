import { useMemo, useState } from "react";

const DISCOUNTS_PAGE_SIZE = 10;

export function useDiscountsPagination<T>(items: T[], pageSize = DISCOUNTS_PAGE_SIZE) {
  const [requestedPage, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const page = Math.min(requestedPage, totalPages);

  const pageItems = useMemo(
    () => items.slice((page - 1) * pageSize, page * pageSize),
    [items, page, pageSize]
  );

  return { page, totalPages, pageItems, setPage };
}
