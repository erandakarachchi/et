import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../constants";
import { useAPI } from "@/lib/providers/APIProvider";

export const useStatistics = () => {
  const apiClient = useAPI();

  return useQuery({
    queryKey: [QUERY_KEYS.STATISTICS],
    queryFn: () => apiClient.getStatistics(),
    retry: false,
  });
};
