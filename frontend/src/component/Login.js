import React,{useState} from 'react'
import {account} from "../appwrite/appwriteConfig"
import {useNavigate} from "react-router-dom"



function Login() {

  const navigate = useNavigate()
  const [user,setUser] = useState({
    email:"",
    password:""
  })

  const userLogin = async (e) =>{
    e.preventDefault()
    try {

      await account.createEmailSession(user.email , user.password)
      navigate("/home")
      
    } catch (error) {
      console.log(error)
      alert("Please Check Email and Password")
    }
  }

  
  




  return (
    <div  className='bg-indigo-500 h-[100vh] flex flex-col items-center justify-center'>
        <div className=' rounded-[7px] bg-white px-8 py-4 '>
            <h1 className='text-center text-[35px] ' >Login</h1>
            
            <div className='my-2'>
                <h2>Email:</h2>
                <input className='bg-gray-100 rounded-[5px] outline-none pl-2 border-2 border-indigo-200 text-[20px] focus:bg-white focus:border-indigo-500 ' type={"email"}
                onChange={(e) => {
                  setUser({
                    ...user,
                    email: e.target.value

                  })
                }} />
            </div>
            <div>
                <h2>Password:</h2>
                <input className='bg-gray-100 rounded-[5px] outline-none pl-2 border-2 border-indigo-200 text-[20px] focus:bg-white focus:border-indigo-500 '  type={"password"} 
                onChange={(e) => {
                  setUser({
                    ...user,
                    password: e.target.value

                  })
                }}  />
            </div>
            <button onClick={userLogin} className='bg-indigo-600 rounded-[4px] hover:bg-indigo-700  text-white py-1 w-[100%] my-4 ' >Submit</button>

        </div>
        <h1  className='text-white mt-2' >Not have an account ? <a className='text-black' href='/' >Sign Up here</a> </h1>
    </div>
  )
}

export default Login