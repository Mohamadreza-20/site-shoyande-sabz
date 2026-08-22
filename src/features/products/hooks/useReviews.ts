import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createReview, getProductReviews } from "../api";
import type { Review } from "../types";
import { productKeys, reviewKeys } from "../queryKeys";
import { revalidateProductsCache } from "@/lib/actions";

export function useProductReviews(
  productId: string,
  initialData?: Review[],
  initialDataUpdatedAt?: number
) {
  return useQuery({
    queryKey: reviewKeys.byProduct(productId),
    queryFn: () => getProductReviews(productId),
    initialData,
    initialDataUpdatedAt,
    enabled: Boolean(productId),
    staleTime: 15_000,
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
        prev ? [data, ...prev] : prev
      );
      queryClient.invalidateQueries({ queryKey: productKeys.detail(variables.productId) });
      queryClient.invalidateQueries({ queryKey: productKeys.list() });
      void revalidateProductsCache();
    },
  });
}
