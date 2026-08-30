import { Star } from "lucide-react";
import type { Review } from "@/features/products/types";

<<<<<<< HEAD
export default function ReviewCard({ review }: { review: Review }) {
  return <div className="flex flex-col items-end gap-3 rounded-3xl border border-brand-200 bg-white p-6 text-right"><div className="flex w-full items-center justify-between"><span className="text-xs text-muted">{review.date}</span><p className="text-sm font-bold text-brand-700">{review.name}</p></div><div className="flex items-center">{Array.from({ length: 5 }).map((_, index) => <Star key={index} className={index < review.ratingValue ? "size-3.5 fill-amber-400 text-amber-400" : "size-3.5 text-brand-200"} />)}</div><p className="text-sm leading-[1.7] text-muted">{review.comment}</p></div>;
=======
const STAR_POSITIONS = ["star-1", "star-2", "star-3", "star-4", "star-5"] as const;

export default function ReviewCard({ review }: { review: Review }) {
  return <div className="flex flex-col items-end gap-3 rounded-3xl border border-brand-200 bg-white p-6 text-right"><div className="flex w-full items-center justify-between"><span className="text-xs text-muted">{review.date}</span><p className="text-sm font-bold text-brand-700">{review.name}</p></div><div className="flex items-center">{STAR_POSITIONS.map((id, position) => <Star key={id} className={position < review.ratingValue ? "size-3.5 fill-amber-400 text-amber-400" : "size-3.5 text-brand-200"} />)}</div><p className="text-sm leading-[1.7] text-muted">{review.comment}</p></div>;
>>>>>>> origin/main
}
