<<<<<<< HEAD
import { useEffect, useState } from "react";
=======
>>>>>>> origin/main
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createProduct,
  deleteProduct,
<<<<<<< HEAD
  getProduct,
=======
>>>>>>> origin/main
  getProducts,
  getFeaturedProducts,
  getProductsByIds,
  getProductsFiltered,
  getProductStockSummary,
  updateProduct,
} from "../api";
import type { Product, ProductInput, ProductListResult } from "../types";
import { productKeys, categoryKeys } from "../queryKeys";
import { dashboardKeys } from "@/features/dashboard/queryKeys";
import { revalidateProductsCache } from "@/lib/actions";

const CATALOG_STALE_TIME = 2 * 60_000;

export function useProductsPage(
  { search, page, pageSize }: { search: string; page: number; pageSize: number },
  initialData?: ProductListResult,
  initialDataUpdatedAt?: number
) {
  return useQuery({
    queryKey: productKeys.adminPage(search, page),
    queryFn: () => getProductsFiltered({ search, page, pageSize }),
    initialData: page === 1 && !search ? initialData : undefined,
    initialDataUpdatedAt: page === 1 && !search ? initialDataUpdatedAt : undefined,
    placeholderData: keepPreviousData,
    staleTime: CATALOG_STALE_TIME,
  });
}

export function useProducts(initialData?: Product[], initialDataUpdatedAt?: number) {
  return useQuery({
    queryKey: productKeys.list(),
    queryFn: getProducts,
    initialData,
    initialDataUpdatedAt,
    staleTime: CATALOG_STALE_TIME,
  });
}

export function useFeaturedProducts(initialData?: Product[], initialDataUpdatedAt?: number) {
  return useQuery({
    queryKey: productKeys.featured(),
    queryFn: () => getFeaturedProducts(),
    initialData,
    initialDataUpdatedAt,
    staleTime: CATALOG_STALE_TIME,
  });
}

export function useProductsByIds(
  ids: string[],
  initialData?: Product[],
  initialDataUpdatedAt?: number
) {
  return useQuery({
    queryKey: productKeys.byIds(ids),
    queryFn: () => getProductsByIds(ids),
    initialData,
    initialDataUpdatedAt,
    staleTime: CATALOG_STALE_TIME,
  });
}

export function useProductStockSummary(
  initialData?: { stock: number }[],
  initialDataUpdatedAt?: number
) {
  return useQuery({
    queryKey: productKeys.stockSummary(),
    queryFn: getProductStockSummary,
    initialData,
    initialDataUpdatedAt,
    staleTime: CATALOG_STALE_TIME,
  });
}

<<<<<<< HEAD
export function useProduct(id: string, initialData?: Product, initialDataUpdatedAt?: number) {
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn: async () => {
      const product = await getProduct(id);
      if (!product) throw new Error("product-not-found");
      return product;
    },
    initialData,
    initialDataUpdatedAt,
    staleTime: CATALOG_STALE_TIME,
  });
}

/**
 * Seeds the react-query cache for each product's detail query (`productKeys.detail(id)`)
 * from a product list that has already been fetched (search results, featured list,
 * related products, ...). This way, clicking through to `/products/[id]` finds fresh
 * data already sitting in the cache and `useProduct` skips the extra client fetch.
 */
export function useSeedProductDetailCache(products?: Product[], fetchedAt?: number) {
  const queryClient = useQueryClient();
  const [fallbackFetchedAt] = useState(() => Date.now());
  const effectiveFetchedAt = fetchedAt ?? fallbackFetchedAt;

  useEffect(() => {
    if (!products || products.length === 0) return;

    for (const product of products) {
      const key = productKeys.detail(product.id);
      const cached = queryClient.getQueryState(key);
      if (cached && cached.dataUpdatedAt >= effectiveFetchedAt) continue;
      queryClient.setQueryData(key, product);
    }
  }, [products, effectiveFetchedAt, queryClient]);
}

=======
>>>>>>> origin/main
export function useCreateProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: ProductInput) => createProduct(input),
    onSuccess: (data) => {
      queryClient.setQueryData<Product[]>(productKeys.list(), (prev) =>
        prev ? [...prev, data] : prev
      );
      queryClient.setQueryData(productKeys.detail(data.id), data);
      queryClient.invalidateQueries({ queryKey: productKeys.featured() });
      queryClient.invalidateQueries({ queryKey: productKeys.adminList() });
      queryClient.invalidateQueries({ queryKey: productKeys.stockSummary() });
      queryClient.invalidateQueries({ queryKey: categoryKeys.withCounts() });
      queryClient.invalidateQueries({ queryKey: dashboardKeys.overview });
      void revalidateProductsCache();
    },
  });
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: ProductInput }) =>
      updateProduct(id, input),
    onSuccess: (data, variables) => {
      queryClient.setQueryData(productKeys.detail(variables.id), data);
      queryClient.setQueryData<Product[]>(productKeys.list(), (prev) =>
        prev ? prev.map((product) => (product.id === variables.id ? data : product)) : prev
      );
      queryClient.invalidateQueries({ queryKey: productKeys.featured() });
      queryClient.invalidateQueries({ queryKey: productKeys.adminList() });
      queryClient.invalidateQueries({ queryKey: productKeys.stockSummary() });
      queryClient.invalidateQueries({ queryKey: categoryKeys.withCounts() });
      queryClient.invalidateQueries({ queryKey: dashboardKeys.overview });
      void revalidateProductsCache();
    },
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteProduct(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: productKeys.adminList() });
      await queryClient.cancelQueries({ queryKey: productKeys.list() });
      await queryClient.cancelQueries({ queryKey: productKeys.featured() });

      const previousAdminPages = queryClient.getQueriesData<ProductListResult>({
        queryKey: productKeys.adminList(),
      });
      const previousList = queryClient.getQueryData<Product[]>(productKeys.list());
      const previousFeatured = queryClient.getQueryData<Product[]>(productKeys.featured());

      queryClient.setQueriesData<ProductListResult>(
        { queryKey: productKeys.adminList() },
        (prev) =>
          prev
            ? {
                ...prev,
                products: prev.products.filter((product) => product.id !== id),
                total: Math.max(0, prev.total - 1),
                totalPages: Math.max(1, Math.ceil(Math.max(0, prev.total - 1) / Math.max(1, prev.products.length))),
              }
            : prev
      );
      queryClient.setQueryData<Product[]>(productKeys.list(), (prev) =>
        prev ? prev.filter((product) => product.id !== id) : prev
      );
      queryClient.setQueryData<Product[]>(productKeys.featured(), (prev) =>
        prev ? prev.filter((product) => product.id !== id) : prev
      );
      queryClient.removeQueries({ queryKey: productKeys.detail(id) });

      return { previousAdminPages, previousList, previousFeatured };
    },
    onError: (_error, _id, context) => {
      if (!context) return;
      for (const [queryKey, data] of context.previousAdminPages) {
        queryClient.setQueryData(queryKey, data);
      }
      queryClient.setQueryData(productKeys.list(), context.previousList);
      queryClient.setQueryData(productKeys.featured(), context.previousFeatured);
    },
    onSettled: (_data, _error, id) => {
      queryClient.removeQueries({ queryKey: productKeys.detail(id) });

      void Promise.allSettled([
        queryClient.invalidateQueries({ queryKey: productKeys.adminList(), refetchType: "active" }),
        queryClient.invalidateQueries({ queryKey: productKeys.list(), refetchType: "active" }),
        queryClient.invalidateQueries({ queryKey: productKeys.featured(), refetchType: "active" }),
        queryClient.invalidateQueries({ queryKey: productKeys.stockSummary(), refetchType: "active" }),
        queryClient.invalidateQueries({ queryKey: categoryKeys.withCounts(), refetchType: "active" }),
        queryClient.invalidateQueries({ queryKey: dashboardKeys.overview, refetchType: "active" }),
        revalidateProductsCache(),
      ]);
    },
  });
}
