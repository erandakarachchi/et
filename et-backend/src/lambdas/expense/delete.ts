import { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from "aws-lambda";
import { sendResponse } from "../../utils/response-utils";
import { getUserIdFromEventContext } from "../../utils/utils";
import { deleteExpenseById } from "../../db/db-handler";

export const handler: Handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const userId = getUserIdFromEventContext(event);
    const expenseId = event.pathParameters?.expenseId;

    console.log("expense id", expenseId);

    if (!expenseId) {
      return sendResponse(400, "Invalid request", {});
    }

    const deleted = await deleteExpenseById(expenseId);
    if (!deleted) {
      return sendResponse(404, "Expense not found", {});
    }

    return sendResponse(200, "Expense deleted", {});
  } catch (error) {
    console.log(error);
    return sendResponse(500, "Error occurred", {});
  }
};
