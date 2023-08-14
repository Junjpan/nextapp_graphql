import { S3Client } from "@aws-sdk/client-s3";
import { NodeHttpHandler } from "@aws-sdk/node-http-handler";
import sts from "./sts";
import https from "https";

const requestHandler = new NodeHttpHandler({ httpsAgent: new https.Agent() });

let client = new S3Client({
  region: "us-west-2",
  credentials: sts.getCredentials(),
  //   requestHandler, //I don't know when we need it.
});

/**
 * Get S3 client to make requests to S3
 */
const getClient = () => client;

export default getClient;
