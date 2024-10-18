import { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from "aws-lambda";
import { sendResponse } from "../../utils/response-utils";
import { getUserById } from "../../db/db-handler";

export const handler: Handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const user = await getUserById("6711d3373424dc7e41444d67");
    const categories = user?.categories || [];
    return sendResponse(200, "User Categories", categories);
  } catch (error) {
    return sendResponse(500, "Error occurred", {});
  }
};
