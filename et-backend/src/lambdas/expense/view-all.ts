import { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from "aws-lambda";
import { sendResponse } from "../../utils/response-utils";
import { getUserByClerkId, viewAllExpenses } from "../../db/db-handler";
import { getUserIdFromEventContext } from "../../utils/utils";

export const handler: Handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const userId = getUserIdFromEventContext(event);
    const { date, categoryId } = event.queryStringParameters || {};

    const [user, expenses] = await Promise.all([
      getUserByClerkId(userId),
      viewAllExpenses(userId, { date, categoryId }),
    ]);

    const categories = user?.categories;
    const cleanedExpenses = expenses.map((expense) => {
      const category = categories?.find((cat) => cat.id === expense.category);
      return {
        id: expense._id.toString(),
        amount: expense.amount,
        description: expense.description,
        date: expense.date,
        category: category?.name || "UnCategorized",
        userId: expense.userId,
      };
    });

    return sendResponse(200, "View all expenses", cleanedExpenses);
  } catch (error) {
    return sendResponse(500, "Error occurred", {});
  }
};
