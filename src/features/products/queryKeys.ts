export const productKeys = {
  all: ["products"] as const,
  list: () => [...productKeys.all, "list"] as const,
  featured: () => [...productKeys.all, "featured"] as const,
  detail: (id: string) => [...productKeys.all, "detail", id] as const,
  byIds: (ids: string[]) => [...productKeys.all, "byIds", [...ids].sort()] as const,
  adminList: () => [...productKeys.all, "admin-list"] as const,
  adminPage: (search: string, page: number) =>
    [...productKeys.adminList(), { search, page }] as const,
  stockSummary: () => [...productKeys.all, "stock-summary"] as const,
};

export const categoryKeys = {
  all: ["categories"] as const,
  list: () => [...categoryKeys.all, "list"] as const,
  counts: () => [...categoryKeys.all, "counts"] as const,
  withCounts: () => [...categoryKeys.all, "with-counts"] as const,
};

export const reviewKeys = {
  all: ["reviews"] as const,
  byProduct: (productId: string) => [...reviewKeys.all, "byProduct", productId] as const,
};
