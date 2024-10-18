import { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from "aws-lambda";
import { sendResponse } from "../utils/response-utils";

export const handler: Handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    // const data = await saveExpense({});
    const context = event.requestContext.authorizer?.context;
    return sendResponse(200, "Hello World", {
      event: JSON.stringify(event),
    });
  } catch (error) {
    return sendResponse(500, "Error occurred", {});
  }
};
