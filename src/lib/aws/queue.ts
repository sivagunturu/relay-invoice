import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";

const client = new SQSClient({
  region: process.env.AWS_REGION || "us-east-1",
});

const PDF_QUEUE_URL = process.env.PDF_QUEUE_URL!;

export interface PdfJob {
  invoiceId: string;
  orgId: string;
}

export async function queuePdfGeneration(job: PdfJob): Promise<string> {
  const command = new SendMessageCommand({
    QueueUrl: PDF_QUEUE_URL,
    MessageBody: JSON.stringify(job),
    MessageGroupId: job.orgId,
    MessageDeduplicationId: `${job.invoiceId}-${Date.now()}`,
  });

  const response = await client.send(command);
  return response.MessageId!;
}

export async function sendMessage(queueUrl: string, message: any): Promise<string> {
  const command = new SendMessageCommand({
    QueueUrl: queueUrl,
    MessageBody: JSON.stringify(message),
    MessageGroupId: message.orgId || 'default',
    MessageDeduplicationId: `${message.jobId || message.invoiceId || Date.now()}-${Date.now()}`,
  });

  const response = await client.send(command);
  return response.MessageId!;
}
