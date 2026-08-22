export type CustomerStatus = "active" | "inactive";

export type UserRole = "customer" | "manager" | "support";

export type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  ordersCount: number;
  totalSpent: string;
  joinDate: string;
  status: CustomerStatus;
  password: string;
  role: UserRole;
  wishlist: string[];
};

export type CustomerEditInput = {
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  status: CustomerStatus;
};

export type CustomerProfileInput = {
  name: string;
  email: string;
  phone: string;
};

export type CustomerListQuery = {
  search?: string;
  page?: number;
  pageSize?: number;
};

export type CustomerListResult = {
  customers: Customer[];
  total: number;
  totalPages: number;
  page: number;
};
