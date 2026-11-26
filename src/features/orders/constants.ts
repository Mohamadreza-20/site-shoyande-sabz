export const orderStatusStyles: Record<
  "shipped" | "processing" | "delivered" | "cancelled",
  { label: string; text: string; bg: string; border: string }
> = {
  shipped: {
    label: "Shipped",
    text: "text-admin-success",
    bg: "bg-admin-success-bg",
    border: "border-admin-success",
  },
  processing: {
    label: "Processing",
    text: "text-admin-warning",
    bg: "bg-admin-warning-bg",
    border: "border-admin-warning",
  },
  delivered: {
    label: "Delivered",
    text: "text-admin-success",
    bg: "bg-admin-success-bg",
    border: "border-admin-success",
  },
  cancelled: {
    label: "Cancelled",
    text: "text-admin-danger",
    bg: "bg-admin-danger-bg",
    border: "border-admin-danger",
  },
};
