import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategoriesWithCounts,
  updateCategory,
} from "../api";
import type { Category, CategoryInput, CategoryWithCount } from "../types";
import { categoryKeys } from "../queryKeys";
import { revalidateCategoriesCache } from "@/lib/actions";

const CATALOG_STALE_TIME = 2 * 60_000;

export function useCategories(initialData?: Category[], initialDataUpdatedAt?: number) {
  return useQuery({
    queryKey: categoryKeys.list(),
    queryFn: getCategories,
    initialData,
    initialDataUpdatedAt,
    staleTime: CATALOG_STALE_TIME,
  });
}

export function useCategoriesWithCounts(
  initialData?: CategoryWithCount[],
  initialDataUpdatedAt?: number
) {
  return useQuery({
    queryKey: categoryKeys.withCounts(),
    queryFn: getCategoriesWithCounts,
    initialData,
    initialDataUpdatedAt,
    staleTime: CATALOG_STALE_TIME,
  });
}

export function useCreateCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: CategoryInput) => createCategory(input),
    onSuccess: (data) => {
      queryClient.setQueryData<Category[]>(categoryKeys.list(), (prev) =>
        prev ? [...prev, data] : prev
      );
      queryClient.invalidateQueries({ queryKey: categoryKeys.withCounts() });
      void revalidateCategoriesCache();
    },
  });
}

export function useUpdateCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: CategoryInput }) =>
      updateCategory(id, input),
    onSuccess: (data, variables) => {
      queryClient.setQueryData<Category[]>(categoryKeys.list(), (prev) =>
        prev ? prev.map((category) => (category.id === variables.id ? data : category)) : prev
      );
      queryClient.invalidateQueries({ queryKey: categoryKeys.withCounts() });
      void revalidateCategoriesCache();
    },
  });
}

export function useDeleteCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteCategory(id),
    onSuccess: (ok, id) => {
      if (!ok) return;
      queryClient.setQueryData<Category[]>(categoryKeys.list(), (prev) =>
        prev ? prev.filter((category) => category.id !== id) : prev
      );
      queryClient.invalidateQueries({ queryKey: categoryKeys.withCounts() });
      void revalidateCategoriesCache();
    },
  });
}
