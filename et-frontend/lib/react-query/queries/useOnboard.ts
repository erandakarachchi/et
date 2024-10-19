import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../constants";
import { useAPI } from "@/lib/providers/APIProvider";

interface Onboard {
  name: string;
  email: string;
  maxMonthlyExpenseLimit: number;
}

export const useOnboard = () => {
  const queryClient = useQueryClient();
  const apiClient = useAPI();

  return useMutation({
    mutationFn: (data: Onboard) => apiClient.onboardUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER] });
    },
    retry: false,
  });
};
