import FeaturedProductsClient from "./FeaturedProductsClient";
import { getFeaturedProducts } from "@/features/products/api";

export default async function FeaturedProducts() {
	const products = await getFeaturedProducts();
	return (
		<FeaturedProductsClient initialProducts={products} fetchedAt={Date.now()} />
	);
}
