export const discountStatusStyles: Record<
  "active" | "expired" | "scheduled",
  { label: string; text: string; bg: string; border: string }
> = {
  active: {
    label: "فعال",
    text: "text-admin-success",
    bg: "bg-admin-success-bg",
    border: "border-admin-success",
  },
  scheduled: {
    label: "زمان‌بندی‌شده",
    text: "text-admin-warning",
    bg: "bg-admin-warning-bg",
    border: "border-admin-warning",
  },
  expired: {
    label: "منقضی‌شده",
    text: "text-admin-danger",
    bg: "bg-admin-danger-bg",
    border: "border-admin-danger",
  },
};
