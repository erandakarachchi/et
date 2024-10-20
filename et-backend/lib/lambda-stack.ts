import { Duration, Stack, StackProps } from "aws-cdk-lib";
import { Role } from "aws-cdk-lib/aws-iam";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import path = require("path");
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import * as dotenv from "dotenv";

interface LambdaStackProps extends StackProps {}

dotenv.config();

export class LambdaStack extends Stack {
  constructor(scope: Construct, id: string, props: LambdaStackProps) {
    super(scope, id, props);

    const defaultEnvironmentVariables = {
      MONGO_URI: process.env.MONGO_URI!,
    };

    const viewAllExpensesLambda = new NodejsFunction(this, "ViewAllExpensesLambda", {
      entry: path.join(__dirname, "../src/lambdas/expense/view-all.ts"),
      runtime: Runtime.NODEJS_20_X,
      handler: "handler",
      timeout: Duration.seconds(30),
      environment: defaultEnvironmentVariables,
    });

    const createExpenseLambda = new NodejsFunction(this, "CreateExpenseLambda", {
      entry: path.join(__dirname, "../src/lambdas/expense/create.ts"),
      runtime: Runtime.NODEJS_20_X,
      handler: "handler",
      timeout: Duration.seconds(30),
      environment: defaultEnvironmentVariables,
    });

    const onboardUserLambda = new NodejsFunction(this, "OnboardUserLambda", {
      entry: path.join(__dirname, "../src/lambdas/user/onboard.ts"),
      runtime: Runtime.NODEJS_20_X,
      handler: "handler",
      timeout: Duration.seconds(30),
      environment: defaultEnvironmentVariables,
    });

    const statisticsLambda = new NodejsFunction(this, "StatisticsLambda", {
      entry: path.join(__dirname, "../src/lambdas/user/statistics.ts"),
      runtime: Runtime.NODEJS_20_X,
      handler: "handler",
      timeout: Duration.seconds(30),
      environment: defaultEnvironmentVariables,
    });

    const userCategoriesLambda = new NodejsFunction(this, "UserCategoriesLambda", {
      entry: path.join(__dirname, "../src/lambdas/user/user-categories.ts"),
      runtime: Runtime.NODEJS_20_X,
      handler: "handler",
      timeout: Duration.seconds(30),
      environment: defaultEnvironmentVariables,
    });

    const deleteExpenseLambda = new NodejsFunction(this, "DeleteExpenseLambda", {
      entry: path.join(__dirname, "../src/lambdas/expense/delete.ts"),
      runtime: Runtime.NODEJS_20_X,
      handler: "handler",
      timeout: Duration.seconds(30),
      environment: defaultEnvironmentVariables,
    });

    const updateExpenseLambda = new NodejsFunction(this, "UpdateExpenseLambda", {
      entry: path.join(__dirname, "../src/lambdas/expense/update.ts"),
      runtime: Runtime.NODEJS_20_X,
      handler: "handler",
      timeout: Duration.seconds(30),
      environment: defaultEnvironmentVariables,
    });

    const authorizerLambda = new NodejsFunction(this, "AuthorizerLambda", {
      entry: path.join(__dirname, "../src/auth/authorizer.ts"),
      runtime: Runtime.NODEJS_20_X,
      handler: "handler",
      timeout: Duration.seconds(30),
      environment: {
        PUBLIC_KEY: process.env.PUBLIC_KEY || "",
        ...defaultEnvironmentVariables,
      },
    });

    const authorizer = new apigateway.TokenAuthorizer(this, "ClerkAuthorizer", {
      handler: authorizerLambda,
      identitySource: apigateway.IdentitySource.header("Authorization"),
      resultsCacheTtl: Duration.seconds(30),
    });

    const expenseTrackerAPI = new apigateway.RestApi(this, "ExpenseTrackerApi", {
      restApiName: "Expense Tracker API",
      description: "This is the Expense Tracker API",
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
        allowMethods: apigateway.Cors.ALL_METHODS,
        allowHeaders: [...apigateway.Cors.DEFAULT_HEADERS, "Authorization"],
      },
    });

    const methodOptions: apigateway.MethodOptions = {
      authorizer: authorizer,
      authorizationType: apigateway.AuthorizationType.CUSTOM,
    };

    const viewAllExpensesIntegration = new apigateway.LambdaIntegration(viewAllExpensesLambda);
    const createExpenseIntegration = new apigateway.LambdaIntegration(createExpenseLambda);
    const deleteExpenseIntegration = new apigateway.LambdaIntegration(deleteExpenseLambda);
    const updateExpenseIntegration = new apigateway.LambdaIntegration(updateExpenseLambda);
    const onboardUserIntegration = new apigateway.LambdaIntegration(onboardUserLambda);
    const statisticsIntegration = new apigateway.LambdaIntegration(statisticsLambda);
    const userCategoriesIntegration = new apigateway.LambdaIntegration(userCategoriesLambda);

    const expensesResource = expenseTrackerAPI.root.addResource("expenses");
    expensesResource.addMethod("GET", viewAllExpensesIntegration, methodOptions);
    expensesResource.addMethod("POST", createExpenseIntegration, methodOptions);

    const expenseIdResource = expensesResource.addResource("{expenseId}");
    expenseIdResource.addMethod("DELETE", deleteExpenseIntegration, methodOptions);
    expenseIdResource.addMethod("PUT", updateExpenseIntegration, methodOptions);

    const onboardUserResource = expenseTrackerAPI.root.addResource("user");
    onboardUserResource.addMethod("POST", onboardUserIntegration, methodOptions);
    onboardUserResource.addResource("statistics").addMethod("GET", statisticsIntegration, methodOptions);
    onboardUserResource.addResource("categories").addMethod("GET", userCategoriesIntegration, methodOptions);
  }
}
