/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "relay-invoice",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
    };
  },
  async run() {
    const bucket = new sst.aws.Bucket("InvoiceStorage", {
      access: "cloudfront",
    });

    const logosBucket = new sst.aws.Bucket("LogoStorage", {
      access: "cloudfront",
    });

    const userPool = new sst.aws.CognitoUserPool("UserPool", {
      usernames: ["email"],
    });

    const userPoolClient = userPool.addClient("WebClient");

    const pdfQueue = new sst.aws.Queue("PdfQueue", {
      visibilityTimeout: "5 minutes",
      fifo: true,
    });

    const vpc = new sst.aws.Vpc("RelayVpc", { nat: "managed" });

    const rds = new sst.aws.Postgres("Database", {
      vpc,
      scaling: {
        min: "0.5 ACU",
        max: "4 ACU",
      },
    });

    const pdfHandler = new sst.aws.Function("PdfGenerator", {
      handler: "functions/pdf-generator.handler",
      timeout: "5 minutes",
      memory: "2048 MB",
      nodejs: {
        install: ["puppeteer-core", "@sparticuz/chromium", "handlebars"],
      },
      link: [rds, bucket],
      environment: {
        BUCKET_NAME: bucket.name,
      },
    });

    pdfQueue.subscribe(pdfHandler, {
      batch: {
        size: 1,
      },
    });

    const site = new sst.aws.Nextjs("RelayInvoice", {
      link: [bucket, logosBucket, userPool, rds, pdfQueue],
      environment: {
        NEXT_PUBLIC_USER_POOL_ID: userPool.id,
        NEXT_PUBLIC_USER_POOL_CLIENT_ID: userPoolClient.id,
        NEXT_PUBLIC_AWS_REGION: process.env.AWS_REGION || "us-east-1",
        INVOICE_BUCKET_NAME: bucket.name,
        LOGOS_BUCKET_NAME: logosBucket.name,
        PDF_QUEUE_URL: pdfQueue.url,
        DATABASE_ARN: rds.clusterArn,
        DATABASE_SECRET_ARN: rds.secretArn,
      },
    });

    return {
      siteUrl: site.url,
      userPoolId: userPool.id,
      userPoolClientId: userPoolClient.id,
      invoiceBucket: bucket.name,
      logosBucket: logosBucket.name,
      pdfQueueUrl: pdfQueue.url,
      databaseHost: rds.host,
    };
  },
});
