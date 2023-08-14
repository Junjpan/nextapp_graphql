import { fromTemporaryCredentials } from "@aws-sdk/credential-providers";

/**
 * Get credentials from to make requests to AWS
 */
const getCredentials = () => {
  if (process.env.NODE_ENV === "development") {
    return {
      accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_S3_ACCESS_SECRET_ACCESS_KEY,
    };
  } else {
    return fromTemporaryCredentials({
      params: {
        RoleArn: process.env.AWS_S3_ACCESS_ROLE,
        RoleSessionName: "API-Session", //it's optional,create your own session name
        DurationSeconds: 900,
      },
    });
  }
};

export default { getCredentials };
