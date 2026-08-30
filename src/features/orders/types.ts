export type OrderStatus = "shipped" | "processing" | "delivered" | "cancelled";

export type Order = {
  id: number;
  orderNumber: string;
  customer: string;
  customerId?: string;
  products: string;
  date: string;
  amount: string;
  status: OrderStatus;
};
