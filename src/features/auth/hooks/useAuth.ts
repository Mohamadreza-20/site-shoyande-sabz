"use client";

import { useCallback, useMemo } from "react";
import { signOut, useSession } from "next-auth/react";
import { loginWithCredentials, mapSessionUser, signupWithCredentials } from "../services/session.service";
import { toggleUserWishlist, updateUserProfile } from "../services/account.service";
import type { ActionResult, AuthUser } from "../types";
import type { SignupInput } from "../validation";

export function useAuth() {
  const { data: session, status, update } = useSession();
  const hydrated = status !== "loading";
  const user: AuthUser | null = useMemo(() => mapSessionUser(session?.user), [session]);

  const login = useCallback(
    (identifier: string, password: string) => loginWithCredentials(identifier, password, update),
    [update]
  );

  const signup = useCallback(
    (input: SignupInput): Promise<ActionResult> => signupWithCredentials(input, update),
    [update]
  );

  const logout = useCallback(() => signOut({ redirect: false }), []);

  const toggleWishlist = useCallback(
    async (productId: string) => {
      if (!user) return false;
      try {
        return await toggleUserWishlist(user, productId, update);
      } catch {
        return false;
      }
    },
    [user, update]
  );

  const updateProfile = useCallback(
    async (input: { name: string; email: string; phone: string }) => {
      if (!user) return { ok: false as const, error: "ابتدا وارد حساب کاربری خود شوید." };
      return updateUserProfile(user, input, update);
    },
    [user, update]
  );

  return { user, hydrated, login, signup, logout, toggleWishlist, updateProfile };
}
