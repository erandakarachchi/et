import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Expense {
  amount: number;
  description: string;
  category: string;
  date: string;
}

const addExpense = async (expense: Expense) => {
  const response = await fetch("https://mvku1vlwcg.execute-api.us-east-1.amazonaws.com/prod/expenses", {
    method: "POST",
    body: JSON.stringify(expense),
  });
  if (!response.ok) {
    throw new Error("Failed to add expense");
  }
  return response.json();
};

export const useAddExpenses = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    },
  });
};
