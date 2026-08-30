"use client";

import { useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AccountSidebar from "@/features/account/components/AccountSidebar";
import AccountStats from "@/features/account/components/AccountStats";
import EditProfileModal from "@/features/account/components/EditProfileModal";
import OrdersPanel from "@/features/orders/components/AccountOrdersPanel";
import WishlistPanel from "@/features/account/components/WishlistPanel";
import AccountMessagesPanel from "@/features/messages/components/AccountMessagesPanel";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { roleLabel } from "@/features/auth/utils";
import { useCartState, formatToman } from "@/features/cart/context/CartContext";
import { useCustomerOrders } from "@/features/orders/hooks";
import { useUserMessages } from "@/features/messages/hooks";
import { useProductsByIds } from "@/features/products/hooks";
import { StaleDataNotice } from "@/components/ui/StaleDataNotice";

const LogoutConfirmModal = dynamic(() => import("@/components/LogoutConfirmModal"), {
  ssr: false,
});

export default function AccountPage() {
  const router = useRouter();
  const { user, hydrated, logout, toggleWishlist } = useAuth();
  const { totalItems, totalPrice } = useCartState();

  const isCustomer = Boolean(user && user.role === "customer");
  const customerId = isCustomer ? user?.id : undefined;

  const { data: orders = [], isLoading: ordersLoading, isError: ordersError, refetch: refetchOrders } = useCustomerOrders(customerId);
  const { data: userMessages = [], isLoading: messagesLoading, isError: messagesError, refetch: refetchMessages } = useUserMessages(customerId);
  const wishlistIds = user?.wishlist ?? [];
  const { data: wishlistProducts = [], isLoading: wishlistLoading, isError: wishlistError, refetch: refetchWishlist } =
    useProductsByIds(wishlistIds);
  const [removingId, setRemovingId] = useState<string | null>(null);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [editProfileOpen, setEditProfileOpen] = useState(false);

  const messages = [...userMessages].sort((a, b) => {
    const aTime = new Date(a.date).getTime();
    const bTime = new Date(b.date).getTime();
    const safeATime = Number.isNaN(aTime) ? 0 : aTime;
    const safeBTime = Number.isNaN(bTime) ? 0 : bTime;
    return safeBTime - safeATime;
  });

  useEffect(() => {
    if (!hydrated) return;
    if (!user) {
      router.replace("/auth");
      return;
    }
    if (user.role !== "customer") {
      router.replace("/dashboard");
    }
  }, [hydrated, user, router]);

  const handleRemoveFromWishlist = useCallback(
    async (productId: string) => {
      setRemovingId(productId);
      const ok = await toggleWishlist(productId);
      setRemovingId(null);
      if (!ok) {
        toast.error("حذف از لیست علاقه‌مندی‌ها با خطا مواجه شد. دوباره تلاش کنید.");
        return;
      }
      toast.success("از لیست علاقه‌مندی‌ها حذف شد.");
    },
    [toggleWishlist]
  );

  const handleLogout = useCallback(async () => {
    setLogoutLoading(true);
    await logout();
    setLogoutLoading(false);
    setLogoutModalOpen(false);
    toast.success("با موفقیت از حساب کاربری خارج شدید.");
    router.push("/");
  }, [logout, router]);

  if (!hydrated || !user || user.role !== "customer") {
    return (
      <div className="flex min-h-screen w-full flex-col bg-brand-50">
        <Navbar />
        <main className="flex flex-1 items-center justify-center px-6 py-24">
          <p className="text-sm text-muted">در حال بارگذاری پنل کاربری...</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-brand-50">
      <Navbar />
      <main className="mx-auto w-full max-w-[1200px] flex-1 px-6 py-10 lg:px-[80px] lg:py-14">

        <div className="mb-8 flex items-center gap-2 text-sm text-muted">
          <Link href="/" className="cursor-pointer transition hover:text-brand-500">
            خانه
          </Link>
          <span>/</span>
          <span className="font-bold text-brand-700">پنل کاربری</span>
        </div>

        <div className="flex flex-col items-start gap-6 lg:flex-row">
          <AccountSidebar
            name={user.name}
            roleLabel={roleLabel(user.role)}
            email={user.email}
            phone={user.phone}
            onLogout={() => setLogoutModalOpen(true)}
            onEditProfile={() => setEditProfileOpen(true)}
          />

          <div className="flex w-full flex-1 flex-col gap-6">
            <AccountStats
              ordersCount={orders.length}
              cartItemsCount={totalItems}
              cartTotal={formatToman(totalPrice)}
            />
            {(ordersError || messagesError || wishlistError) && (
              <StaleDataNotice
                variant="storefront"
                onRetry={() => {
                  if (ordersError) refetchOrders();
                  if (messagesError) refetchMessages();
                  if (wishlistError) refetchWishlist();
                }}
              />
            )}
            <OrdersPanel orders={orders} loading={ordersLoading} />
            <WishlistPanel
              products={wishlistProducts}
              loading={wishlistLoading}
              removingId={removingId}
              onRemove={handleRemoveFromWishlist}
            />
            <AccountMessagesPanel messages={messages} loading={messagesLoading} />
          </div>
        </div>
      </main>
      <Footer />
      <LogoutConfirmModal
        open={logoutModalOpen}
        onClose={() => setLogoutModalOpen(false)}
        onConfirm={handleLogout}
        loading={logoutLoading}
      />
      <EditProfileModal open={editProfileOpen} onClose={() => setEditProfileOpen(false)} />
    </div>
  );
}
