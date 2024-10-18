import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../constants";

const fetchStatistics = async () => {
  const response = await fetch("https://mvku1vlwcg.execute-api.us-east-1.amazonaws.com/prod/user/statistics");
  const data = await response.json();
  return data;
};

export const useStatistics = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.USER],
    queryFn: fetchStatistics,
  });
};
