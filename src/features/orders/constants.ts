export const orderStatusStyles: Record<
  "shipped" | "processing" | "delivered" | "cancelled",
  { label: string; text: string; bg: string; border: string }
> = {
  shipped: {
    label: "ارسال شده",
    text: "text-admin-success",
    bg: "bg-admin-success-bg",
    border: "border-admin-success",
  },
  processing: {
    label: "در حال پردازش",
    text: "text-admin-warning",
    bg: "bg-admin-warning-bg",
    border: "border-admin-warning",
  },
  delivered: {
    label: "تحویل شده",
    text: "text-admin-success",
    bg: "bg-admin-success-bg",
    border: "border-admin-success",
  },
  cancelled: {
    label: "لغو شده",
    text: "text-admin-danger",
    bg: "bg-admin-danger-bg",
    border: "border-admin-danger",
  },
};
