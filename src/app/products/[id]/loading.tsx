import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="flex min-h-screen w-full flex-col gap-8 bg-brand-50 px-4 py-8 sm:px-8">
      <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2">
        <Skeleton className="h-[420px] w-full rounded-[28px]" />
        <div className="flex w-full flex-col gap-4">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-5 w-1/2" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-12 w-full rounded-full" />
        </div>
      </div>
      <Skeleton className="h-64 w-full rounded-2xl" />
    </div>
  );
}
