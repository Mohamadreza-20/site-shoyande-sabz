<<<<<<< HEAD
import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
=======
import { Skeleton, getSkeletonIds } from "@/components/ui/Skeleton";

export default function Loading() {
  const itemIds = getSkeletonIds(4);
>>>>>>> origin/main
  return (
    <div className="flex min-h-screen w-full flex-col gap-6 bg-brand-50 px-4 py-8 sm:px-8">
      <Skeleton className="h-10 w-40" />
      <div className="flex w-full flex-col gap-8 lg:flex-row">
        <div className="flex w-full flex-col gap-3">
<<<<<<< HEAD
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-28 w-full rounded-2xl" />
=======
          {itemIds.map((id) => (
            <Skeleton key={id} className="h-28 w-full rounded-2xl" />
>>>>>>> origin/main
          ))}
        </div>
        <Skeleton className="h-64 w-full rounded-2xl lg:w-80" />
      </div>
    </div>
  );
}
