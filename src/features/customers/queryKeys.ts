export const customerKeys = {
  all: ["customers"] as const,
  list: () => [...customerKeys.all, "list"] as const,
  detail: (id: string) => [...customerKeys.all, "detail", id] as const,
  adminList: () => [...customerKeys.all, "admin-list"] as const,
  adminPage: (search: string, page: number) =>
    [...customerKeys.adminList(), { search, page }] as const,
};
