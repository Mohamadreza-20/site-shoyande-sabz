import { AdminSkeleton, getSkeletonIds } from "@/components/ui/Skeleton";

export default function Loading() {
  const fieldIds = getSkeletonIds(4);
  return (
    <div className="flex w-full flex-col gap-6 bg-admin-bg p-6">
      <AdminSkeleton className="h-10 w-48" />
      <div className="flex w-full max-w-3xl flex-col gap-4 rounded-2xl border border-admin-line bg-admin-surface p-6">
        {fieldIds.map((id) => (
          <AdminSkeleton key={id} className="h-11 w-full" />
        ))}
        <AdminSkeleton className="h-48 w-full" />
        <AdminSkeleton className="h-11 w-32" />
      </div>
    </div>
  );
}
