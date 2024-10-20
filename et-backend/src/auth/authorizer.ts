import { APIGatewayTokenAuthorizerEvent, APIGatewayAuthorizerResult } from "aws-lambda";
import { verify } from "jsonwebtoken";

const publicKey = `

`;

export const handler = async (event: APIGatewayTokenAuthorizerEvent): Promise<APIGatewayAuthorizerResult> => {
  console.log("Authorizer event:", JSON.stringify(event, null, 2));

  try {
    const token = event.authorizationToken.split(" ")[1];
    const decodedToken = verify(token, publicKey);

    const userId = decodedToken.sub;

    if (!userId) {
      throw new Error("Unauthorized");
    }

    const authResponse: APIGatewayAuthorizerResult = {
      principalId: "user",
      policyDocument: {
        Version: "2012-10-17",
        Statement: [
          {
            Action: "execute-api:Invoke",
            Effect: "Allow",
            Resource: "arn:aws:execute-api:*:*:*/*",
          },
        ],
      },
      context: {
        userId: userId.toString(),
      },
    };
    return authResponse;
  } catch (error) {
    console.error("Authorization failed:", error);
    throw new Error("Unauthorized");
  }
};
