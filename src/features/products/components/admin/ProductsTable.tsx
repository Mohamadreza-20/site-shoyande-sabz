"use client";

import { toast } from "sonner";
import type { Category, ProductListResult } from "@/features/products/types";
import { apiErrorMessage } from "@/lib/http";
import { StaleDataNotice } from "@/components/ui/StaleDataNotice";
import { TableLoadingOverlay } from "./ProductsTableParts";
import { useProductsTable } from "@/features/products/hooks/useProductsTable";
import ProductsTableToolbar from "./parts/ProductsTableToolbar";
import ProductsTableContent from "./parts/ProductsTableContent";
import ProductsTablePagination from "./parts/ProductsTablePagination";
import ProductsTableDialogs from "./parts/ProductsTableDialogs";

export default function ProductsTable({ initialResult, pageSize, categories, fetchedAt }: { initialResult: ProductListResult; pageSize: number; categories: Category[]; fetchedAt?: number }) {
  const table = useProductsTable({ initialResult, pageSize, categories, fetchedAt });

  async function handleConfirmDelete() {
    if (!table.confirmDeleteProduct) return;
    const product = table.confirmDeleteProduct;
    const toastId = toast.loading(`در حال حذف محصول «${product.title}»...`);

    try {
      await table.confirmDelete();
      toast.success(`محصول «${product.title}» با موفقیت حذف شد.`, { id: toastId });
    } catch (error) {
      toast.error(apiErrorMessage(error), { id: toastId });
      table.setConfirmDeleteProduct(null);
    }
  }

  return (
    <div className="relative flex w-full flex-1 flex-col overflow-hidden rounded-3xl border border-admin-line bg-white">
      {table.isFetching && <TableLoadingOverlay />}
      {table.isError && table.products.length > 0 && <div className="px-6 pt-6"><StaleDataNotice onRetry={() => table.refetch()} /></div>}
      <ProductsTableToolbar search={table.search} view={table.view} onSearchChange={table.setSearch} onViewChange={table.setView} onAdd={table.openAddModal} />
      <ProductsTableContent products={table.products} view={table.view} isError={table.isError} isDeleting={(id) => table.deleteProduct.isPending && table.confirmDeleteProduct?.id === id} onRetry={() => table.refetch()} onEdit={table.openEditModal} onDelete={table.requestDelete} />
      <ProductsTablePagination page={table.page} totalPages={table.totalPages} onChange={table.handlePageChange} />
      <ProductsTableDialogs modalOpen={table.modalOpen} editingProduct={table.editingProduct} categories={categories} onCloseModal={table.closeProductModal} confirmDeleteProduct={table.confirmDeleteProduct} onCloseDelete={() => table.setConfirmDeleteProduct(null)} onConfirmDelete={handleConfirmDelete} deleteLoading={table.deleteProduct.isPending} />
    </div>
  );
}
