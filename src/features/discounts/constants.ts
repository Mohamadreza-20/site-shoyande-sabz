export const discountStatusStyles: Record<
  "active" | "expired" | "scheduled",
  { label: string; text: string; bg: string; border: string }
> = {
  active: {
    label: "Active",
    text: "text-admin-success",
    bg: "bg-admin-success-bg",
    border: "border-admin-success",
  },
  scheduled: {
    label: "Scheduled",
    text: "text-admin-warning",
    bg: "bg-admin-warning-bg",
    border: "border-admin-warning",
  },
  expired: {
    label: "Expired",
    text: "text-admin-danger",
    bg: "bg-admin-danger-bg",
    border: "border-admin-danger",
  },
};
