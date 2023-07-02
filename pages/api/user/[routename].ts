import type { NextApiRequest, NextApiResponse } from 'next';
import { ddbDocClient } from "@/config/ddbDocClient.js";
import {
  ScanCommand,
  DeleteCommand,
  PutCommand,
  UpdateCommand,
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
        res.status(200).json('delete user data sucess!')
      } catch (err) {
        console.log(err)
      }


      break;

    }

    case 'createUser': {
      try{
       
        const params=req.body
        const data = await ddbDocClient.send(new PutCommand(params));
       // it won't return the inserted item
        res.status(200).send('add data sucess')
      }catch(err){
        console.log('create user error',err)
      }
      break;
    }
    case 'editUser': {
      const params=req.body;
      const data = await ddbDocClient.send(new PutCommand(params));

      res.status(200).send('update data sucess')
      break;
    }
    case 'filterUsers':{
      const {city,dateAdded,firstname}=req.query;
      const config={
        TableName: "Users",
        FilterExpression:'city= :cityName AND firstName= :firstname AND dateAdded< :datePrefix',//make sure the city and firstName match up the table field name
        ExpressionAttributeValues:{
          ":cityName":city,
          ":datePrefix":dateAdded,
          ":firstname":firstname
        },
        // ProjectionExpression:"id,firstName,lastName", //Specify the fields to be returned
      //  Limit:2, //specify how many record will be returned
      }

 
      const data=await ddbDocClient.send(new ScanCommand(config));
      let userData = data.Items as UserData[];
   
 
      res.status(200).send({ data: userData})
      break
    }

  }
}

// AND firstname=:firstname AND dateAdded<=:dateAdded 

//Example for scanCommand with filter
// const params = {
//   TableName: "orderMessages",
//   Key: {
//       order_id,
      
//   },
//   FilterExpression: "#order_id = :ordrId OR #timestamp < :ts",
//   ExpressionAttributeNames: {
//       "#order_id": "order_id",
//       "#timestamp": "timestamp"
//     },
//     ExpressionAttributeValues: {
//       ":ordrId": order_id,
//       ":ts": now
//     },
// }