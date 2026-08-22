import type { Metadata } from "next";
import { Suspense } from "react";
import Sidebar from "@/features/dashboard/components/Sidebar";
import TopHeader from "@/features/dashboard/components/TopHeader";
import PageHeader from "@/features/dashboard/components/PageHeader";
import UsersTable from "@/features/customers/components/UsersTable";
import UsersStats from "@/features/customers/components/UsersStats";
import { getCustomers, getCustomersFiltered } from "@/features/customers/api";

export const metadata: Metadata = {
  title: "کاربران | پنل مدیریت شست‌وشو سبز",
  description: "مدیریت کاربران و مشتریان فروشگاه شست‌وشو سبز.",
};

const ADMIN_USERS_PAGE_SIZE = 12;

export default async function AdminUsersPage() {
  const [customers, firstPage] = await Promise.all([
    getCustomers(),
    getCustomersFiltered({ page: 1, pageSize: ADMIN_USERS_PAGE_SIZE }),
  ]);
  const fetchedAt = Date.now();

  return (
    <div className="flex min-h-screen w-full flex-col bg-admin-bg lg:flex-row">
      <main className="flex flex-1 flex-col gap-6 px-4 py-6 sm:px-10 sm:py-8">
        <TopHeader />
        <PageHeader
          title="مدیریت کاربران"
          description="فهرست کاربران ثبت‌نام‌شده، وضعیت فعالیت و سابقه خرید هرکدام"
        />

        <UsersStats initialCustomers={customers} fetchedAt={fetchedAt} />

        <Suspense fallback={null}>
          <UsersTable initialResult={firstPage} pageSize={ADMIN_USERS_PAGE_SIZE} fetchedAt={fetchedAt} />
        </Suspense>
      </main>
      <Sidebar />
    </div>
  );
}
