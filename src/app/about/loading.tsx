import { Skeleton, getSkeletonIds } from "@/components/ui/Skeleton";

export default function Loading() {
  const lineIds = getSkeletonIds(5);
  return (
    <div className="flex min-h-screen w-full flex-col gap-6 bg-brand-50 px-4 py-8 sm:px-8">
      <Skeleton className="h-10 w-40" />
      <Skeleton className="h-[300px] w-full rounded-[28px]" />
      <div className="flex flex-col gap-3">
        {lineIds.map((id) => (
          <Skeleton key={id} className="h-4 w-full" />
        ))}
      </div>
    </div>
  );
}
