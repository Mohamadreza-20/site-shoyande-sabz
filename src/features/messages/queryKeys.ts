export const messageKeys = {
  all: ["messages"] as const,
  list: () => [...messageKeys.all, "list"] as const,
  byUser: (userId: string) => [...messageKeys.all, "byUser", userId] as const,
};
