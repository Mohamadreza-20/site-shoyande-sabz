import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createReview, getProductReviews } from "../api";
import type { Review } from "../types";
import { productKeys, reviewKeys } from "../queryKeys";
import { revalidateProductsCache, revalidateReviewsCache } from "@/lib/actions";

export function useProductReviews(
  productId: string,
  initialData?: Review[],
  initialDataUpdatedAt?: number
) {
  return useQuery({
    queryKey: reviewKeys.byProduct(productId),
    queryFn: () => getProductReviews(productId),
    initialData,
    initialDataUpdatedAt: initialDataUpdatedAt ?? 0,
    enabled: Boolean(productId),
    staleTime: 15_000,
    refetchOnMount: "always",
  });
}

export function useCreateReview() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: {
      productId: string;
      name: string;
      ratingValue: number;
      comment: string;
    }) => createReview(input),
    onSuccess: (data, variables) => {
      queryClient.setQueryData<Review[]>(reviewKeys.byProduct(variables.productId), (prev) =>
        prev ? [data, ...prev.filter((review) => review.id !== data.id)] : [data]
      );
      queryClient.invalidateQueries({ queryKey: productKeys.detail(variables.productId) });
      queryClient.invalidateQueries({ queryKey: productKeys.list() });
      void Promise.all([revalidateReviewsCache(), revalidateProductsCache()]);
    },
  });
}
