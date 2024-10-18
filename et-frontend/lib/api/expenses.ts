import { Expense, NewExpense } from "@/types/expense";
import { BaseApi } from "./base";

const BASE_URL = "https://mvku1vlwcg.execute-api.us-east-1.amazonaws.com/prod";
const EXPENSES_URL = `${BASE_URL}/expenses`;

export class ExpensesApi extends BaseApi {
  private static instance: ExpensesApi;

   constructor() {
    super(BASE_URL);
  }

  public static getInstance(): ExpensesApi {
    if (!ExpensesApi.instance) {
      ExpensesApi.instance = new ExpensesApi();
    }
    return ExpensesApi.instance;
  }

  async addExpense(expense: NewExpense): Promise<Expense[]> {
    console.log("Adding expense ADDDD", expense);
    const response = await this.post<Expense[]>("/expenses", expense);
    console.log("Response", response);
    return response;
  }
}

// export const addExpense = async (expense: Expense): Promise<Expense[]> => {
//   const response = await axios.post(EXPENSES_URL, expense);
//   return response.data;
// };

// export const expensesApi = {
//   addExpense: async (): Promise<Expense[]> => {
//     const { data } = await axios.post("https://mvku1vlwcg.execute-api.us-east-1.amazonaws.com/prod/expenses", expense);
//     return data;
//   },
// };

// const addExpense = async (expense: Expense) => {
//     const response = await fetch("https://mvku1vlwcg.execute-api.us-east-1.amazonaws.com/prod/expenses", {
//       method: "POST",
//       body: JSON.stringify(expense),
//     });
//     if (!response.ok) {
//       throw new Error("Failed to add expense");
//     }
//     return response.json();
//   };
