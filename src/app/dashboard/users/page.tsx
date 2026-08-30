import type { Metadata } from "next";
import { Suspense } from "react";
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
    <>
      <PageHeader
        title="مدیریت کاربران"
        description="فهرست کاربران ثبت‌نام‌شده، وضعیت فعالیت و سابقه خرید هرکدام"
      />

      <UsersStats initialCustomers={customers} fetchedAt={fetchedAt} />

      <Suspense fallback={null}>
        <UsersTable initialResult={firstPage} pageSize={ADMIN_USERS_PAGE_SIZE} fetchedAt={fetchedAt} />
      </Suspense>
    </>
  );
}
