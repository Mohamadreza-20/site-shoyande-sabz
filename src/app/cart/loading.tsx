import { Skeleton, getSkeletonIds } from "@/components/ui/Skeleton";

export default function Loading() {
  const itemIds = getSkeletonIds(4);
  return (
    <div className="flex min-h-screen w-full flex-col gap-6 bg-brand-50 px-4 py-8 sm:px-8">
      <Skeleton className="h-10 w-40" />
      <div className="flex w-full flex-col gap-8 lg:flex-row">
        <div className="flex w-full flex-col gap-3">
          {itemIds.map((id) => (
            <Skeleton key={id} className="h-28 w-full rounded-2xl" />
          ))}
        </div>
        <Skeleton className="h-64 w-full rounded-2xl lg:w-80" />
      </div>
    </div>
  );
}
