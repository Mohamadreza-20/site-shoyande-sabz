import { Skeleton, getSkeletonIds } from "@/components/ui/Skeleton";

export default function Loading() {
  const statIds = getSkeletonIds(4);
  const cardIds = getSkeletonIds(8);
  return (
    <div className="flex min-h-screen w-full flex-col gap-10 bg-brand-50 px-4 py-8 sm:px-8">
      <Skeleton className="h-16 w-full rounded-2xl" />
      <Skeleton className="h-[360px] w-full rounded-[28px]" />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {statIds.map((id) => (
          <Skeleton key={id} className="h-24 w-full" />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {cardIds.map((id) => (
          <Skeleton key={id} className="h-56 w-full" />
        ))}
      </div>
    </div>
  );
}
