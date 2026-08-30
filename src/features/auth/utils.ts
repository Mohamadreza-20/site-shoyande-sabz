import type { UserRole } from "./types";

export function roleLabel(role: UserRole) {
  if (role === "manager") return "مدیر فروشگاه";
  if (role === "support") return "پشتیبانی";
  return "مشتری";
}
