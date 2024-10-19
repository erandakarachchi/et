// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { QUERY_KEYS } from "../constants";
// import { NewExpense } from "@/types/expense";
// import { useAPI } from "@/lib/providers/APIProvider";

import { useAPI } from "@/lib/providers/APIProvider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../constants";

export const useDeleteExpense = () => {
  const queryClient = useQueryClient();
  const apiClient = useAPI();

  return useMutation({
    mutationFn: (expenseId: string) => apiClient.deleteExpense(expenseId),
    retry: false,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.EXPENSES] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.STATISTICS] });
    },
  });
};
