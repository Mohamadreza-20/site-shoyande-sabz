"use client";

import { memo } from "react";
import { Loader2, Pencil, Star, Trash2 } from "lucide-react";
import ProductImage from "../ProductImage";
import type { Product } from "@/features/products/types";
import { getProductStockStatus } from "@/features/products/lib";
import { productStatusStyles } from "@/features/products/constants";

export const ProductTableRow = memo(function ProductTableRow({
  product,
  isDeleting,
  onEdit,
  onDelete,
}: {
  product: Product;
  isDeleting: boolean;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}) {
  const stockStatus = getProductStockStatus(product.stock);
  const status = productStatusStyles[stockStatus];
  return (
    <tr className="border-b border-admin-line last:border-b-0">
      <td className="px-6 py-3.5">
        <div className="flex items-center gap-3">
          <div className="relative size-11 shrink-0 overflow-hidden rounded-xl bg-admin-bg">
            <ProductImage
              src={product.image}
              alt={product.title}
              fill
              sizes="44px"
              quality={40}
              className="object-cover"
            />
          </div>
          <p className="line-clamp-2 max-w-[220px] text-sm font-semibold text-admin-ink">
            {product.title}
          </p>
        </div>
      </td>
      <td className="px-6 py-3.5 text-sm text-admin-ink">{product.category}</td>
      <td className="px-6 py-3.5 text-sm font-semibold text-admin-primary">{product.price}</td>
      <td className="px-6 py-3.5">
        <div className="flex items-center gap-1 text-sm text-admin-ink">
          <span>{product.rating}</span>
          <Star className="size-3.5 fill-admin-accent text-admin-accent" />
        </div>
      </td>
      <td className="px-6 py-3.5 text-sm text-admin-ink">
        {(product.stock ?? 0).toLocaleString("fa-IR")} عدد
      </td>
      <td className="px-6 py-3.5">
        <span
          className={`inline-block rounded-full border px-3 py-1 text-xs font-semibold ${status.bg} ${status.border} ${status.text}`}
        >
          {status.label}
        </span>
      </td>
      <td className="px-6 py-3.5">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onEdit(product)}
            aria-label="ویرایش محصول"
            className="cursor-pointer flex size-8 items-center justify-center rounded-lg border border-admin-line text-admin-primary transition hover:bg-admin-bg"
          >
            <Pencil className="size-4" strokeWidth={2} />
          </button>
          <button
            type="button"
            onClick={() => onDelete(product)}
            disabled={isDeleting}
            aria-label="حذف محصول"
            className="cursor-pointer flex size-8 items-center justify-center rounded-lg border border-admin-line text-admin-danger transition hover:bg-admin-danger-bg disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Trash2 className="size-4" strokeWidth={2} />
          </button>
        </div>
      </td>
    </tr>
  );
});

export const ProductGridCard = memo(function ProductGridCard({
  product,
  isDeleting,
  onEdit,
  onDelete,
}: {
  product: Product;
  isDeleting: boolean;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}) {
  const stockStatus = getProductStockStatus(product.stock);
  const status = productStatusStyles[stockStatus];
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-admin-line p-4">
      <div className="relative h-[140px] w-full overflow-hidden rounded-xl bg-admin-bg">
        <ProductImage
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          quality={50}
          className="object-cover"
        />
        <span
          className={`absolute right-2 top-2 inline-block rounded-full border px-2.5 py-1 text-[11px] font-semibold ${status.bg} ${status.border} ${status.text}`}
        >
          {status.label}
        </span>
      </div>

      <div className="flex flex-col items-end gap-1 text-right">
        <p className="text-xs font-medium text-admin-muted">{product.category}</p>
        <p className="line-clamp-2 w-full text-sm font-semibold text-admin-ink">
          {product.title}
        </p>
        <div className="flex items-center gap-1 text-xs text-admin-ink">
          <span>{product.rating}</span>
          <Star className="size-3.5 fill-admin-accent text-admin-accent" />
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-admin-line pt-3">
        <span className="text-sm font-semibold text-admin-primary">{product.price}</span>
        <span className="text-xs text-admin-muted">
          {(product.stock ?? 0).toLocaleString("fa-IR")} عدد
        </span>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onEdit(product)}
          aria-label="ویرایش محصول"
          className="cursor-pointer flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-admin-line py-2 text-xs font-semibold text-admin-primary transition hover:bg-admin-bg"
        >
          <Pencil className="size-3.5" strokeWidth={2} />
          ویرایش
        </button>
        <button
          type="button"
          onClick={() => onDelete(product)}
          disabled={isDeleting}
          aria-label="حذف محصول"
          className="cursor-pointer flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-admin-line py-2 text-xs font-semibold text-admin-danger transition hover:bg-admin-danger-bg disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Trash2 className="size-3.5" strokeWidth={2} />
          حذف
        </button>
      </div>
    </div>
  );
});

export function TableLoadingOverlay() {
  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center gap-2 rounded-3xl bg-white/70 text-sm font-semibold text-admin-primary backdrop-blur-[1px]">
      <Loader2 className="size-5 animate-spin" strokeWidth={2} />
      در حال دریافت اطلاعات...
    </div>
  );
}

