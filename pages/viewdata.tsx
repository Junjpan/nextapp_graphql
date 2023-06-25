// Import required AWS SDK clients and commands for Node.js.
import { useEffect, useState } from "react";
import { ddbDocClient } from "../config/ddbDocClient.js";
import axios from "axios";
import {
  ScanCommand,
  DeleteCommand,
  ScanCommandOutput,
} from "@aws-sdk/lib-dynamodb";
import Link from "next/link.js";
import { headers } from "next/dist/client/components/headers.js";

interface UserData {
  id: number;
  dateAdded: string;
  city: string;
  dateModified: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

const ViewData = () => {
  let data;
  const [tableData, setTableData] = useState<UserData[]>([]);

  const fetchData = async () => {
    try {
      const data=await axios.get('/api/user/getAllUsers');
      setTableData(data.data.data);

    } catch (err) {
      console.log(err);
    }
  };

  
  const deleteItem = async (primaryKeyValue: number, sortKeyValue: string) => {

   
    await axios.delete("/api/user/deleteUser",{params:{
      id:primaryKeyValue,
      dateAdded:sortKeyValue
    }})
    fetchData();
  };

  useEffect(() => {
    fetchData();
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
