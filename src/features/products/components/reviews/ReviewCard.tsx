import { Star } from "lucide-react";
import { formatDate } from "@/lib/money";
import type { Review } from "@/features/products/types";

export default function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="flex flex-col items-start gap-3 rounded-[28px] border border-brand-200 bg-white p-6 text-left">
      <div className="flex w-full items-center justify-between">
        <p className="text-sm font-extrabold text-brand-700">{review.name}</p>
        <span className="text-xs text-muted">{formatDate(review.date)}</span>
      </div>
      <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            className={
              index < review.ratingValue
                ? "size-3.5 fill-accent text-accent"
                : "size-3.5 text-brand-200"
            }
          />
        ))}
      </div>
      <p className="text-sm leading-[1.7] text-muted">{review.comment}</p>
    </div>
  );
}
