import CategoryShowcaseClient from "./CategoryShowcaseClient";
import { getCategories } from "@/features/products/api";

export default async function CategoryShowcase() {
  const categories = await getCategories();
  return <CategoryShowcaseClient initialCategories={categories} fetchedAt={Date.now()} />;
}
