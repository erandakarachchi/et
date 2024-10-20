import axios, { AxiosInstance } from "axios";
import { BaseApi } from "./base";
import { Expense } from "@/types/expense";
import { ExpenseFilter } from "../react-query/queries/useExpenses";

export interface GenericResponse<T> {
  message: string;
  data: T;
}

export interface ExpenseCategory {
  name: string;
  totalExpenses: number;
}

export interface ExpenseStatistics {
  totalExpenses: number;
  consumedPercentage: number;
  remainingPercentage: number;
  dailyAverageExpense: number;
  topSpendingCategory: ExpenseCategory;
  totalExpensesPerCategory: ExpenseCategory[];
  maxMonthlyExpenseLimit: number;
  remainingExpenseLimit: number;
}

export class APIClient extends BaseApi {
  constructor(authToken: string | null) {
    if (!authToken) {
      throw new Error("Auth token is required");
    }

    const axiosInstance = axios.create({
      baseURL: "https://2djdql9jm1.execute-api.us-east-1.amazonaws.com/prod",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      withCredentials: false,
    });
    super(axiosInstance);
  }

  async getCategories(): Promise<any> {
    const data = await this.get("/user/categories");
    return data;
  }

  async getExpenses(filter?: ExpenseFilter): Promise<GenericResponse<Expense[]>> {
    const queryParams = new URLSearchParams();
    if (filter?.categoryId && filter.categoryId !== "all") {
      queryParams.append("categoryId", filter.categoryId);
    }
    if (queryParams) {
      const queryString = queryParams.toString();
      return this.get(`/expenses?${queryString}`);
    }
    return this.get("/expenses");
  }

  async createExpense(data: any): Promise<any> {
    return this.post("/expenses", data);
  }

  async onboardUser(data: any): Promise<void> {
    return this.post("/user", data);
  }

  async getStatistics(): Promise<GenericResponse<ExpenseStatistics>> {
    return this.get("/user/statistics");
  }

  async addExpense(data: any): Promise<any> {
    return this.post("/expenses", data);
  }

  async deleteExpense(expenseId: string): Promise<any> {
    return this.delete(`/expenses/${expenseId}`);
  }

  async editExpense(expenseId: string, data: any): Promise<any> {
    return this.put(`/expenses/${expenseId}`, data);
  }
}
