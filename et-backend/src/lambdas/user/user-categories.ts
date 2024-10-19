import { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from "aws-lambda";
import { sendResponse } from "../../utils/response-utils";
import { getUserByClerkId } from "../../db/db-handler";
import { getUserIdFromEventContext } from "../../utils/utils";

export const handler: Handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const userId = getUserIdFromEventContext(event);
    const user = await getUserByClerkId(userId);
    const categories = user?.categories || [];
    return sendResponse(200, "User Categories", categories);
  } catch (error) {
    return sendResponse(500, "Error occurred", {});
  }
};
