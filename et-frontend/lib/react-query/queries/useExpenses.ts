import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../constants";
import { useAPI } from "@/lib/providers/APIProvider";

export const useExpenses = () => {
  const apiClient = useAPI();

  return useQuery({
    queryKey: [QUERY_KEYS.EXPENSES],
    queryFn: () => apiClient.getExpenses(),
    retry: false,
  });
};
