import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCustomers, getCustomersFiltered, updateCustomer } from "../api";
import type { Customer, CustomerEditInput, CustomerListResult } from "../types";
import { customerKeys } from "../queryKeys";

export function useCustomers(initialData?: Customer[], initialDataUpdatedAt?: number) {
  return useQuery({
    queryKey: customerKeys.list(),
    queryFn: getCustomers,
    initialData,
    initialDataUpdatedAt,
    staleTime: 15_000,
    refetchOnWindowFocus: true,
  });
}

export function useCustomersPage(
  { search, page, pageSize }: { search: string; page: number; pageSize: number },
  initialData?: CustomerListResult,
  initialDataUpdatedAt?: number
) {
  return useQuery({
    queryKey: customerKeys.adminPage(search, page),
    queryFn: () => getCustomersFiltered({ search, page, pageSize }),
    initialData: page === 1 && !search ? initialData : undefined,
    initialDataUpdatedAt: page === 1 && !search ? initialDataUpdatedAt : undefined,
    placeholderData: keepPreviousData,
    staleTime: 15_000,
  });
}

export function useUpdateCustomer() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: CustomerEditInput }) =>
      updateCustomer(id, input),
    onSuccess: (data, variables) => {
      queryClient.setQueryData(customerKeys.detail(variables.id), data);
      queryClient.setQueryData<Customer[]>(customerKeys.list(), (prev) =>
        prev ? prev.map((customer) => (customer.id === variables.id ? data : customer)) : prev
      );
      queryClient.invalidateQueries({ queryKey: customerKeys.adminList() });
    },
  });
}
