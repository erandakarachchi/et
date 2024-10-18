import { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from "aws-lambda";
import { sendResponse } from "../../utils/response-utils";
import { getUserById, viewAllExpenses } from "../../db/db-handler";

export const handler: Handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const expenses = await viewAllExpenses();
    const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
    const user = await getUserById("6711d3373424dc7e41444d67");
    const expenseCategories = user?.categories;
    const totalExpensesPerCategory = expenseCategories?.map((category) => {
      const totalExpensesForCategory = expenses
        .filter((expense) => expense.category === category.name)
        .reduce((total, expense) => total + expense.amount, 0);
      return {
        name: category.name,
        totalExpenses: totalExpensesForCategory,
      };
    });

    const response = {
      expenseCategories,
      totalExpenses,
      totalExpensesPerCategory,
      maxMonthlyExpenseLimit: user?.maxMonthlyExpenseLimit ?? 0,
      remainingExpenseLimit: (user?.maxMonthlyExpenseLimit ?? 0) - totalExpenses,
    };
    return sendResponse(200, "View all expenses", response);
  } catch (error) {
    console.error("Error in statistics handler:", error);
    return sendResponse(500, "Error occurred", { error: (error as Error).message });
  }
};
