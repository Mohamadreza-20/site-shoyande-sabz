<<<<<<< HEAD
import { AdminSkeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <>
      <AdminSkeleton className="h-10 w-48" />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <AdminSkeleton key={index} className="h-40 w-full rounded-2xl" />
        ))}
      </div>
    </>
=======
import { AdminSkeleton, getSkeletonIds } from "@/components/ui/Skeleton";

export default function Loading() {
  const cardIds = getSkeletonIds(8);
  return (
    <div className="flex w-full flex-col gap-6 bg-admin-bg p-6">
      <AdminSkeleton className="h-10 w-48" />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {cardIds.map((id) => (
          <AdminSkeleton key={id} className="h-40 w-full rounded-2xl" />
        ))}
      </div>
    </div>
>>>>>>> origin/main
  );
}
