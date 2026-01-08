import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const client = new S3Client({
  region: process.env.AWS_REGION || "us-east-1",
});

const INVOICE_BUCKET = process.env.INVOICE_BUCKET_NAME!;
const LOGOS_BUCKET = process.env.LOGOS_BUCKET_NAME!;

export async function uploadLogo(
  orgId: string,
  file: Buffer,
  contentType: string
): Promise<string> {
  const key = `${orgId}/logo${getExtension(contentType)}`;
  
  await client.send(
    new PutObjectCommand({
      Bucket: LOGOS_BUCKET,
      Key: key,
      Body: file,
      ContentType: contentType,
    })
  );

  return await getDownloadUrl("logos", key);
}

export async function getUploadUrl(
  bucket: "invoices" | "logos",
  key: string,
  contentType: string
): Promise<string> {
  const bucketName = bucket === "invoices" ? INVOICE_BUCKET : LOGOS_BUCKET;
  
  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: key,
    ContentType: contentType,
  });

  return getSignedUrl(client, command, { expiresIn: 3600 });
}

export async function getDownloadUrl(
  bucket: "invoices" | "logos",
  key: string
): Promise<string> {
  const bucketName = bucket === "invoices" ? INVOICE_BUCKET : LOGOS_BUCKET;
  
  const command = new GetObjectCommand({
    Bucket: bucketName,
    Key: key,
  });

  return getSignedUrl(client, command, { expiresIn: 3600 });
}

export async function getPresignedUrl(
  bucket: "invoices" | "logos",
  key: string
): Promise<string> {
  return getDownloadUrl(bucket, key);
}

export async function deleteFile(
  bucket: "invoices" | "logos",
  key: string
): Promise<void> {
  const bucketName = bucket === "invoices" ? INVOICE_BUCKET : LOGOS_BUCKET;
  
  await client.send(
    new DeleteObjectCommand({
      Bucket: bucketName,
      Key: key,
    })
  );
}

export async function uploadFile(
  bucket: "invoices" | "logos",
  key: string,
  body: Buffer,
  contentType: string
): Promise<void> {
  const bucketName = bucket === "invoices" ? INVOICE_BUCKET : LOGOS_BUCKET;
  
  await client.send(
    new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      Body: body,
      ContentType: contentType,
    })
  );
}

export async function getSignedDownloadUrl(
  bucket: "invoices" | "logos",
  key: string,
  expiresIn: number = 3600
): Promise<string> {
  const bucketName = bucket === "invoices" ? INVOICE_BUCKET : LOGOS_BUCKET;
  
  const command = new GetObjectCommand({
    Bucket: bucketName,
    Key: key,
  });

  return getSignedUrl(client, command, { expiresIn });
}

function getExtension(contentType: string): string {
  const map: Record<string, string> = {
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "image/gif": ".gif",
    "image/webp": ".webp",
    "application/pdf": ".pdf",
  };
  return map[contentType] || "";
}
