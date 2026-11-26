"use client";

import { useCallback, type FormEvent } from "react";
import { MessageSquarePlus } from "lucide-react";
import { toast } from "sonner";
import { apiErrorMessage } from "@/lib/http";
import type { Review } from "@/features/products/types";
import Collapse from "@/components/ui/Collapse";
import MarkerLabel from "@/components/ui/MarkerLabel";
import Pagination from "@/components/Pagination";
import { StaleDataNotice } from "@/components/ui/StaleDataNotice";
import { useProductReviewsController } from "@/features/products/hooks/useProductReviewsController";
import ReviewForm from "./reviews/ReviewForm";
import ReviewList from "./reviews/ReviewList";

export default function ProductReviews({
  productId,
  initialReviews,
  fetchedAt,
}: {
  productId: string;
  initialReviews: Review[];
  fetchedAt?: number;
}) {
  const controller = useProductReviewsController(productId, initialReviews, fetchedAt);
  const onSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const values = await controller.form.trigger();
      if (!values) return;
      const formValues = controller.form.getValues();
      try {
        await controller.createReview.mutateAsync({
          productId,
          name: formValues.name.trim(),
          ratingValue: controller.ratingValue,
          comment: formValues.comment.trim(),
        });
      } catch (error) {
        toast.error(apiErrorMessage(error));
        return;
      }
      controller.resetToFirstPage();
      controller.form.reset({ name: "", comment: "" });
      controller.setRatingValue(5);
      controller.setFormOpen(false);
      toast.success("Thanks for sharing your review!");
    },
    [controller, productId]
  );

  return (
    <div className="flex w-full flex-col gap-8">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <h2 className="text-2xl lg:text-3xl">
          <MarkerLabel>Customer reviews</MarkerLabel>{" "}
          <span className="font-display text-lg font-bold text-muted">
            ({controller.reviews.length.toLocaleString("en-US")})
          </span>
        </h2>
        <button
          type="button"
          onClick={() => controller.setFormOpen((value) => !value)}
          aria-expanded={controller.formOpen}
          className="flex min-h-11 items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-extrabold text-brand-700 transition hover:brightness-95"
        >
          <MessageSquarePlus className="size-4" strokeWidth={2} />
          {controller.formOpen ? "Cancel" : "Write a review"}
        </button>
      </div>
      {controller.isError && (
        <StaleDataNotice variant="storefront" onRetry={() => controller.refetch()} />
      )}
      <Collapse open={controller.formOpen}>
        <ReviewForm
          register={controller.form.register}
          errors={controller.form.formState.errors}
          ratingValue={controller.ratingValue}
          hoverRating={controller.hoverRating}
          onHover={controller.setHoverRating}
          onLeave={() => controller.setHoverRating(0)}
          onRate={controller.setRatingValue}
          pending={controller.createReview.isPending}
          onSubmit={onSubmit}
        />
      </Collapse>
      <ReviewList reviews={controller.paginatedReviews} />
      <Pagination
        currentPage={controller.page}
        totalPages={controller.totalPages}
        onPageChange={controller.setPage}
      />
    </div>
  );
}
