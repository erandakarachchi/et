import { APIGatewayTokenAuthorizerEvent, APIGatewayAuthorizerResult } from "aws-lambda";
import { ClerkClient, createClerkClient, verifyToken } from "@clerk/backend";
import { verify } from "jsonwebtoken";

const publicKey = `
`;

export const handler = async (event: APIGatewayTokenAuthorizerEvent): Promise<APIGatewayAuthorizerResult> => {
  console.log("Authorizer event:", JSON.stringify(event, null, 2));

  try {
    const token = event.authorizationToken.split(" ")[1];
    const claims = verify(token, publicKey);

    const methodArn = event.methodArn;

    const authResponse: APIGatewayAuthorizerResult = {
      principalId: "user",
      policyDocument: {
        Version: "2012-10-17",
        Statement: [
          {
            Action: "execute-api:Invoke",
            Effect: "Allow",
            Resource: methodArn,
          },
        ],
      },
      context: {
        claims: JSON.stringify(claims),
      },
    };
    return authResponse;
  } catch (error) {
    console.error("Authorization failed:", error);
    throw new Error("Unauthorized");
  }
};
