import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { z } from "zod";
import { auth } from "@/auth";
import { API_BASE, CACHE_TAGS } from "@/lib/http";
import { formatDate, formatPrice, parsePriceAmount } from "@/lib/money";
import {
  discountIsUsable,
  normalizeDiscountCode,
  parseDiscountAmount,
} from "@/features/discounts/utils";
import type { Discount } from "@/features/discounts/types";
import type { Order } from "@/features/orders/types";

const checkoutSchema = z.object({
  items: z
    .array(z.object({ id: z.string().min(1), quantity: z.number().int().min(1).max(99) }))
    .min(1)
    .max(100),
  discountCode: z.string().trim().max(40).optional(),
});

type ProductRecord = { id: string; title: string; priceValue: number; stock?: number };

async function upstream<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, { cache: "no-store", ...init });
  if (!res.ok) throw new Error(`upstream ${res.status}`);
  return (await res.json()) as T;
}

function patch(path: string, body: unknown) {
  return upstream(path, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id || !session.user.active) {
    return NextResponse.json({ error: "Please sign in to place your order." }, { status: 401 });
  }

  const parsed = checkoutSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Your cart is invalid." }, { status: 400 });
  }

  const merged = new Map<string, number>();
  for (const item of parsed.data.items) {
    merged.set(item.id, (merged.get(item.id) ?? 0) + item.quantity);
  }

  try {
    const query = [...merged.keys()].map((id) => `id=${encodeURIComponent(id)}`).join("&");
    const products = await upstream<ProductRecord[]>(`/products?${query}`);
    const byId = new Map(products.map((product) => [product.id, product]));

    const lines: { product: ProductRecord; quantity: number }[] = [];
    for (const [id, quantity] of merged) {
      const product = byId.get(id);
      if (!product) {
        return NextResponse.json(
          { error: "A product in your cart is no longer available." },
          { status: 409 }
        );
      }
      if (typeof product.stock === "number" && product.stock < quantity) {
        return NextResponse.json(
          { error: `Only ${product.stock} left of ${product.title}.` },
          { status: 409 }
        );
      }
      lines.push({ product, quantity });
    }

    const subtotal = lines.reduce((sum, line) => sum + line.product.priceValue * line.quantity, 0);

    let discount: Discount | undefined;
    let discountAmount = 0;
    if (parsed.data.discountCode) {
      const code = normalizeDiscountCode(parsed.data.discountCode);
      const discounts = await upstream<Discount[]>("/discounts");
      discount = discounts.find((item) => normalizeDiscountCode(item.code) === code);
      if (!discount || !discountIsUsable(discount)) {
        return NextResponse.json({ error: "That discount code is not valid." }, { status: 400 });
      }
      discountAmount = parseDiscountAmount(discount, subtotal);
    }

    const total = Math.max(subtotal - discountAmount, 0);
    const [latest] = await upstream<Order[]>("/orders?_sort=id&_order=desc&_limit=1");
    const nextId = (latest?.id ?? 0) + 1;
    const nextNumber = Number(latest?.orderNumber.replace(/\D/g, "")) + 1 || 1000 + nextId;

    const order = await upstream<Order>("/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: nextId,
        orderNumber: `#${nextNumber}`,
        customer: session.user.name ?? "Customer",
        customerId: session.user.id,
        products: lines
          .map((line) =>
            line.quantity > 1 ? `${line.product.title} ×${line.quantity}` : line.product.title
          )
          .join(", "),
        date: formatDate(new Date()),
        amount: formatPrice(total),
        status: "processing",
      } satisfies Order),
    });

    await Promise.all(
      lines
        .filter((line) => typeof line.product.stock === "number")
        .map((line) =>
          patch(`/products/${encodeURIComponent(line.product.id)}`, {
            stock: (line.product.stock as number) - line.quantity,
          })
        )
    );

    if (discount) {
      const match = discount.usage.match(/^(\d+)\s+of\s+(unlimited|\d+)$/i);
      if (match) {
        await patch(`/discounts/${encodeURIComponent(discount.id)}`, {
          usage: `${Number(match[1]) + 1} of ${match[2]}`,
        });
      }
    }

    const customer = await upstream<{ ordersCount: number; totalSpent: string }>(
      `/customers/${encodeURIComponent(session.user.id)}`
    );
    await patch(`/customers/${encodeURIComponent(session.user.id)}`, {
      ordersCount: (customer.ordersCount ?? 0) + 1,
      totalSpent: formatPrice(parsePriceAmount(customer.totalSpent ?? "0") + total),
    });

    revalidateTag(CACHE_TAGS.products, { expire: 0 });
    return NextResponse.json(order, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "We couldn't place your order. Please try again." },
      { status: 502 }
    );
  }
}
