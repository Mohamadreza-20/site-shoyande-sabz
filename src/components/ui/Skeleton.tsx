type SkeletonProps = {
  className?: string;
};

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
  return (
    <div className="grid w-full grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
}

export function AdminTableSkeleton({ rows = 8 }: { rows?: number }) {
  return (
    <div className="flex w-full flex-col gap-3 rounded-2xl border border-admin-line bg-admin-surface p-5">
      <AdminSkeleton className="h-6 w-40" />
      <div className="flex flex-col gap-2.5 pt-2">
        {Array.from({ length: rows }).map((_, index) => (
          <AdminSkeleton key={index} className="h-11 w-full" />
        ))}
      </div>
    </div>
  );
}
