import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../constants";
import { ExpensesApi } from "@/lib/api/expenses";
import { NewExpense } from "@/types/expense";

// const expensesApi = ExpensesApi.getInstance();

const expensesApi = new ExpensesApi();

export const useAddExpenses = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (expense: NewExpense) => expensesApi.addExpense(expense),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.EXPENSES] });
    },
  });
};
