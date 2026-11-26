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
    <div className="flex w-full flex-col items-stretch justify-between gap-6 sm:flex-row sm:items-center">
      <div className="flex flex-col items-start gap-1 text-left">
        <h1 className="font-display text-[24px] font-extrabold text-admin-ink">{title}</h1>
        <p className="text-sm text-admin-muted">{description}</p>
      </div>
      {children ? <div className="flex flex-wrap gap-3">{children}</div> : <div />}
    </div>
  );
}
