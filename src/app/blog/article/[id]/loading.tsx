<<<<<<< HEAD
import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
=======
import { Skeleton, getSkeletonIds } from "@/components/ui/Skeleton";

export default function Loading() {
  const lineIds = getSkeletonIds(6);
>>>>>>> origin/main
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-3xl flex-col gap-6 bg-brand-50 px-4 py-8 sm:px-8">
      <Skeleton className="h-8 w-2/3" />
      <Skeleton className="h-4 w-1/3" />
      <Skeleton className="h-[320px] w-full rounded-[28px]" />
      <div className="flex flex-col gap-3">
<<<<<<< HEAD
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} className="h-4 w-full" />
=======
        {lineIds.map((id) => (
          <Skeleton key={id} className="h-4 w-full" />
>>>>>>> origin/main
        ))}
      </div>
    </div>
  );
}
