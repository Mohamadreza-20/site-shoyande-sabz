export const orderKeys = {
  all: ["orders"] as const,
  list: () => [...orderKeys.all, "list"] as const,
  latest: (limit: number) => [...orderKeys.all, "latest", limit] as const,
  byCustomer: (customerId: string) => [...orderKeys.all, "byCustomer", customerId] as const,
};
