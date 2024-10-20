import { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from "aws-lambda";
import { sendResponse } from "../../utils/response-utils";
import { IExpense } from "../../types/expense";
import { getUserIdFromEventContext } from "../../utils/utils";
import { updateExpense } from "../../db/db-handler";

export const handler: Handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    if (!event.body) {
      return sendResponse(400, "Invalid request", {});
    }

    const expenseId = event.pathParameters?.expenseId;
    if (!expenseId) {
      return sendResponse(400, "Invalid request", {});
    }
    const userId = getUserIdFromEventContext(event);
    const data = JSON.parse(event.body);

    await updateExpense(expenseId, data);

    return sendResponse(200, "Expense updated", {});
  } catch (error) {
    console.log(error);
    return sendResponse(500, "Error occurred", {});
  }
};
