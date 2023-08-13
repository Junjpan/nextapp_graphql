import type { NextApiRequest, NextApiResponse } from 'next';
import { PutObjectCommand, PutObjectCommandInput } from "@aws-sdk/client-s3";
import s3Client from "@/config/s3";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {

  const { fileData } = req.body;

  try {
    const input: PutObjectCommandInput = {
      Bucket: process.env.AWS_S3_BUCKET,
      Key: "test.docx",
      Body: fileData,
      // ContentType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' need to varify if this is required.
    };

    const command = new PutObjectCommand(input);
    const data = await s3Client.send(command);
    res.status(200).send('upload file success!')
  } catch (err) {
    console.log(err);
  }

  console.log(process.env.NODE_ENV, process.env.AWS_S3_ACCESS_KEY_ID);
}