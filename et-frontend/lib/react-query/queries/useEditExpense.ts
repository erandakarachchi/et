import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../constants";
import { NewExpense } from "@/types/expense";
import { useAPI } from "@/lib/providers/APIProvider";

export const useEditExpense = () => {
  const queryClient = useQueryClient();

  const apiClient = useAPI();
  return useMutation({
    mutationFn: ({ expenseId, expense }: { expenseId: string; expense: NewExpense }) =>
      apiClient.editExpense(expenseId, expense),
    retry: false,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.EXPENSES] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.STATISTICS] });
    },
  });
};
