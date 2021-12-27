import MyStack from "./MyStack";
import * as sst from "@serverless-stack/resources";

export default function main(app: sst.App): void {
  // Set default runtime for all functions
  app.setDefaultFunctionProps({
    runtime: "nodejs14.x",
    environment: {
      TEST_HELLO_WORLD: process.env.TEST_HELLO_WORLD || "hello-world-fallback",
    },
    bundle: {
      externalModules: ['datadog-lambda-js'],
    },
  });

  new MyStack(app, "my-stack");

  // Add more stacks
}
