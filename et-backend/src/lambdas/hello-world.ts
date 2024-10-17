import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Handler,
} from "aws-lambda";
import { sendResponse } from "../utils/response-utils";

export const handler: Handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    return sendResponse(200, "Hello World", {});
  } catch (error) {
    return sendResponse(500, "Error occurred", {});
  }
};
