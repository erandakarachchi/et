import { Duration, Stack, StackProps } from "aws-cdk-lib";
import { Role } from "aws-cdk-lib/aws-iam";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import path = require("path");
import * as apigateway from "aws-cdk-lib/aws-apigateway";

interface LambdaStackProps extends StackProps {}

export class LambdaStack extends Stack {
  constructor(scope: Construct, id: string, props: LambdaStackProps) {
    super(scope, id, props);

    const helloWorldLambda = new NodejsFunction(this, "HelloWorldLambda", {
      entry: path.join(__dirname, "../src/lambdas/hello-world.ts"),
      runtime: Runtime.NODEJS_20_X,
      handler: "handler",
      timeout: Duration.seconds(30),
    });

    const viewAllExpensesLambda = new NodejsFunction(this, "ViewAllExpensesLambda", {
      entry: path.join(__dirname, "../src/lambdas/expense/view-all.ts"),
      runtime: Runtime.NODEJS_20_X,
      handler: "handler",
      timeout: Duration.seconds(30),
    });

    const api = new apigateway.LambdaRestApi(this, "HelloWorldApi", {
      handler: helloWorldLambda,
      proxy: false,
    });

    const createExpenseLambda = new NodejsFunction(this, "CreateExpenseLambda", {
      entry: path.join(__dirname, "../src/lambdas/expense/create.ts"),
      runtime: Runtime.NODEJS_20_X,
      handler: "handler",
      timeout: Duration.seconds(30),
    });

    const onboardUserLambda = new NodejsFunction(this, "OnboardUserLambda", {
      entry: path.join(__dirname, "../src/lambdas/user/onboard.ts"),
      runtime: Runtime.NODEJS_20_X,
      handler: "handler",
      timeout: Duration.seconds(30),
    });

    const statisticsLambda = new NodejsFunction(this, "StatisticsLambda", {
      entry: path.join(__dirname, "../src/lambdas/user/statistics.ts"),
      runtime: Runtime.NODEJS_20_X,
      handler: "handler",
      timeout: Duration.seconds(30),
    });

    const userCategoriesLambda = new NodejsFunction(this, "UserCategoriesLambda", {
      entry: path.join(__dirname, "../src/lambdas/user/user-categories.ts"),
      runtime: Runtime.NODEJS_20_X,
      handler: "handler",
      timeout: Duration.seconds(30),
    });

    const helloResource = api.root.addResource("hello");
    helloResource.addMethod("GET");

    const viewAllExpensesIntegration = new apigateway.LambdaIntegration(viewAllExpensesLambda);
    const createExpenseIntegration = new apigateway.LambdaIntegration(createExpenseLambda);
    const expensesResource = api.root.addResource("expenses");
    expensesResource.addMethod("GET", viewAllExpensesIntegration);
    expensesResource.addMethod("POST", createExpenseIntegration);

    const onboardUserIntegration = new apigateway.LambdaIntegration(onboardUserLambda);
    const onboardUserResource = api.root.addResource("user");
    onboardUserResource.addMethod("POST", onboardUserIntegration);

    const statisticsIntegration = new apigateway.LambdaIntegration(statisticsLambda);
    onboardUserResource.addResource("statistics").addMethod("GET", statisticsIntegration);

    const userCategoriesIntegration = new apigateway.LambdaIntegration(userCategoriesLambda);
    onboardUserResource.addResource("categories").addMethod("GET", userCategoriesIntegration);
  }
}
