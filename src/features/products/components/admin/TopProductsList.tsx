import ProductImage from "../ProductImage";
import { Star } from "lucide-react";
import type { Product } from "@/features/products/types";

export default function TopProductsList({ products }: { products: Product[] }) {
  const topProducts = [...products].sort((a, b) => b.reviewCount - a.reviewCount).slice(0, 8);

  return (
    <div className="flex w-full flex-col gap-5 rounded-3xl border border-admin-line bg-white p-6">
      <p className="text-base font-bold text-admin-ink">پرفروش‌ترین محصولات</p>

      {topProducts.length === 0 ? (
        <p className="py-16 text-center text-sm text-admin-muted">هنوز محصولی ثبت نشده است.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {topProducts.map((product, index) => (
            <div
              key={product.id}
              className="group relative flex flex-col gap-3 rounded-2xl border border-admin-line bg-admin-bg/50 p-3 transition hover:border-admin-primary/40 hover:bg-white hover:shadow-sm"
            >
              <span className="absolute right-3 top-3 z-10 flex size-6 items-center justify-center rounded-full bg-admin-primary text-[11px] font-bold text-white shadow-sm">
                {(index + 1).toLocaleString("fa-IR")}
              </span>

              <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-white">
                <ProductImage
                  src={product.image}
                  alt={product.title}
                  fill
                  sizes="(max-width: 640px) 45vw, 200px"
                  quality={50}
                  className="object-cover transition duration-300 group-hover:scale-105"
                />
              </div>

              <div className="flex flex-col items-end gap-1 text-right">
                <p className="line-clamp-2 min-h-[2.5em] text-sm font-semibold text-admin-ink">
                  {product.title}
                </p>
                <p className="line-clamp-1 text-xs text-admin-muted">{product.category}</p>

                <div className="mt-1 flex w-full items-center justify-between border-t border-admin-line pt-2">
                  <span className="flex items-center gap-1 text-xs font-medium text-admin-muted">
                    <Star className="size-3.5 fill-admin-warning text-admin-warning" strokeWidth={0} />
                    {product.reviewCount.toLocaleString("fa-IR")}
                  </span>
                  <span className="text-sm font-bold text-admin-primary">{product.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
