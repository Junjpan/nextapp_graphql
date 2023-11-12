import React from "react";
import classnames from "classnames";
import { Inter } from "next/font/google"; //google font
import { useState } from "react";
import { useRouter } from "next/router";
import * as Select from "@radix-ui/react-select";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";
import axios from "axios";
import styles from "../styles/index.module.scss";

const inter = Inter({ subsets: ["latin"] });

const header = {
  "content-type": "application/json",
};

const fetchAllOrder = async () => {
  const requestBody = {
    query: `query GetAllOrders{
        getAllOrders{
          orderDate
          orderId
          orderPrice
          user{
            firstName
            lastName
            userId
          } 
        }
    }`,
    variables: {},
  };

  //you can go to localhost:3000/api/graphql and see the graphql playground
  const options = {
    method: "POST",
    url: "/api/order/getAllOrders",
    header,
    data: requestBody,
  };

  const response = await axios(options);
  console.log(response);
};

const addAnOrder = async (
  orderDate: string,
  orderId: number,
  userId: number,
  items: number[]
) => {
  const requestBody = {
    query: `mutation AddOrder($orderDate:String!,$orderId:Int,$userId:Int!,$items:[Int!]!){
    addOrder(orderInput:{orderDate:$orderDate,orderId:$orderId,userId:$userId,items:$items}){
    orderId
    orderDate
    orderPrice
    user {
      firstName
      lastName
    }
    items {
      itemId
      itemName
      itemPrice
    }
    }
  }`,

    variables: {
      orderDate,
      orderId,
      userId,
      items,
    },
  };

  const options = {
    method: "POST",
    url: "/api/graphql",
    header,
    data: requestBody,
  };

  const response = await axios(options);
  console.log("new order", response);
};

const createOrderThruDynamoDB = async () => {
  await axios.post("/api/order/createOrder");
};

const submitAnOrder = async (
  e: React.FormEvent<HTMLFormElement>,
  items: string,
  userId: string
) => {
  e.preventDefault();

  const itemsArray = items.split(",");

  const orderData = {
    id: Math.floor(Math.random() * 1000),
    orderDate: new Date().toLocaleString(),
    userID: userId,
    itemName: [...itemsArray],
  };

  //If you use different hosting name, make sure enable cors,see notes from notion.so->lambda->top five usage with lambda function->1. API gateway integration
  //->API gateway DynamoDB, lambda integrate together->troubleshooting
  const options = {
    method: "POST",
    url: "https://l2fkwix3o1.execute-api.us-west-2.amazonaws.com/order_stage/order",
    data: orderData,
  };

  const response = await axios(options);
  console.log("submit order data thru gateway API success", response);
};

interface ItemProp extends Select.SelectItemProps {
  children?: React.ReactNode;
  className?: string;
}
const SelectItem = React.forwardRef<HTMLDivElement, ItemProp>(
  ({ children, className, ...props }, forwardedRef) => {
    return (
      <Select.Item
        className={classnames("SelectItem", className)}
        {...props}
        ref={forwardedRef}
      >
        <Select.ItemText>{children}</Select.ItemText>
        <Select.ItemIndicator className="SelectItemIndicator">
          <CheckIcon />
        </Select.ItemIndicator>
      </Select.Item>
    );
  }
);

export default function Home() {
  const router = useRouter();
  const [items, setItems] = useState("");
  const [userId, setUserId] = useState("");

  return (
    <main className={inter.className}>
      <button onClick={() => fetchAllOrder()}>Fetch all orders</button>
      <button
        onClick={() => addAnOrder("2023-01-08T00:00:00Z", 5555, 1235, [2, 2])}
      >
        Add an Order using Graphql
      </button>
      <button onClick={createOrderThruDynamoDB}>
        Create an Order thru DynamoDB
      </button>
      <button onClick={() => router.push("/viewdata")}>View User Data</button>
      <button onClick={() => router.push("/s3/upload")}>upload file</button>
      <form
        className={styles.form}
        onSubmit={(e) => submitAnOrder(e, items, userId)}
      >
        <Select.Root
          onValueChange={(value) => {
            console.log(value);
            setUserId(value);
          }}
          name="userId"
        >
          <Select.Trigger className="SelectTrigger" aria-label="userId">
            <Select.Value placeholder="select a user" />
            <Select.Icon className="SelectIcon">
              <ChevronDownIcon />
            </Select.Icon>
          </Select.Trigger>
          <Select.Portal>
            <Select.Content
              position="popper"
              sideOffset={5}
              className={styles.SelectContent}
              align="center"
            >
              <Select.ScrollUpButton>
                <ChevronUpIcon />
              </Select.ScrollUpButton>
              <Select.Viewport>
                <SelectItem value="734">June Pang</SelectItem>
                <SelectItem value="7386">Serafina Pan</SelectItem>
                <SelectItem value="6396">Sera Pang</SelectItem>
                <SelectItem value="4563">Serafina test</SelectItem>
                <SelectItem value="8419">Judy Brown</SelectItem>
              </Select.Viewport>
            </Select.Content>
          </Select.Portal>
        </Select.Root>

        <label htmlFor="items">
          Please enter your purchase items and seperate them in comma
          <input
            type="text"
            id="items"
            value={items}
            onChange={(e) => {
              setItems(e.target.value);
            }}
          ></input>
        </label>

        <button
          type="submit"
          style={{ width: "500px", background: "black", color: "white" }}
        >
          Make an order thru lambda-gatewayAPI-dynamodb function
        </button>
      </form>
    </main>
  );
}
