import { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from "aws-lambda";
import { sendResponse } from "../../utils/response-utils";
import { createExpense } from "../../db/db-handler";
import { IExpense } from "../../types/expense";

export const handler: Handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    if (!event.body) {
      return sendResponse(400, "Invalid request", {});
    }
    const data = JSON.parse(event.body);
    const expense: IExpense = {
        amount: data.amount,
        description: data.description,
        date: data.date,
        category: data.category,
        userId: "123",
    };
    await createExpense(expense);
    return sendResponse(200, "Expense created", {});
  } catch (error) {
    console.log(error);
    return sendResponse(500, "Error occurred", {});
  }
};
