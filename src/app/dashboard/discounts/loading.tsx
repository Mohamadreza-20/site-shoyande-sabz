import { AdminSkeleton, AdminTableSkeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="flex w-full flex-col gap-6 bg-admin-bg p-6">
      <AdminSkeleton className="h-10 w-48" />
      <AdminTableSkeleton rows={6} />
    </div>
  );
}
