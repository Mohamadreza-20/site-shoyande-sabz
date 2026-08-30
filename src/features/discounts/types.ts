export type DiscountStatus = "active" | "expired" | "scheduled";

export type Discount = {
  id: string;
  code: string;
  type: "percent" | "fixed";
  value: string;
  usage: string;
  expiry: string;
  status: DiscountStatus;
};

export type DiscountInput = {
  code: string;
  type: Discount["type"];
  value: string;
  usage: string;
  expiry: string;
  status: DiscountStatus;
};
