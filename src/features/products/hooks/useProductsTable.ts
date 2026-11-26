"use client";

import { useCallback, useEffect, useReducer, useState } from "react";
import type { Category, Product, ProductListResult } from "@/features/products/types";
import { useDeleteProduct, useProductsPage } from "@/features/products/hooks";
import { useUrlListState } from "@/lib/hooks/useUrlListState";
import { useBrowserHydration } from "@/lib/hooks/useBrowserHydration";

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
  const [view, setView] = useState<ProductsView>("table");
  const [uiState, dispatch] = useReducer(productsTableReducer, {
    modalOpen: false,
    editingProduct: null,
    confirmDeleteProduct: null,
  });
  const { modalOpen, editingProduct, confirmDeleteProduct } = uiState;

  const {
    search,
    setSearch,
    debouncedSearch,
    queryPage,
    page,
    setPage: handlePageChange,
    clampPage,
  } = useUrlListState();

  useBrowserHydration(readStoredView, setView);

  useEffect(() => {
    window.localStorage.setItem(VIEW_STORAGE_KEY, view);
  }, [view]);

  const { data, isError, isFetching, refetch } = useProductsPage(
    { search: debouncedSearch, page: queryPage, pageSize },
    initialResult,
    fetchedAt
  );
  const products = data?.products ?? [];
  const totalPages = data?.totalPages ?? 1;
  const deleteProduct = useDeleteProduct();

  useEffect(() => {
    if (data) clampPage(totalPages);
  }, [clampPage, data, totalPages]);

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
