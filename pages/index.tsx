import { Inter } from "next/font/google";
import { useRouter } from "next/router";
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

export default function Home() {
  const router = useRouter();

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
      <form className={styles.export}>
        <label htmlFor="userID"></label>
        <select id="userID">
          <option value="734">June Pang</option>
          <option value="7386">Serafina Pan</option>
          <option value="6396">Sera Pang</option>
          <option value="4563">Serafina test</option>
          <option value="8419">Judy Brown</option>
        </select>
        <label htmlFor="items">
          Please enter your purchase items and seperate them in comma
        </label>
        <input type="text" id="items"></input>
      </form>
    </main>
  );
}
