import { ddbDocClient } from "../config/ddbDocClient";
import { useRouter } from "next/router";
import axios from "axios";
import { PutCommand,UpdateCommand } from "@aws-sdk/lib-dynamodb";

//there are a couple of way to update datas
//https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/modules/_aws_sdk_lib_dynamodb.html#updatecommandinput-2

const UpdateData = () => {
  const router = useRouter();
  const data = router.query;
  
  const handleSubmit = async (event:React.FormEvent<HTMLFormElement>) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault();
   
    const target=event.target as HTMLFormElement;
    // setting up the parameters for PutCommand
    const params = {
      TableName: "Users",
      Item:{
        id: Number(data.id), //primaryKey
        dateAdded: data.dateAdded, //sortKey
        firstName: target.firstName.value,
        lastName: target.lastName.value,
        city: target.city.value,
        phoneNumber: target.phoneNumber.value,
        dateModified:new Date().toLocaleString()
      }
    };

    //you also can use UpdateCommand,if you use updateCommand, the params will be listed like this

    // const params = {
    //   TableName: "Users",
    //   Key: {
    //     id: Number(data.id), //primaryKey
    //     dateAdded: data.dateAdded, //sortKey
    //   },
    //   UpdateExpression:
    //     "set firstName = :p, lastName = :r, city = :q, phoneNumber = :z, dateModified = :k",
    //   ExpressionAttributeValues: {
    //     ":p": target.firstName.value,
    //     ":r": target.lastName.value,
    //     ":q": target.city.value,
    //     ":z": target.phoneNumber.value,
    //     ":k": new Date().toLocaleString(),
    //   },
    // };
    //you also need to change PutCommand to UpdateCommand from below

    


    // updating the db
    try {

      const headers = {
        "content-type": "application/json",
      };
    
      const options = {
        method: "PUT",
        url: "/api/user/editUser",
        headers,
        data: params,
      };
  
      await axios(options);
      router.push("/viewdata");
    } catch (err) {
      console.log("Error", err);
    }
  };
  
  return (
    <>
      <div >
        <p >Update Data</p>
        <div >
          <form onSubmit={handleSubmit} id="addData-form">
            <div >
              <label
                htmlFor="firstName"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                defaultValue={data.firstName}
              />
            </div>
            <div >
              <label
                htmlFor="lastName"

              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                defaultValue={data.lastName}
              />
            </div>
            <div>
              <label
                htmlFor="exampleInputEmail1"
              >
                City
              </label>
              <input
                type="text"

                id="city"
                name="city"
                defaultValue={data.city}
              />
            </div>
            <div >
              <label
                htmlFor="phoneNumber"
                className="form-label inline-block mb-2 text-gray-700"
              >
                Phone Number
              </label>
              <input
                type="phone"
                id="phoneNumber"
                name="phoneNumber"
                defaultValue={data.phoneNumber}
              />
            </div>

            <button
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateData;