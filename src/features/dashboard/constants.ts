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
  { label: "Dashboard", icon: "home", href: "/dashboard" },
  { label: "Products", icon: "leaf", href: "/dashboard/products" },
  { label: "Orders", icon: "shoppingBag", href: "/dashboard/orders" },
  { label: "Categories", icon: "grid", href: "/dashboard/categories" },
  { label: "Customers", icon: "users", href: "/dashboard/users" },
  { label: "Messages", icon: "messageSquare", href: "/dashboard/messages" },
  { label: "Write article", icon: "fileText", href: "/dashboard/blog/create" },
  { label: "Discounts", icon: "percent", href: "/dashboard/discounts" },
  { label: "Reports", icon: "barChart", href: "/dashboard/reports" },
  { label: "Settings", icon: "settings", href: "/dashboard/settings" },
] as const;
