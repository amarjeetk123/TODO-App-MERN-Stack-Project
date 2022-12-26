import React, { useState } from 'react'
import { account } from "../appwrite/appwriteConfig"
import { useNavigate } from "react-router-dom"
import { v4 as uuidv4 } from "uuid"
import { Link } from 'react-router-dom'

import "./style.css"

import Sociallogin from './Sociallogin'

import "./style.css"

// this is my react-toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function Signup() {

    const navigate = useNavigate()
    const [user, setUser] = useState({
        firstname:"",
        lastname:"",
        email: "",
        password: "",
    })

    //Signup 
    const signupUser = async (e) => {
        e.preventDefault();

        if(user.firstname==="" && user.lastname==="" && user.email=== "" & user.password===""){
            return toast( "Please Give All The Details" , {
                autoClose: 2200,
                type : "error",
                position:"top-center",
              })
        }

        if(user.firstname===""){
            return toast( "Please Give Your First Name" , {
                autoClose: 2200,
                type : "error",
                position:"top-center",
              })
        }
        if(user.lastname===""){
            return toast( "Please Give Your Last Name" , {
                autoClose: 2200,
                type : "error",
                position:"top-center",
              })
        }

        const promise = account.create(
            uuidv4(), // generate a unique id
            user.email,
            user.password,
            user.name,
        )
     

        promise.then(
            function (responce) {
                console.log(responce);
                navigate("/login") // success
            },
            function (error) {
                // console.log(error)  // failure
                if(error.message === "A user with the same email already exists in your project."){
                    return toast( "This Email is already exit" , {
                        autoClose: 2200,
                        type : "error",
                        position:"top-center",
                      })

                }
                else{
                    return toast( error.message , {
                    autoClose: 2200,
                    type : "error",
                    position:"top-center",
              
                  })
                }
                
            }
        )



    }
    //  useEffect(() => {
    //   user.name=""
    //   user.email=""
    //  }, [])



    return (
        <div className=' h-[100vh] flex flex-col items-center justify-center main-div'>
             
            <div className=' rounded-[9px] w-[360px]  px-6 py-4 z-50 box'>
                <h1 className='text-center text-[35px] text-white ' >Sign UP</h1>
                <div className='' >
                    <h2 className='text-white text-[25px]'>First Name:</h2>
                    <input className=' w-[100%] bg-gray-100 rounded-[5px] outline-none pl-2  border-2 border-indigo-200 text-[20px] focus:bg-white focus:border-indigo-500 ' type={"text"}
                        onChange={(e) => {
                            setUser({
                                ...user,
                                firstname: e.target.value
                            })
                        }}
                    />
                </div>
                <div className='' >
                    <h2 className='text-white text-[24px] mt-2'>Last Name:</h2>
                    <input className=' w-[100%] bg-gray-100 rounded-[5px] outline-none pl-2  border-2 border-indigo-200 text-[20px] focus:bg-white focus:border-indigo-500 ' type={"text"}
                        onChange={(e) => {
                            setUser({
                                ...user,
                                lastname: e.target.value
                            })
                        }}
                    />
                </div>
                <div className='my-2'>
                    <h2 className='text-white text-[24px] mt-2'>Email:</h2>
                    <input className=' w-[100%] bg-gray-100 rounded-[5px] outline-none pl-2 border-2 border-indigo-200 text-[20px] focus:bg-white focus:border-indigo-500 ' type={"email"}
                        onChange={(e) => {
                            setUser({
                                ...user,
                                email: e.target.value
                            })
                        }} />
                </div>
                <div>
                    <h2 className='text-white text-[24px] mt-2'>Password:</h2>
                    <input className=' w-[100%] bg-gray-100 rounded-[5px] outline-none pl-2 border-2 border-indigo-200 text-[20px] focus:bg-white focus:border-indigo-500 ' type={"password"}
                        onChange={(e) => {
                            setUser({
                                ...user,
                                password: e.target.value
                            })
                        }} />
                </div>
                <button className='bg-indigo-600 rounded-[4px] hover:bg-indigo-700  text-white py-1 w-[100%] my-4 '
                    onClick={signupUser} >Submit</button>
                <Sociallogin />
                <Link to="./login">
                <h1 className='text-white text-[18px] mt-2' >Already have an account ?  Login here </h1>
                </Link>
               
            </div>
           
            <ToastContainer position="bottom-right" closeOnClick="true" pauseOnHover="true" />
        </div>
    )
}

export default Signup