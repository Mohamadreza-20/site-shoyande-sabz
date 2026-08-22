export const articleKeys = {
  all: ["articles"] as const,
  list: () => [...articleKeys.all, "list"] as const,
};
