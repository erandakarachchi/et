import { useQuery } from "@tanstack/react-query";


const fetchExpenses = async () => {
    const response = await fetch("https://mvku1vlwcg.execute-api.us-east-1.amazonaws.com/prod/expenses");
    const data = await response.json();
    return data;
};

export const useExpenses = () => {
    return useQuery({
        queryKey: ["expenses"],
        queryFn: fetchExpenses,
    });
};
