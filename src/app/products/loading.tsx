import { Skeleton, SkeletonGrid } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="flex min-h-screen w-full flex-col gap-6 bg-brand-50 px-4 py-8 sm:px-8">
      <Skeleton className="h-10 w-48" />
      <div className="flex w-full flex-col gap-6 lg:flex-row">
        <Skeleton className="h-[420px] w-full rounded-2xl lg:w-64" />
        <div className="flex w-full flex-col gap-4">
          <Skeleton className="h-12 w-full rounded-full" />
          <SkeletonGrid count={9} />
        </div>
      </div>
    </div>
  );
}
