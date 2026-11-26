"use client";

import type { Product } from "@/features/products/types";
import { TableStateRow, GridStateBlock } from "@/components/ui/TableStateRow";
import { ProductTableRow, ProductGridCard } from "../ProductsTableParts";

export default function ProductsTableContent({
  products,
  view,
  isError,
  isDeleting,
  onRetry,
  onEdit,
  onDelete,
}: {
  products: Product[];
  view: "table" | "grid";
  isError: boolean;
  isDeleting: (productId: string) => boolean;
  onRetry: () => void;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}) {
  if (view === "grid") {
    return products.length === 0 ? (
      <div className="grid grid-cols-1 p-6">
        <GridStateBlock
          isError={isError}
          errorMessage="Couldn't load products."
          emptyMessage="No products match this title."
          onRetry={onRetry}
        />
      </div>
    ) : (
      <div className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <ProductGridCard
            key={product.id}
            product={product}
            isDeleting={isDeleting(product.id)}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className="min-w-full overflow-x-auto"
      role="region"
      aria-label="Scrollable table"
      tabIndex={0}
    >
      <table data-table="products" className="w-full min-w-[720px] border-collapse text-left">
        <thead>
          <tr className="border-y border-admin-line bg-admin-bg text-xs font-bold text-admin-muted">
            <th scope="col" className="px-6 py-3 font-bold">
              Product
            </th>
            <th scope="col" className="px-6 py-3 font-bold">
              Category
            </th>
            <th scope="col" className="px-6 py-3 font-bold">
              Price
            </th>
            <th scope="col" className="px-6 py-3 font-bold">
              Rating
            </th>
            <th scope="col" className="px-6 py-3 font-bold">
              Stock
            </th>
            <th scope="col" className="px-6 py-3 font-bold">
              Status
            </th>
            <th scope="col" className="px-6 py-3 font-bold">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <ProductTableRow
              key={product.id}
              product={product}
              isDeleting={isDeleting(product.id)}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
          {products.length === 0 && (
            <TableStateRow
              colSpan={7}
              isError={isError}
              errorMessage="Couldn't load products."
              emptyMessage="No products match this title."
              onRetry={onRetry}
            />
          )}
        </tbody>
      </table>
    </div>
  );
}
