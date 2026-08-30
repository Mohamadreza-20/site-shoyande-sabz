import type { Metadata } from "next";
<<<<<<< HEAD
=======
import Sidebar from "@/features/dashboard/components/Sidebar";
import TopHeader from "@/features/dashboard/components/TopHeader";
>>>>>>> origin/main
import PageHeader from "@/features/dashboard/components/PageHeader";
import ArticleForm from "@/features/blog/components/admin/ArticleForm";

export const metadata: Metadata = {
  title: "ایجاد مقاله | پنل مدیریت شست‌وشو سبز",
  description: "افزودن مقاله جدید به بلاگ فروشگاه شست‌وشو سبز.",
};

export default function CreateArticlePage() {
  return (
<<<<<<< HEAD
    <>
      <PageHeader
        title="ایجاد مقاله جدید"
        description="اطلاعات مقاله را وارد کنید و آن را منتشر کنید."
      />
      <ArticleForm />
    </>
=======
    <div className="flex min-h-screen w-full flex-col bg-admin-bg lg:flex-row">
      <main className="flex flex-1 flex-col gap-6 px-4 py-6 sm:px-10 sm:py-8">
        <TopHeader />
        <PageHeader
          title="ایجاد مقاله جدید"
          description="اطلاعات مقاله را وارد کنید و آن را منتشر کنید."
        />
        <ArticleForm />
      </main>
      <Sidebar />
    </div>
>>>>>>> origin/main
  );
}
