import type { Metadata } from "next";
import PageHeader from "@/features/dashboard/components/PageHeader";
import ArticleForm from "@/features/blog/components/admin/ArticleForm";

export const metadata: Metadata = {
  title: "ایجاد مقاله | پنل مدیریت شست‌وشو سبز",
  description: "افزودن مقاله جدید به بلاگ فروشگاه شست‌وشو سبز.",
};

export default function CreateArticlePage() {
  return (
    <>
      <PageHeader
        title="ایجاد مقاله جدید"
        description="اطلاعات مقاله را وارد کنید و آن را منتشر کنید."
      />
      <ArticleForm />
    </>
  );
}
