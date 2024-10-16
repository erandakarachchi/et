#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { IAMStack } from "../lib/iam-stack";
import { LambdaStack } from "../lib/lambda-stack";

const app = new cdk.App();
// const iamStack = new IAMStack(app, "IAMStack", {});
const lambdaStack = new LambdaStack(app, "LambdaStack", {});
