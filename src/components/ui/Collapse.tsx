import { cn } from "@/lib/cn";

const base =
  "grid transition-[grid-template-rows,opacity,visibility] duration-300 ease-out motion-reduce:transition-none";

export default function Collapse({
  open,
  children,
  className,
  id,
  role,
  labelledBy,
  alwaysOpenFromLg = false,
}: {
  open: boolean;
  children: React.ReactNode;
  className?: string;
  id?: string;
  role?: "region";
  labelledBy?: string;
  alwaysOpenFromLg?: boolean;
}) {
  const openClasses = "grid-rows-[1fr] opacity-100 visible";
  const closedClasses = alwaysOpenFromLg
    ? "max-lg:grid-rows-[0fr] max-lg:opacity-0 max-lg:invisible"
    : "grid-rows-[0fr] opacity-0 invisible";

  return (
    <div
      id={id}
      role={role}
      aria-labelledby={labelledBy}
      className={cn(base, open ? openClasses : closedClasses, className)}
    >
      <div className="min-h-0 overflow-hidden">{children}</div>
    </div>
  );
}
