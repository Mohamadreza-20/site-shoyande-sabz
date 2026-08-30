import type { UserRole } from "@/features/customers/api";

export type { UserRole };

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  wishlist: string[];
};

export type ActionResult =
  | { ok: true; user: AuthUser }
  | { ok: false; error: string };
