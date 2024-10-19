import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../constants";
import { useAPI } from "@/lib/providers/APIProvider";

export const useCategories = () => {
  const apiClient = useAPI();
  return useQuery({
    queryKey: [QUERY_KEYS.USER],
    queryFn: () => apiClient.getCategories(),
    retry: false,
  });
};
