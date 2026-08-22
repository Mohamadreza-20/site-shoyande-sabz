type SkeletonProps = {
  className?: string;
};

function makeStableIds(count: number) {
  return Array.from({ length: count }, () =>
    typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2)
  );
}

export function getSkeletonIds(count: number) {
  return makeStableIds(count);
}

export function Skeleton({ className = "" }: SkeletonProps) {
  return <div className={`animate-pulse rounded-xl bg-brand-100 ${className}`} />;
}

export function AdminSkeleton({ className = "" }: SkeletonProps) {
  return <div className={`animate-pulse rounded-xl bg-admin-line/60 ${className}`} />;
}

export function SkeletonCard() {
  return (
    <div className="flex w-full flex-col gap-3 rounded-[20px] border border-brand-200 bg-white p-4">
      <Skeleton className="h-40 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-9 w-full rounded-full" />
    </div>
  );
}

export function SkeletonGrid({ count = 6 }: { count?: number }) {
  const ids = makeStableIds(count);
  return (
    <div className="grid w-full grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {ids.map((id) => (
        <SkeletonCard key={id} />
      ))}
    </div>
  );
}

export function AdminTableSkeleton({ rows = 8 }: { rows?: number }) {
  const ids = makeStableIds(rows);
  return (
    <div className="flex w-full flex-col gap-3 rounded-2xl border border-admin-line bg-admin-surface p-5">
      <AdminSkeleton className="h-6 w-40" />
      <div className="flex flex-col gap-2.5 pt-2">
        {ids.map((id) => (
          <AdminSkeleton key={id} className="h-11 w-full" />
        ))}
      </div>
    </div>
  );
}
