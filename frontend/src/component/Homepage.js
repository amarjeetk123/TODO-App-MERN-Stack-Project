import Navbar from "./Navbar";
import Form from "./Form";
import Todos from "./List"

import {account} from "../appwrite/appwriteConfig"
import { useEffect, useState } from "react";

function Homepage() {
  const [userDetails, setuserDetails] = useState()

  useEffect(() => {
    const getUserData = account.get();
    getUserData.then(
     function(response){
       setuserDetails(response);
     },
     function(error){
       console.log(error);
     }
    )
   }, [])

  //  console.log(userDetails?.$id)
  return (
    <div>
        <Navbar name={userDetails?.name} />
        <Form  userId={userDetails?.$id} userEmail={userDetails?.email} />
        <Todos userId={userDetails?.$id}  />
    </div>
  )
}

export default Homepage