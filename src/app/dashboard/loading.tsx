<<<<<<< HEAD
import { AdminSkeleton, AdminTableSkeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <>
      <AdminSkeleton className="h-10 w-56" />
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <AdminSkeleton key={index} className="h-24 w-full rounded-2xl" />
=======
import { AdminSkeleton, AdminTableSkeleton, getSkeletonIds } from "@/components/ui/Skeleton";

export default function Loading() {
  const statIds = getSkeletonIds(4);
  return (
    <div className="flex w-full flex-col gap-6 bg-admin-bg p-6">
      <AdminSkeleton className="h-10 w-56" />
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {statIds.map((id) => (
          <AdminSkeleton key={id} className="h-24 w-full rounded-2xl" />
>>>>>>> origin/main
        ))}
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <AdminSkeleton className="h-72 w-full rounded-2xl" />
        <AdminSkeleton className="h-72 w-full rounded-2xl" />
      </div>
      <AdminTableSkeleton rows={5} />
<<<<<<< HEAD
    </>
=======
    </div>
>>>>>>> origin/main
  );
}
