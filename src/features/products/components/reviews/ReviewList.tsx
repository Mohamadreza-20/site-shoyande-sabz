import type { Review } from "@/features/products/types";
import ReviewCard from "./ReviewCard";

export default function ReviewList({ reviews }: { reviews: Review[] }) {
  if (reviews.length === 0)
    return (
      <p className="text-sm text-muted">No reviews yet. Be the first to share your experience.</p>
    );
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  );
}
