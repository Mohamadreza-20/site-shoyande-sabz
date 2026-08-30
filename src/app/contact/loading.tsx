import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-2xl flex-col gap-6 bg-brand-50 px-4 py-8 sm:px-8">
      <Skeleton className="h-10 w-48" />
      <Skeleton className="h-[420px] w-full rounded-[24px]" />
    </div>
  );
}
