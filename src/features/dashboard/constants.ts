export const sidebarNav: {
  label: string;
  icon:
    | "home"
    | "leaf"
    | "shoppingBag"
    | "grid"
    | "users"
    | "percent"
    | "barChart"
    | "settings"
    | "messageSquare"
    | "fileText";
  href: string;
}[] = [
  { label: "داشبورد", icon: "home", href: "/dashboard" },
  { label: "محصولات", icon: "leaf", href: "/dashboard/products" },
  { label: "سفارشات", icon: "shoppingBag", href: "/dashboard/orders" },
  { label: "دسته‌بندی‌ها", icon: "grid", href: "/dashboard/categories" },
  { label: "کاربران", icon: "users", href: "/dashboard/users" },
  { label: "پیام‌های تماس", icon: "messageSquare", href: "/dashboard/messages" },
  { label: "ایجاد مقاله", icon: "fileText", href: "/dashboard/blog/create" },
  { label: "تخفیف‌ها", icon: "percent", href: "/dashboard/discounts" },
  { label: "گزارشات", icon: "barChart", href: "/dashboard/reports" },
  { label: "تنظیمات", icon: "settings", href: "/dashboard/settings" },
] as const;
