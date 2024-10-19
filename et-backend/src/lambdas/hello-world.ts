import { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from "aws-lambda";
import { sendResponse } from "../utils/response-utils";
import { getUserIdFromEventContext } from "../utils/utils";

export const handler: Handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    // const data = await saveExpense({});
    const userId = getUserIdFromEventContext(event);
    const context = event.requestContext.authorizer?.context;
    return sendResponse(200, "Hello World", {
      userId: userId,
    });
  } catch (error) {
    return sendResponse(500, "Error occurred", {});
  }
};
