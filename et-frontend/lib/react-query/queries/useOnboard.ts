import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../constants";

interface Onboard {
  name: string;
  email: string;
  maxMonthlyExpenseLimit: number;
}

const onboard = async (onboard: Onboard) => {
  const response = await fetch("https://mvku1vlwcg.execute-api.us-east-1.amazonaws.com/prod/user", {
    method: "POST",
    body: JSON.stringify(onboard),
  });
  if (!response.ok) {
    throw new Error("Failed to onboard");
  }
};

export const useOnboard = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: onboard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER] });
    },
  });
};
