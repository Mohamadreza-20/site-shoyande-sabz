export const messageStatusStyles: Record<
  "pending" | "answered",
  { label: string; text: string; bg: string; border: string }
> = {
  pending: {
    label: "Awaiting reply",
    text: "text-admin-warning",
    bg: "bg-admin-warning-bg",
    border: "border-admin-warning",
  },
  answered: {
    label: "Answered",
    text: "text-admin-success",
    bg: "bg-admin-success-bg",
    border: "border-admin-success",
  },
};
