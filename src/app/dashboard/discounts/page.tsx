import { fetchedAtNow } from "@/lib/http";
import type { Metadata } from "next";
import PageHeader from "@/features/dashboard/components/PageHeader";
import DiscountsTable from "@/features/discounts/components/DiscountsTable";
import DiscountsStats from "@/features/discounts/components/DiscountsStats";
import { getDiscounts } from "@/features/discounts/api";

export const metadata: Metadata = {
  title: "Discounts | Admin",
  description: "Manage discount codes and sales campaigns.",
};

export default async function AdminDiscountsPage() {
  const discounts = await getDiscounts();
  const fetchedAt = fetchedAtNow();

  return (
    <>
      <PageHeader
        title="Manage discounts"
        description="Create, edit and track usage of store discount codes"
      />

      <DiscountsStats initialDiscounts={discounts} fetchedAt={fetchedAt} />

      <DiscountsTable discounts={discounts} fetchedAt={fetchedAt} />
    </>
  );
}
