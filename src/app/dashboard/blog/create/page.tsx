import type { Metadata } from "next";
import PageHeader from "@/features/dashboard/components/PageHeader";
import ArticleForm from "@/features/blog/components/admin/ArticleForm";

export const metadata: Metadata = {
  title: "Create article | Admin",
  description: "Add a new article to the Leafwash blog.",
};

export default function CreateArticlePage() {
  return (
    <>
      <PageHeader
        title="Create new article"
        description="Enter the article details and publish it."
      />
      <ArticleForm />
    </>
  );
}
