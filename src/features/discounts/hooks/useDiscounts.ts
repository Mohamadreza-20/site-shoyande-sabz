import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createDiscount, deleteDiscount, getDiscounts, updateDiscount } from "../api";
import type { Discount, DiscountInput } from "../types";
import { discountKeys } from "../queryKeys";

export function useDiscounts(initialData?: Discount[], initialDataUpdatedAt?: number) {
  return useQuery({
    queryKey: discountKeys.list(),
    queryFn: getDiscounts,
    initialData,
    initialDataUpdatedAt,
    staleTime: 15_000,
    refetchOnWindowFocus: true,
  });
}

export function useCreateDiscount() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: DiscountInput) => createDiscount(input),
    onSuccess: (data) => {
      queryClient.setQueryData<Discount[]>(discountKeys.list(), (prev) =>
        prev ? [data, ...prev] : prev
      );
    },
  });
}

export function useUpdateDiscount() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: DiscountInput }) =>
      updateDiscount(id, input),
    onSuccess: (data, variables) => {
      queryClient.setQueryData<Discount[]>(discountKeys.list(), (prev) =>
        prev ? prev.map((discount) => (discount.id === variables.id ? data : discount)) : prev
      );
    },
  });
}

export function useDeleteDiscount() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteDiscount(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: discountKeys.list() });
      const previous = queryClient.getQueryData<Discount[]>(discountKeys.list());

      queryClient.setQueryData<Discount[]>(discountKeys.list(), (prev) =>
        prev ? prev.filter((discount) => discount.id !== id) : prev
      );

      return { previous };
    },
    onError: (_error, _id, context) => {
      queryClient.setQueryData(discountKeys.list(), context?.previous);
    },
    onSettled: () => {
      void queryClient.invalidateQueries({
        queryKey: discountKeys.list(),
        refetchType: "active",
      });
    },
  });
}
