"use client";

import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { Category, Product, ProductListResult } from "@/features/products/types";
import { useDeleteProduct, useProductsPage } from "@/features/products/hooks";
import { useDebouncedValue } from "@/lib/hooks/useDebouncedValue";
import { useBrowserHydration } from "@/lib/hooks/useBrowserHydration";

const SEARCH_DEBOUNCE_MS = 400;
const VIEW_STORAGE_KEY = "shooyande-sabz-admin-products-view";
export type ProductsView = "table" | "grid";

type ProductsTableUiState = {
  modalOpen: boolean;
  editingProduct: Product | null;
  confirmDeleteProduct: Product | null;
};

type ProductsTableAction =
  | { type: "OPEN_ADD" }
  | { type: "OPEN_EDIT"; product: Product }
  | { type: "CLOSE_MODAL" }
  | { type: "REQUEST_DELETE"; product: Product }
  | { type: "CANCEL_DELETE" }
  | { type: "DELETE_SUCCESS" };

function productsTableReducer(
  state: ProductsTableUiState,
  action: ProductsTableAction
): ProductsTableUiState {
  switch (action.type) {
    case "OPEN_ADD":
      return { ...state, modalOpen: true, editingProduct: null };
    case "OPEN_EDIT":
      return { ...state, modalOpen: true, editingProduct: action.product };
    case "CLOSE_MODAL":
      return { ...state, modalOpen: false, editingProduct: null };
    case "REQUEST_DELETE":
      return { ...state, confirmDeleteProduct: action.product };
    case "CANCEL_DELETE":
    case "DELETE_SUCCESS":
      return { ...state, confirmDeleteProduct: null };
    default:
      return state;
  }
}

function readStoredView(): ProductsView {
  if (typeof window === "undefined") return "table";
  return window.localStorage.getItem(VIEW_STORAGE_KEY) === "grid" ? "grid" : "table";
}

export function useProductsTable({
  initialResult,
  pageSize,
  fetchedAt,
}: {
  initialResult: ProductListResult;
  pageSize: number;
  categories: Category[];
  fetchedAt?: number;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(() => searchParams.get("q") ?? "");
  const [view, setView] = useState<ProductsView>("table");
  const [uiState, dispatch] = useReducer(productsTableReducer, {
    modalOpen: false,
    editingProduct: null,
    confirmDeleteProduct: null,
  });
  const { modalOpen, editingProduct, confirmDeleteProduct } = uiState;

  const debouncedSearch = useDebouncedValue(search, SEARCH_DEBOUNCE_MS);
  const pageParam = Number(searchParams.get("page"));
  const page = Number.isFinite(pageParam) && pageParam >= 1 ? pageParam : 1;
  const prevSearchRef = useRef(debouncedSearch);
  const searchChanged = debouncedSearch !== prevSearchRef.current;
  const searchParamsRef = useRef(searchParams);

  useEffect(() => {
    prevSearchRef.current = debouncedSearch;
  }, [debouncedSearch]);

  useEffect(() => {
    searchParamsRef.current = searchParams;
  }, [searchParams]);

  useBrowserHydration(readStoredView, setView);

  useEffect(() => {
    window.localStorage.setItem(VIEW_STORAGE_KEY, view);
  }, [view]);

  const { data, isError, isFetching, refetch } = useProductsPage(
    { search: debouncedSearch, page: searchChanged ? 1 : page, pageSize },
    initialResult,
    fetchedAt
  );
  const products = data?.products ?? [];
  const totalPages = data?.totalPages ?? 1;
  const deleteProduct = useDeleteProduct();

  useEffect(() => {
    const currentParams = searchParamsRef.current;
    const params = new URLSearchParams(currentParams.toString());
    const trimmed = debouncedSearch.trim();
    const currentQ = currentParams.get("q") ?? "";
    if (trimmed) params.set("q", trimmed);
    else params.delete("q");
    if (trimmed !== currentQ) params.delete("page");
    const nextQuery = params.toString();
    const currentQuery = currentParams.toString();
    if (nextQuery !== currentQuery) {
      router.replace(nextQuery ? `${pathname}?${nextQuery}` : pathname, { scroll: false });
    }
  }, [debouncedSearch, pathname, router]);

  useEffect(() => {
    if (page <= totalPages) return;
    const params = new URLSearchParams(searchParamsRef.current.toString());
    if (totalPages > 1) params.set("page", String(totalPages));
    else params.delete("page");
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }, [page, totalPages, pathname, router]);

  const handlePageChange = useCallback((nextPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (nextPage > 1) params.set("page", String(nextPage));
    else params.delete("page");
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname, router, searchParams]);

  const openAddModal = useCallback(() => {
    dispatch({ type: "OPEN_ADD" });
  }, []);

  const openEditModal = useCallback((product: Product) => {
    dispatch({ type: "OPEN_EDIT", product });
  }, []);

  const requestDelete = useCallback((product: Product) => {
    dispatch({ type: "REQUEST_DELETE", product });
  }, []);

  const closeProductModal = useCallback(() => {
    dispatch({ type: "CLOSE_MODAL" });
  }, []);

  const confirmDelete = useCallback(async () => {
    if (!confirmDeleteProduct) return null;
    const product = confirmDeleteProduct;
    await deleteProduct.mutateAsync(product.id);
    dispatch({ type: "DELETE_SUCCESS" });
    return product;
  }, [confirmDeleteProduct, deleteProduct]);

  return {
    search,
    setSearch,
    view,
    setView,
    products,
    page,
    totalPages,
    isError,
    isFetching,
    refetch,
    deleteProduct,
    modalOpen,
    editingProduct,
    confirmDeleteProduct,
    openAddModal,
    openEditModal,
    requestDelete,
    closeProductModal,
    setConfirmDeleteProduct: (product: Product | null) =>
      dispatch(product ? { type: "REQUEST_DELETE", product } : { type: "CANCEL_DELETE" }),
    confirmDelete,
    handlePageChange,
  };
}
