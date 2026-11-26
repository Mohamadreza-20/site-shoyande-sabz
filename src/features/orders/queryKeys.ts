export const orderKeys = {
  all: ["orders"] as const,
  list: () => [...orderKeys.all, "list"] as const,
  byCustomer: (customerId: string) => [...orderKeys.all, "byCustomer", customerId] as const,
};
