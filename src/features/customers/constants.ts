export const customerStatusStyles: Record<
  "active" | "inactive",
  { label: string; text: string; bg: string; border: string }
> = {
  active: {
    label: "فعال",
    text: "text-admin-success",
    bg: "bg-admin-success-bg",
    border: "border-admin-success",
  },
  inactive: {
    label: "غیرفعال",
    text: "text-admin-muted",
    bg: "bg-admin-bg",
    border: "border-admin-line",
  },
};
