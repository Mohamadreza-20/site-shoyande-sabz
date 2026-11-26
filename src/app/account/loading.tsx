import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="flex min-h-screen w-full flex-col gap-6 bg-background px-4 py-8 sm:px-8">
      <Skeleton className="h-10 w-40" />
      <div className="flex w-full flex-col gap-6 lg:flex-row">
        <Skeleton className="h-64 w-full rounded-[28px] lg:w-64" />
        <div className="flex w-full flex-col gap-4">
          <Skeleton className="h-28 w-full rounded-[28px]" />
          <Skeleton className="h-48 w-full rounded-[28px]" />
        </div>
      </div>
    </div>
  );
}
