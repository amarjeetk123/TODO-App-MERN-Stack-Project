import React , {useState} from 'react'
import {account} from "../appwrite/appwriteConfig"
import {useNavigate} from "react-router-dom"
import { v4 as uuidv4 } from "uuid"


function Signup() {

    const navigate = useNavigate()
    const [user , setUser] = useState({
        name:"",
        email:"",
        password : "",
    })

    //Signup 
 const signupUser = async (e) => {
    e.preventDefault();

    // check user already exit or not


    const promise = account.create(
        uuidv4() , // generate a unique id
        user.email,
        user.password,
        user.name,
    )

    promise.then(
        function(responce){
            // console.log(responce);
            navigate("/login") // success
        },
        function(error){
            console.log(error)  // failure
        }
    )

 }
//  useEffect(() => {
//   user.name=""
//   user.email=""
//  }, [])
 


    return (
        <div  className='bg-indigo-500 h-[100vh] flex flex-col items-center justify-center'>
            <div className=' rounded-[7px] bg-white px-8 py-4 '>
                <h1 className='text-center text-[35px] ' >Sign UP</h1>
                <div  className='' >
                    <h2>Name:</h2>
                    <input className='bg-gray-100 rounded-[5px] outline-none pl-2  border-2 border-indigo-200 text-[20px] focus:bg-white focus:border-indigo-500 ' type={"text"}
                    onChange={ (e) => {
                        setUser({
                            ...user,
                            name:e.target.value
                        })
                    } }
                    />
                </div>
                <div className='my-2'>
                    <h2>Email:</h2>
                    <input className='bg-gray-100 rounded-[5px] outline-none pl-2 border-2 border-indigo-200 text-[20px] focus:bg-white focus:border-indigo-500 ' type={"email"}
                    onChange={ (e) => {
                        setUser({
                            ...user,
                            email:e.target.value
                        })
                    } } />
                </div>
                <div>
                    <h2>Password:</h2>
                    <input className='bg-gray-100 rounded-[5px] outline-none pl-2 border-2 border-indigo-200 text-[20px] focus:bg-white focus:border-indigo-500 '  type={"password"} 
                    onChange={ (e) => {
                        setUser({
                            ...user,
                            password:e.target.value
                        })
                    } } />
                </div>
                <button className='bg-indigo-600 rounded-[4px] hover:bg-indigo-700  text-white py-1 w-[100%] my-4 '
                onClick={signupUser} >Submit</button>
    
            </div>
            <h1  className='text-white mt-2' >Already have an account ? <a className='text-black  ' href='./login' >Login here</a> </h1>
        </div>
      )
}

export default Signup