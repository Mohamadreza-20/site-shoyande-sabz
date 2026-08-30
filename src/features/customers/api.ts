import { unstable_rethrow } from "next/navigation";
import { apiFetch, apiMutate, createNetworkError, resolveBase, throwForResponse } from "@/lib/http";
import type { Customer, CustomerEditInput, CustomerListQuery, CustomerListResult, CustomerProfileInput, UserRole } from "./types";

export function getCustomers() {
  return apiFetch<Customer[]>("/customers");
}

const CUSTOMERS_PAGE_SIZE_DEFAULT = 12;

export async function getCustomersFiltered(
  query: CustomerListQuery = {}
): Promise<CustomerListResult> {
  const { search = "", page = 1, pageSize = CUSTOMERS_PAGE_SIZE_DEFAULT } = query;
  const currentPage = Math.max(1, Math.floor(page) || 1);

  const params = new URLSearchParams();
  if (search.trim()) params.set("q", search.trim());
  params.set("_page", String(currentPage));
  params.set("_limit", String(pageSize));

  const path = `/customers?${params.toString()}`;
  const base = resolveBase();
  let res: Response;
  try {
    res = await fetch(`${base}${path}`, { cache: "no-store" });
  } catch (error) {
    unstable_rethrow(error);
    throw createNetworkError(path, error);
  }
  if (!res.ok) throwForResponse(res, path);

  const customers = (await res.json()) as Customer[];
  const totalHeader = res.headers.get("X-Total-Count");
  const total = totalHeader ? parseInt(totalHeader, 10) : customers.length;
  return {
    customers,
    total,
    totalPages: Math.max(1, Math.ceil(total / pageSize)),
    page: currentPage,
  };
}

export function updateCustomer(id: string, input: CustomerEditInput) {
  return apiMutate<Customer>(`/customers/${id}`, "PATCH", input);
}

export function updateCustomerProfile(id: string, input: CustomerProfileInput) {
  return apiMutate<Customer>(`/customers/${id}`, "PATCH", input);
}

export function updateWishlist(customerId: string, wishlist: string[]) {
  return apiMutate<Customer>(`/customers/${customerId}`, "PATCH", { wishlist });
}

export type { Customer, UserRole };
