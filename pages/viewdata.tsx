// Import required AWS SDK clients and commands for Node.js.
import { useEffect, useState } from "react";
import { ddbDocClient } from "../config/ddbDocClient.js";
import { ScanCommand, DeleteCommand, ScanCommandOutput } from "@aws-sdk/lib-dynamodb";
import Link from "next/link.js";

interface UserData {
    id:number,
    dateAdded:string,
    city:string,
    dateModified:string,
    firstName:string,
    lastName:string,
    phoneNumber:string
}

const ViewData = () => {
  let data ;
  const [tableData, setTableData] = useState<UserData[]>([]);


  //   scanning the dynamodb table
  const scanTable = async () => {
    try {
      data = await ddbDocClient.send(new ScanCommand({ TableName: "Users" })) ;
      let userData=data.Items as UserData[];

        setTableData(userData);
        console.log("success", data.Items);
      
    } catch (err) {
      console.log("Error", err);
    }
  };


  const deleteItem = async (primaryKeyValue:number, sortKeyValue:string) => {
    try {
      await ddbDocClient.send(
        new DeleteCommand({
          TableName: "Users",
          Key: {
            id: primaryKeyValue, // primarykeyName : primaryKeyValue
            dateAdded: sortKeyValue, // sortkeyName : sortkeyValue
          },
        })
      );
      console.log("Success - item deleted");
      scanTable();
    } catch (err) {
      console.log("Error", err);
    }
  };

  useEffect(() => {
    scanTable();
  }, []);

  return (
    <div>
      <div>
        <Link
          href={{
            pathname: "/adddata",
          }}
        >
          <button type="button">Add Data</button>
        </Link>
      </div>
      <p>View Data</p>
      <div>
        <div>
          <div>
            <div>
              <table>
                <thead>
                  <tr>
                    <th scope="col">id</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col"> City</th>
                    <th scope="col">Phone Number</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.firstName}</td>
                      <td>{item.lastName}</td>
                      <td>{item.city}</td>
                      <td>{item.phoneNumber}</td>
                      <td>
                        <Link
                          href={{
                            pathname: "/updatedata",
                            query: {
                              id: item.id,
                              dateAdded: item.dateAdded,
                              firstName: item.firstName,
                              lastName: item.lastName,
                              city: item.city,
                              phoneNumber: item.phoneNumber,
                            },
                          }}
                        >
                          <button
                            type="button"
                            className="inline-block px-6 py-2.5 mr-2 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                          >
                            Edit
                          </button>
                        </Link>
                        <button
                          type="button"
                          className="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
                          onClick={() => deleteItem(item.id, item.dateAdded)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewData;
