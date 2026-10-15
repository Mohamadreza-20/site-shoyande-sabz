"use client";

import dynamic from "next/dynamic";
import type { Category, Product } from "@/features/products/types";

const ProductModal = dynamic(() => import("../ProductModal"), { ssr: false });
const ConfirmDeleteModal = dynamic(
	() => import("@/components/ui/ConfirmDeleteModal"),
	{ ssr: false },
);

export default function ProductsTableDialogs({
	modalOpen,
	editingProduct,
	categories,
	onCloseModal,
	confirmDeleteProduct,
	onCloseDelete,
	onConfirmDelete,
	deleteLoading,
}: {
	modalOpen: boolean;
	editingProduct: Product | null;
	categories: Category[];
	onCloseModal: () => void;
	confirmDeleteProduct: Product | null;
	onCloseDelete: () => void;
	onConfirmDelete: () => Promise<void>;
	deleteLoading: boolean;
}) {
	return (
		<>
			<ProductModal
				open={modalOpen}
				onClose={onCloseModal}
				onSaved={onCloseModal}
				product={editingProduct}
				categories={categories}
			/>
			<ConfirmDeleteModal
				open={confirmDeleteProduct !== null}
				onClose={onCloseDelete}
				onConfirm={onConfirmDelete}
				itemLabel={
					confirmDeleteProduct ? `محصول «${confirmDeleteProduct.title}»` : ""
				}
				loading={deleteLoading}
			/>
		</>
	);
}
