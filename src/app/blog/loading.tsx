import { Skeleton, SkeletonGrid } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="flex min-h-screen w-full flex-col gap-6 bg-brand-50 px-4 py-8 sm:px-8">
      <Skeleton className="h-10 w-48" />
      <Skeleton className="h-12 w-full rounded-full sm:w-96" />
      <SkeletonGrid count={9} />
    </div>
  );
}
