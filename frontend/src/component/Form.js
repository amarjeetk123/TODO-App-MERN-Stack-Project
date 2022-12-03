import React, { useState } from "react";
import axios from "axios"

// this is my react-toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Form = () => {

  const [userTitle,setTitle] = useState("")
  const [userMessage,setMessage] = useState("")

  const submitData = async () =>{
    const userData = {
      title: userTitle,
      message: userMessage,
    }
    if(userData.title==""){
      return toast( "Please Write a Title for your Todo" , {
        autoClose: 3000,
        type : "error"

      })
     
    }
    const result = await axios.post("/add" , userData)
    // console.log(result)

    setTimeout(() => {
      return toast("TODO Created Successfully" , {
        type : "success",
        autoClose: 1600,
        hideProgressBar: true,
      })
  }, 100);

  }

  const handleSubmit = (e) =>{
    // code for prevent the page to referece
    e.preventDefault()

    //
    submitData();
    // after submiting , clear the box
    setMessage("")
    setTitle("")

  }
  return (
    < div >
     <ToastContainer position="top-center" closeOnClick = "true" pauseOnHover ="true" autoClose= "2500" />
      <form onSubmit={handleSubmit} className="  flex justify-center items-center mb-8 mt-24">
        <div className=" w-[70%] bg-indigo-100  flex justify-center items-center ">
          <div className=" w-[100%] border px-6 py-4 border-indigo-200">
            <div className="text-center text-[30px] font-bold">
              <h2 className="text-indigo-800">Create TODO</h2>
            </div>
            <div className="flex flex-col justify-between sm:flex-row gap-6 mt-4">
              <div className="flex flex-col  ">
                <label  className="text-[20px] font-mono">Title</label>
                <input placeholder="Add Title" value={userTitle} onChange={(event) => setTitle(event.target.value) }  className="bg-gray-100 bg-opacity-60 rounded border border-gray-300 focus:border-indigo-400 py-1 px-3 text-gray-700 text-lg focus:bg-white focus:ring-2 outline-none transition-colors duration-200 ease-in-out  " />
              </div>
              <div className="flex flex-col w-[45%] ">
                <label className="text-[20px] font-mono">Message</label>
                <textarea placeholder="Add a Task" value={userMessage} onChange={(event) => setMessage(event.target.value) } className="bg-gray-100 bg-opacity-60 rounded border border-gray-300 focus:border-indigo-400 py-1 px-3 text-gray-700 text-lg focus:bg-white focus:ring-2 outline-none transition-colors duration-200 ease-in-out min-h-[90px] max-h-[200px] " />
              </div>
              <div className="p-2 ">
                <button
                  type="submit"
                  className="flex  text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg mt-6"
                >
                  Add Task
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
export default Form;
