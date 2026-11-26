import type { UserRole } from "./types";

export function roleLabel(role: UserRole) {
  if (role === "manager") return "Store manager";
  if (role === "support") return "Support";
  return "Customer";
}
