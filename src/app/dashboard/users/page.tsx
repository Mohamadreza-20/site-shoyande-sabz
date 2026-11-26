import { fetchedAtNow } from "@/lib/http";
import type { Metadata } from "next";
import { Suspense } from "react";
import PageHeader from "@/features/dashboard/components/PageHeader";
import UsersTable from "@/features/customers/components/UsersTable";
import UsersStats from "@/features/customers/components/UsersStats";
import { getCustomers, getCustomersFiltered } from "@/features/customers/api";

export const metadata: Metadata = {
  title: "Users | Admin",
  description: "Manage store users and customers.",
};

const ADMIN_USERS_PAGE_SIZE = 12;

export default async function AdminUsersPage() {
  const [customers, firstPage] = await Promise.all([
    getCustomers(),
    getCustomersFiltered({ page: 1, pageSize: ADMIN_USERS_PAGE_SIZE }),
  ]);
  const fetchedAt = fetchedAtNow();

  return (
    <>
      <PageHeader
        title="Manage users"
        description="Registered users, their activity and purchase history"
      />

      <UsersStats initialCustomers={customers} fetchedAt={fetchedAt} />

      <Suspense fallback={null}>
        <UsersTable
          initialResult={firstPage}
          pageSize={ADMIN_USERS_PAGE_SIZE}
          fetchedAt={fetchedAt}
        />
      </Suspense>
    </>
  );
}
