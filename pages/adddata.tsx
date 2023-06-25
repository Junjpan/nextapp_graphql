import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { ddbDocClient } from "../config/ddbDocClient";
import { useRouter } from "next/router";
import axios from "axios";


const AddData = () => {
  const router = useRouter();

  const handleSubmit = async (event:React.FormEvent<HTMLFormElement>) => {
    // Stop the form from submitting and refreshing the page.

    event.preventDefault();
    let params;
    let target=event.target as HTMLFormElement;

   // Get data from the form.
   params = {
    TableName: "Users",
    Item: {
      id: Math.floor(Math.random() * 10000),
      dateAdded: new Date().toLocaleString(),
      dateModified: "",
      firstName:target.firstName.value,
      lastName: target.lastName.value,
      city:target.city.value,
      phoneNumber: target.phoneNumber.value,
    },
  };
    
  try{

    const headers = {
      "content-type": "application/json",
    };
  
    const options = {
      method: "POST",
      url: "/api/user/createUser",
      headers,
      data: params,
    };

    await axios(options);
    router.push("/viewdata");
    const form= document.getElementById("addData-form") as HTMLFormElement;
    form.reset();

  }catch(err){
    console.log(err)
  }
 
//Infact, you can save data on the frontend as well as long as you get the accessID and accessssecret,but 
//you don't want to set those information on the client side
  //   try {
  //     const data = await ddbDocClient.send(new PutCommand(params));
  //     console.log("Success - item added", data);
  //     alert("Data Added Successfully");
  //     router.push("/viewdata");
  //     const form= document.getElementById("addData-form") as HTMLFormElement
  //     form.reset();
  //   } catch (err:any) {
      
  //     console.log("Error", err.stack);
  //   }
  };
  return (
    <>
      <div >
        <p >Add Data</p>
        <div >
          <form onSubmit={handleSubmit} id="addData-form">
            <div >
              <label
                htmlFor="firstName"
              >
                First Name
              </label>
              <input type="text"  id="firstName" />
            </div>
            <div className="form-group mb-6">
              <label
                htmlFor="lastName"
              >
                Last Name
              </label>
              <input type="text"  id="lastName" />
            </div>
            <div >
              <label
                htmlFor="exampleInputEmail1"
              >
                City
              </label>
              <input type="text" id="city" />
            </div>
            <div >
              <label
                htmlFor="phoneNumber"
              >
                Phone Number
              </label>
              <input
                type="phone"
                id="phoneNumber"
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

export default AddData;