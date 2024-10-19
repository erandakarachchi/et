import { APIGatewayProxyEvent } from "aws-lambda";
import { v4 as uuidv4 } from "uuid";

export const generateUUID = () => {
  return uuidv4();
};

export const getUserIdFromEventContext = (event: APIGatewayProxyEvent) => {
  const userId = event.requestContext.authorizer?.userId;
  if (!userId) {
    throw new Error("Unauthorized");
  }
  return userId;
};
