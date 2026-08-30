import { AdminSkeleton, AdminTableSkeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
<<<<<<< HEAD
    <>
      <AdminSkeleton className="h-10 w-48" />
      <AdminTableSkeleton rows={8} />
    </>
=======
    <div className="flex w-full flex-col gap-6 bg-admin-bg p-6">
      <AdminSkeleton className="h-10 w-48" />
      <AdminTableSkeleton rows={8} />
    </div>
>>>>>>> origin/main
  );
}
