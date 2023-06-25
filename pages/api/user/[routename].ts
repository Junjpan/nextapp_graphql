import type { NextApiRequest, NextApiResponse } from 'next';
import { ddbDocClient } from "@/config/ddbDocClient.js";
import {
  ScanCommand,
  DeleteCommand,
  ScanCommandOutput,
} from "@aws-sdk/lib-dynamodb";

type Data = {
  name: string
}

interface UserData {
  id: number;
  dateAdded: string;
  city: string;
  dateModified: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { routename } = req.query;

  switch (routename) {
    case 'getAllUsers': {
      try {
        const data = await ddbDocClient.send(new ScanCommand({ TableName: "Users" }));
        let userData = data.Items as UserData[];
        res.status(200).send({ data: userData })
      } catch (err) {
        throw err

      }
      break;
    }

    case 'deleteUser': {
      //for some reason, I won't be able to pass data when I use delete method,
      const { id, dateAdded } = req.query;

      const ID = Number(id);


      try {
        await ddbDocClient.send(
          new DeleteCommand({
            TableName: "Users",
            Key: {
              id: ID,
              dateAdded
            }
          })
        );
        res.status(200).send('delete user data sucess!')
      } catch (err) {
        console.log(err)
      }


      break;

    }

    case 'addUser': {
      break;
    }
    case 'editUser': {
      break;
    }

  }
}
