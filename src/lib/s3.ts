import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: "ap-southeast-2",
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY!,
  },
});

export async function uploadToS3(file: File): Promise<{ file_key: string; file_name: string }> {
  const file_key = "uploads/" + Date.now().toString() + "-" + file.name.replace(/\s/g, "-");

  const params = {
    Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
    Key: file_key,
    Body: file,
    ContentType: file.type,
  };

  try {
    const command = new PutObjectCommand(params);
    await s3.send(command);

    return {
      file_key,
      file_name: file.name,
    };
  } catch (error) {
    throw new Error(`Failed to upload file: ${error}`);
  }
}

export function getS3Url(file_key: string): string {
  const bucketName = process.env.NEXT_PUBLIC_S3_BUCKET_NAME;
  if (!bucketName) {
    throw new Error("Bucket name is not defined in environment variables");
  }
  return `https://${bucketName}.s3.ap-southeast-2.amazonaws.com/${file_key}`;
}
