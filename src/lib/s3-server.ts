import { S3 } from "@aws-sdk/client-s3";
import fs from "fs";
import path from "path";

export const downloadFromS3 = async (file_key: string): Promise<string> => {
  return new Promise<string>(async (resolve, reject) => {
    try {
      const s3 = new S3({
        region: "ap-southeast-2",
        credentials: {
          accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID!,
          secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY!,
        },
      });

      const params = {
        Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
        Key: file_key,
      };

      const obj = await s3.getObject(params);
      
      // Create 'uploads' directory if it doesn't exist
      const uploadsDir = path.join(process.cwd(), 'uploads');
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }

      const file_name = path.join(uploadsDir, `${Date.now().toString()}.pdf`);

      if (obj.Body instanceof require("stream").Readable) {
        const file = fs.createWriteStream(file_name);
        file.on("open", (fd: number) => {
          (obj.Body as NodeJS.ReadableStream)
            .pipe(file)
            .on("finish", () => {
              console.log(`File successfully downloaded and saved to ${file_name}`);
              resolve(file_name);
            })
            .on("error", (err: Error) => {
              console.error(`Error writing file: ${err}`);
              reject(err);
            });
        });
        file.on("error", (err: Error) => {
          console.error(`Error opening file for writing: ${err}`);
          reject(err);
        });
      } else {
        console.error("Downloaded object Body is not a Readable stream");
        reject(new Error("Invalid object Body"));
      }
    } catch (error) {
      console.error("Error in downloadFromS3:", error);
      reject(error);
    }
  });
};