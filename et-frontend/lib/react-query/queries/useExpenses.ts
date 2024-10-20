import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../constants";
import { useAPI } from "@/lib/providers/APIProvider";

export interface ExpenseFilter {
  categoryId?: string;
  date?: string;
}

export const useExpenses = (filter?: ExpenseFilter) => {
  const apiClient = useAPI();

  return useQuery({
    queryKey: [QUERY_KEYS.EXPENSES, filter],
    queryFn: () => apiClient.getExpenses(filter),
    retry: false,
  });
};
