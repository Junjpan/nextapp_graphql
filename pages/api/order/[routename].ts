import type { NextApiRequest, NextApiResponse } from 'next';
import { ddbDocClient } from "@/config/ddbDocClient.js";
import {
  ScanCommand,
  DeleteCommand,
  PutCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";


  
  interface OrderData {
    id: number;
    orderDate: string;
    userID:number;
    itemName:object
  }
  
  export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
  ) {
    const { routename } = req.query;
  
    //in this case, I create a table from aws console first.
    switch (routename) {
      case 'getAllOrders': {
        try {
          const data = await ddbDocClient.send(new ScanCommand({ TableName: "Orders" }));
          let orderData = data.Items as OrderData[];
          res.status(200).send({ data: orderData })
        } catch (err) {
          throw err
  
        }
        break;
      }
      case 'createOrder': {
        try{
         
        //   const params=req.body
        //   const data = await ddbDocClient.send(new PutCommand(params));
        //  // it won't return the inserted item
        //   res.status(200).send('add data sucess')
        const orders={
            id: 1,
            orderDate:new Date().toLocaleString(),
            userID:843,
            itemName:['toothbrush','towel']
        }
        const params={
            TableName: "Orders",
            Item:orders
        }

        const data = await ddbDocClient.send(new PutCommand(params));
        console.log(data)

        }catch(err){
          console.log('create user error',err)
        }
        break;
      }
    }
  }

