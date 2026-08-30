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
  );
}
