import { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from "aws-lambda";
import { sendResponse } from "../../utils/response-utils";
import { getUserByClerkId, viewAllExpenses } from "../../db/db-handler";
import { getUserIdFromEventContext } from "../../utils/utils";

export const handler: Handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const userId = getUserIdFromEventContext(event);
    const expenses = await viewAllExpenses(userId,{});
    const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
    const user = await getUserByClerkId(userId);
    const expenseCategories = user?.categories;

    const totalExpensesPerCategory = expenseCategories!.map((category) => {
      const totalExpensesForCategory = expenses
        .filter((expense) => expense.category === category.id)
        .reduce((total, expense) => total + expense.amount, 0);
      return {
        name: category.name,
        totalExpenses: totalExpensesForCategory,
      };
    });

    const sortedExpensesPerCategory = totalExpensesPerCategory.sort((a, b) => b.totalExpenses - a.totalExpenses);
    const topSpendingCategory = sortedExpensesPerCategory[0];
    const consumedPercentage = Math.round((totalExpenses / (user?.maxMonthlyExpenseLimit ?? 1)) * 100);
    const dailyAverageExpense = totalExpenses / 30; // Assuming 30 days in a month and query by month
    const remainingPercentage = 100 - consumedPercentage;

    const response = {
      totalExpenses,
      totalExpensesPerCategory,
      consumedPercentage,
      remainingPercentage,
      dailyAverageExpense,
      topSpendingCategory,
      maxMonthlyExpenseLimit: user?.maxMonthlyExpenseLimit ?? 0,
      remainingExpenseLimit: (user?.maxMonthlyExpenseLimit ?? 0) - totalExpenses,
    };
    return sendResponse(200, "View all expenses", response);
  } catch (error) {
    console.error("Error in statistics handler:", error);
    return sendResponse(500, "Error occurred", { error: (error as Error).message });
  }
};
