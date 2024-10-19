import { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from "aws-lambda";
import { sendResponse } from "../../utils/response-utils";
import { viewAllExpenses } from "../../db/db-handler";
import { getUserIdFromEventContext } from "../../utils/utils";

export const handler: Handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const userId = getUserIdFromEventContext(event);
    const expenses = await viewAllExpenses(userId);
    return sendResponse(200, "View all expenses", expenses);
  } catch (error) {
    return sendResponse(500, "Error occurred", {});
  }
};
