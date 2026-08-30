import type { ReactNode } from "react";

export default function PageHeader({
  title,
  description,
  children,
}: {
  title: string;
  description: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="flex w-full flex-col-reverse items-stretch justify-between gap-6 sm:flex-row sm:items-center">
      {children ? (
        <div className="flex flex-wrap gap-3">{children}</div>
      ) : (
        <div />
      )}
      <div className="flex flex-col items-end gap-1 text-right">
        <p className="text-[22px] font-bold text-admin-ink">{title}</p>
        <p className="text-sm text-admin-muted">{description}</p>
      </div>
    </div>
  );
}
