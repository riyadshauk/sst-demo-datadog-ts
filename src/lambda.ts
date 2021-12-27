import { sendDistributionMetricWithDate } from "datadog-lambda-js";
import { APIGatewayProxyHandlerV2 } from "aws-lambda";

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  await sendDistributionMetricWithDate(
    "handler.count",
    1,
    new Date(),
  );
  const redactedEnv = {...process.env};
  redactedEnv.AWS_ACCESS_KEY_ID = "REDACTED";
  redactedEnv.AWS_SECRET_ACCESS_KEY = "REDACTED";
  redactedEnv.DD_API_KEY = "REDACTED";
  redactedEnv.AWS_SESSION_TOKEN = "REDACTED";
  return {
    statusCode: 200,
    headers: { "Content-Type": "text/plain" },
    body: `Hello, World! Your request was received at ${event.requestContext.time}. environment: ${JSON.stringify(redactedEnv)}`,
  };
};
