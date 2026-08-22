export const productStatusStyles: Record<
  "inStock" | "lowStock" | "outOfStock",
  { label: string; text: string; bg: string; border: string }
> = {
  inStock: {
    label: "موجود",
    text: "text-admin-success",
    bg: "bg-admin-success-bg",
    border: "border-admin-success",
  },
  lowStock: {
    label: "رو به اتمام",
    text: "text-admin-warning",
    bg: "bg-admin-warning-bg",
    border: "border-admin-warning",
  },
  outOfStock: {
    label: "ناموجود",
    text: "text-admin-danger",
    bg: "bg-admin-danger-bg",
    border: "border-admin-danger",
  },
};
