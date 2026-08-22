import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-brand-50 px-4 py-8">
      <Skeleton className="h-[460px] w-full max-w-md rounded-[24px]" />
    </div>
  );
}
