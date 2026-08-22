import type { UserRole } from "@/features/customers/types";
import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    phone: string;
    role: UserRole;
    wishlist: string[];
  }

  interface Session {
    user: {
      id: string;
      phone: string;
      role: UserRole;
      wishlist: string[];
      active: boolean;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    phone: string;
    role: UserRole;
    wishlist: string[];
    active?: boolean;
    revalidatedAt?: number;
  }
}
