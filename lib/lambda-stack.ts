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

    const api = new apigateway.LambdaRestApi(this, "HelloWorldApi", {
      handler: helloWorldLambda,
      proxy: false,
    });

    const helloResource = api.root.addResource("hello");
    helloResource.addMethod("GET");
  }
}
