import './App.css';
import Homepage from './component/Homepage';
import {BrowserRouter , Route , Routes} from "react-router-dom"
import {account} from "./appwrite/appwriteConfig"
import Login from './component/Login';
import Signup from './component/Signup';
import { useEffect, useState } from 'react';

// export const BASE_URL = "http://localhost:4000";
export const BASE_URL = "https://todo-backend-2ony.onrender.com";

function App() {
  
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

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element = { <Homepage /> } />
      <Route path='/login' element = { <Login /> } />
      {/* <Route path='/home' element = { userDetails ? <Homepage /> : <Login /> } /> */}
      <Route path='/register' element = {  <Signup />   } />
    </Routes>
    </BrowserRouter>
  );
}

export default App;