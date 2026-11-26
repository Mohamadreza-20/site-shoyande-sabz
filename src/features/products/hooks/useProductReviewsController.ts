"use client";

import { useCallback, useMemo, useState } from "react";
import { usePageParam } from "@/lib/hooks/usePageParam";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { useCreateReview, useProductReviews } from "@/features/products/hooks";
import type { Review } from "@/features/products/types";

const REVIEWS_PER_PAGE = 5;
export type ReviewFormValues = { name: string; comment: string };

export function useProductReviewsController(
  productId: string,
  initialReviews: Review[],
  fetchedAt?: number
) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const {
    data: reviews = initialReviews,
    isError,
    refetch,
  } = useProductReviews(productId, initialReviews, fetchedAt);
  const createReview = useCreateReview();
  const [formOpen, setFormOpen] = useState(false);
  const [ratingValue, setRatingValue] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const sortedReviews = useMemo(() => {
    const time = (review: Review) => {
      const value = Date.parse(review.date);
      return Number.isNaN(value) ? 0 : value;
    };
    return reviews
      .map((review, index) => ({ review, index }))
      .sort((a, b) => time(b.review) - time(a.review) || b.index - a.index)
      .map(({ review }) => review);
  }, [reviews]);
  const totalPages = Math.max(1, Math.ceil(sortedReviews.length / REVIEWS_PER_PAGE));
  const { page, setPage } = usePageParam(totalPages);
  const paginatedReviews = useMemo(
    () => sortedReviews.slice((page - 1) * REVIEWS_PER_PAGE, page * REVIEWS_PER_PAGE),
    [sortedReviews, page]
  );
  const form = useForm<ReviewFormValues>({ defaultValues: { name: "", comment: "" } });

  const resetToFirstPage = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("page");
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }, [pathname, router, searchParams]);

  return {
    reviews,
    isError,
    refetch,
    createReview,
    formOpen,
    setFormOpen,
    ratingValue,
    setRatingValue,
    hoverRating,
    setHoverRating,
    totalPages,
    page,
    paginatedReviews,
    form,
    setPage,
    resetToFirstPage,
  };
}
