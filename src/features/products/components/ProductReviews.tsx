"use client";

import { useCallback, type FormEvent } from "react";
import { MessageSquarePlus } from "lucide-react";
import { toast } from "sonner";
import { apiErrorMessage } from "@/lib/http";
import type { Review } from "@/features/products/types";
import Pagination from "@/components/Pagination";
import { StaleDataNotice } from "@/components/ui/StaleDataNotice";
import { useProductReviewsController } from "@/features/products/hooks/useProductReviewsController";
import ReviewForm from "./reviews/ReviewForm";
import ReviewList from "./reviews/ReviewList";

export default function ProductReviews({ productId, initialReviews, fetchedAt }: { productId: string; initialReviews: Review[]; fetchedAt?: number }) {
  const controller = useProductReviewsController(productId, initialReviews, fetchedAt);
  const onSubmit = useCallback(async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const values = await controller.form.trigger();
    if (!values) return;
    const formValues = controller.form.getValues();
    if (!formValues.name.trim() || !formValues.comment.trim()) {
      toast.error("لطفاً نام و متن نظر را وارد کنید.");
      return;
    }
    try {
      await controller.createReview.mutateAsync({ productId, name: formValues.name.trim(), ratingValue: controller.ratingValue, comment: formValues.comment.trim() });
    } catch (error) {
      toast.error(apiErrorMessage(error));
      return;
    }
    controller.resetToFirstPage();
    controller.form.reset({ name: "", comment: "" });
    controller.setRatingValue(5);
    controller.setFormOpen(false);
    toast.success("نظر شما با موفقیت ثبت شد. ممنون از اینکه وقت گذاشتید!");
  }, [controller, productId]);

  return <div className="flex w-full flex-col gap-8">
    <div className="flex flex-col-reverse items-start justify-between gap-4 sm:flex-row sm:items-center"><button type="button" onClick={() => controller.setFormOpen((value) => !value)} className="cursor-pointer flex items-center gap-2 rounded-full bg-brand-400 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-brand-500"><MessageSquarePlus className="size-4" strokeWidth={2} />ثبت نظر جدید</button><h2 className="text-right text-2xl font-black text-brand-700 lg:text-[28px]">نظرات کاربران ({controller.reviews.length.toLocaleString("fa-IR")})</h2></div>
    {controller.isError && <StaleDataNotice variant="storefront" onRetry={() => controller.refetch()} />}
    {controller.formOpen && <ReviewForm register={controller.form.register} ratingValue={controller.ratingValue} hoverRating={controller.hoverRating} onHover={controller.setHoverRating} onLeave={() => controller.setHoverRating(0)} onRate={controller.setRatingValue} pending={controller.createReview.isPending} onSubmit={onSubmit} />}
    <ReviewList reviews={controller.paginatedReviews} />
    <Pagination currentPage={controller.page} totalPages={controller.totalPages} onPageChange={controller.setPage} />
  </div>;
}
