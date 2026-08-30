import { AdminSkeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <>
      <AdminSkeleton className="h-10 w-48" />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <AdminSkeleton className="h-80 w-full rounded-2xl" />
        <AdminSkeleton className="h-80 w-full rounded-2xl" />
      </div>
    </>
  );
}
