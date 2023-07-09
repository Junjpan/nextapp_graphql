// Import required AWS SDK clients and commands for Node.js
//https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-dynamodb/classes/createtablecommand.html
//What is Hash and Range Primary Key?: https://stackoverflow.com/questions/27329461/what-is-hash-and-range-primary-key
import { CreateTableCommand } from "@aws-sdk/client-dynamodb";
import { ddbClient } from "../config/dbconfig";

// Set the parameters
export const params = {
  //attribute type
// S - the attribute is of type String
// N - the attribute is of type Number
// B - the attribute is of type Binary
//keyType, either HASH or RANGE
 // Add the partionkey and sort key(if needed) together with their types
  AttributeDefinitions: [
    {
      AttributeName: "id", //Primary Key name
      AttributeType: "N", //Type of the primary key
    },
    {
      AttributeName: "dateAdded", //Sort key name
      AttributeType: "S", //Type of the sort key
    },
  ],
  // Declaring which one is primary key and which one is sort key out of above defined attributes.
  // For Primary key -> KeyType = HASH
  // For Sort key -> KeyType = RANGE
  KeySchema: [
    {
      AttributeName: "id", //Primary key name
      KeyType: "HASH",
    },
    {
      AttributeName: "dateAdded", //Sort key name
      KeyType: "RANGE",
    },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 5,
    WriteCapacityUnits: 5,
  },
  TableName: "Users", //TABLE_NAME
  StreamSpecification: {
    StreamEnabled: true,
    StreamViewType: "KEYS_ONLY",
  },
};
//you don't have to create other attributes schema, as soon as you add data with the attributes thru API, The table will be added with the new attributes.
//as long as you have the keySchema attached
const CreateTable = () => {
  const run = async () => {
    try {
      const data = await ddbClient.send(new CreateTableCommand(params));
      console.log("Table Created", data);
      alert("Table Created!")
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <button
        onClick={() => run()}
      >
        Create Table
      </button>
    </div>
  );
};

export default CreateTable;