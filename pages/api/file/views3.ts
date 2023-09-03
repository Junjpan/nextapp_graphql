import type { NextApiRequest, NextApiResponse } from 'next';
import { GetObjectCommand, GetObjectCommandInput } from "@aws-sdk/client-s3";
import getClient from "@/config/s3";
import { Readable } from 'stream'


//get file
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {

    const client = getClient();
    // a good article to how to change the s3 data to buffer

    try {
        const input: GetObjectCommandInput = {
            Bucket: process.env.AWS_S3_BUCKET,
            Key: "test.doc",
        };
        const command = new GetObjectCommand(input);
        const response = await client.send(command);
        //
        // const readableStream: ReadableStream = data.Body!.transformToWebStream();

        const stream = response.Body as Readable;

        new Promise((resolve, reject) => {
            const chunks: Buffer[] = [];
            stream.on('data', chunk => chunks.push(chunk));
            stream.once('end', () => { res.send(Buffer.concat(chunks)); resolve(Buffer.concat(chunks)) });

            stream.once('error', reject)

        })

        res.status(200)

    } catch (err) {
        console.log(err);
    }

}