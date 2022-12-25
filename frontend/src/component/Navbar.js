import React from 'react'
import {account} from "../appwrite/appwriteConfig"
import {useNavigate } from "react-router-dom"

function Navbar({name}) {
  const navigate =  useNavigate();


  const logout  = async () =>{
    try {
      await account.deleteSession("current") // "current" is a string which i found from research
      navigate("/login")
    } catch (error) {
      console.log(error)
      
    }
  }
  return (
    <div className='bg-indigo-300 px-8 py-2  fixed top-0 w-full flex justify-between items-center '>
       <div className='flex items-center gap-2' >
       <h1 className='text-[30px] font-semibold font-sans flex gap-2' >Hello <span style={{fontFamily:"cursive" , textTransform:"capitalize" }} >{name}</span>  </h1>
       
       </div>
       <div className='flex gap-8 text-[22px] font-semibold'>
          
          <a href='https://github.com/amarjeetk123/TODO-App-MERN-Stack-Project' target="_blank" ><h1>Source Code</h1></a>
          <a href='https://github.com/amarjeetk123' target="_blank" ><h1>Developer Github Profile</h1></a>
          <a href='https://amarjeet-portfolio.netlify.app/' target="_blank" ><h1>Developer Portfolio</h1></a>
       </div>

       <button onClick={logout} className='absolute hover:bg-indigo-500  top-20 bg-indigo-400 py-1 px-5 rounded-[5px] ' >Log Out</button>



    </div>
  )
}

export default Navbar;