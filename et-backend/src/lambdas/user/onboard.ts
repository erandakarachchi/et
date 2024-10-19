import { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from "aws-lambda";
import { sendResponse } from "../../utils/response-utils";
import { IUser } from "../../types/user";
import { createUser } from "../../db/db-handler";
import { getUserIdFromEventContext } from "../../utils/utils";

export const handler: Handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    if (!event.body) {
      return sendResponse(400, "Invalid request", {});
    }
    const userId = getUserIdFromEventContext(event);
    const data = JSON.parse(event.body);
    const user: IUser = {
      email: data.email,
      name: data.name,
      maxMonthlyExpenseLimit: data.maxMonthlyExpenseLimit,
      clerkId: userId,
    };
    const newUser = await createUser(user);
    return sendResponse(200, "User onBoarded", newUser);
  } catch (error) {
    return sendResponse(500, "Error occurred", {});
  }
};
