import { AdminSkeleton, AdminTableSkeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <>
      <AdminSkeleton className="h-10 w-48" />
      <AdminTableSkeleton rows={6} />
    </>
  );
}
