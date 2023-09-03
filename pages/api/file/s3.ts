import type { NextApiRequest, NextApiResponse } from 'next';
import { PutObjectCommand, PutObjectCommandInput } from "@aws-sdk/client-s3";
import getClient from "@/config/s3";

//upload the file to s3 bucket

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {


  const { fileData } = req.body;
  const client = getClient();

  try {
    const input: PutObjectCommandInput = {
      Bucket: process.env.AWS_S3_BUCKET,
      Key: "test.doc",
      Body: fileData,
      // ContentType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      /**
       * doc     application/msword
docx    application/vnd.openxmlformats-officedocument.wordprocessingml.document
       */
    };

    const command = new PutObjectCommand(input);
    const data = await client.send(command);
    res.status(200).send('upload file success!')
  } catch (err) {
    console.log(err);
  }

  // console.log(process.env.NODE_ENV, process.env.AWS_S3_ACCESS_KEY_ID);
}