import { AdminSkeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <>
      <AdminSkeleton className="h-10 w-48" />
      <div className="flex w-full max-w-2xl flex-col gap-4 rounded-2xl border border-admin-line bg-admin-surface p-6">
        {Array.from({ length: 5 }).map((_, index) => (
          <AdminSkeleton key={index} className="h-11 w-full" />
        ))}
        <AdminSkeleton className="h-11 w-32" />
      </div>
    </>
  );
}
