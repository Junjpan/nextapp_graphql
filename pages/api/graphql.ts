import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { gql } from 'graphql-tag';
import {users,orders,items} from "@/pages/data/dummyData";
import type {GraphQLResolveInfo} from 'graphql'

//define schema
const typeDefs = gql`
  type Query {
    sayHello: String,
    sayBye:String,
    getUser(userId:Int):User,
    getAllOrders:[Order]
  }

  type Mutation{
    addOrder(orderInput:OrderInput):Order!
  }

  type User {
    userId: Int,
    firstName: String,
    lastName: String,
    email: String
    orders: [Order]
  }

  type Order {
    orderId: Int,
    orderDate: String,
    orderPrice: Float, 
    user: User, 
    items: [Item]
  }

  type Item {
    itemId: Int,
    itemName: String,
    itemPrice: Float
  }

 input OrderInput{
    orderId: Int,
    orderDate: String!,
    userId: Int!, 
    items:[Int!]!
  }
  
`;


type ItemType={
    itemId: number,
    itemName: string,
    itemPrice: number
}

//order price is the total of all the items cost
//define reslover
const resolvers = {
  Query: {
    sayHello: () => 'Hello World',
    sayBye:()=>'Say Bye',
    getUser(parent:any, args:Record<string, any>, contextValue, info:GraphQLResolveInfo) {
        return users.find((user) => user.userId === args.userId);
      },
    getAllOrders() {
        return orders
    } 
  }, 
  Mutation:{
    addOrder(parent:any,args:Record<string,any>){
        //console.log(args);
        const {orderId,orderDate,userId,items}=args.orderInput;
        const newOrder={orderId,
            orderDate,
            userId,
            items}
        orders.push(newOrder)
        return {
         orderId,
         orderDate,
         userId,
         items
        }
    }
  },
  User:{
    orders(parent:any){
        return orders.filter((order)=>order.userId===parent.userId)
    }},
  Order:{
    user(parent:any){
        //console.log(parent)
        return users.find((user)=>user.userId===parent.userId)
    },
    items(parent:any){
        return parent.items.map((itemId:number)=>{
           return items.find((item)=>item.itemId===itemId)
        })
    },
    orderPrice(parent:any){
        return parent.items.map((itemId:number)=>{
            return items.find(item=>item.itemId===itemId)
        }).reduce((sum:number,item:ItemType)=>sum+item.itemPrice,0)
    }
  }  

};

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });

export default startServerAndCreateNextHandler(apolloServer);