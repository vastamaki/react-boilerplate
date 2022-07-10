import type { AWS } from "@serverless/typescript";

const serverlessConfiguration: AWS = {
  service: "react-boilerplate",
  plugins: ["fullstack-serverless", "serverless-esbuild"],
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
    },
    fullstack: {
      domain: "example.com",
      certificate: "cert arn",
      bucketName: "bucket-name",
      distributionFolder: "build",
      indexDocument: "index.html",
      errorDocument: "index.html",
      singlePageApp: true,
      clientCommand: "npm run build --production",
      apiPath: "api",
    },
  },
  provider: {
    name: "aws",
    runtime: "nodejs16.x",
    region: "eu-west-1",
    stage: "prod",
    profile: "${opt:profile, 'personal-prod'}",
  },
};

module.exports = serverlessConfiguration;
