import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../constants";
import { NewExpense } from "@/types/expense";
import { useAPI } from "@/lib/providers/APIProvider";

export const useAddExpenses = () => {
  const queryClient = useQueryClient();

  const apiClient = useAPI();

  return useMutation({
    mutationFn: (expense: NewExpense) => apiClient.addExpense(expense),
    retry: false,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.EXPENSES] });
    },
  });
};
