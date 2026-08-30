import {
	updateCustomerProfile,
	updateWishlist,
} from "@/features/customers/api";
import { apiErrorMessage } from "@/lib/http";
import type { ActionResult, AuthUser } from "../types";

export async function toggleUserWishlist(
	user: AuthUser,
	productId: string,
	refreshSession: (data: { wishlist: string[] }) => Promise<unknown>,
) {
	const isInWishlist = user.wishlist.includes(productId);
	const nextWishlist = isInWishlist
		? user.wishlist.filter((id) => id !== productId)
		: [...user.wishlist, productId];
	await updateWishlist(user.id, nextWishlist);
	await refreshSession({ wishlist: nextWishlist });
	return true;
}

export async function updateUserProfile(
	user: AuthUser,
	input: { name: string; email: string; phone: string },
	refreshSession: (data: {
		name: string;
		email: string;
		phone: string;
	}) => Promise<unknown>,
): Promise<ActionResult> {
	try {
		const updated = await updateCustomerProfile(user.id, input);
		await refreshSession({
			name: updated.name,
			email: updated.email,
			phone: updated.phone,
		});
		return {
			ok: true,
			user: {
				id: updated.id,
				name: updated.name,
				email: updated.email,
				phone: updated.phone,
				role: updated.role,
				wishlist: updated.wishlist ?? [],
			},
		};
	} catch (error) {
		return { ok: false, error: apiErrorMessage(error) };
	}
}
