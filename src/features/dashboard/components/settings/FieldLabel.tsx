import type { ReactNode } from "react";

export default function FieldLabel({ children }: { children: ReactNode }) {
  return <span className="text-sm font-semibold text-admin-ink">{children}</span>;
}
