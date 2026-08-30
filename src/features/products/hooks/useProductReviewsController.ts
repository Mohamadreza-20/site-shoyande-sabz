"use client";

import { useCallback, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { useCreateReview, useProductReviews } from "@/features/products/hooks";
import type { Review } from "@/features/products/types";

export const REVIEWS_PER_PAGE = 5;
export type ReviewFormValues = { name: string; comment: string };

export function useProductReviewsController(productId: string, initialReviews: Review[], fetchedAt?: number) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { data: reviews = initialReviews, isError, refetch } = useProductReviews(productId, initialReviews, fetchedAt);
  const createReview = useCreateReview();
  const [formOpen, setFormOpen] = useState(false);
  const [ratingValue, setRatingValue] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const sortedReviews = useMemo(() => [...reviews].reverse(), [reviews]);
  const totalPages = Math.max(1, Math.ceil(sortedReviews.length / REVIEWS_PER_PAGE));
  const requestedPage = Number(searchParams.get("page"));
  const page = Number.isFinite(requestedPage) && requestedPage >= 1 ? Math.min(requestedPage, totalPages) : 1;
  const paginatedReviews = useMemo(() => sortedReviews.slice((page - 1) * REVIEWS_PER_PAGE, page * REVIEWS_PER_PAGE), [sortedReviews, page]);
  const form = useForm<ReviewFormValues>({ defaultValues: { name: "", comment: "" } });

  const setPage = useCallback((nextPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (nextPage > 1) params.set("page", String(nextPage)); else params.delete("page");
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }, [pathname, router, searchParams]);

  const resetToFirstPage = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("page");
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }, [pathname, router, searchParams]);

  return {
    reviews, isError, refetch, createReview, formOpen, setFormOpen, ratingValue, setRatingValue,
    hoverRating, setHoverRating, totalPages, page, paginatedReviews, form, setPage, resetToFirstPage,
  };
}
