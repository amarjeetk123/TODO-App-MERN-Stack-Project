import React, { useState } from "react";
import axios from "axios"

const Form = () => {

  const [userTitle,setTitle] = useState("")
  const [userMessage,setMessage] = useState("")

  const submitData = async () =>{
    const userData = {
      title: userTitle,
      message: userMessage,
    }
    const result = await axios.post("/add" , userData)
    console.log(result)

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
    <>
      <form onSubmit={handleSubmit}>
        <div className="w-[70%] h-[60vh] pl-8 flex justify-center items-center ">
          <div className=" w-[100%] border px-6 py-4 border-indigo-200">
            <div className="text-center text-[30px] font-bold">
              <h2 className="text-indigo-800">TODO APP</h2>
            </div>
            <div className="flex flex-col justify-between sm:flex-row gap-6 mt-4">
              <div className="flex flex-col  ">
                <label className="text-[20px] font-mono">Title</label>
                <input value={userTitle} onChange={(event) => setTitle(event.target.value) }  className="bg-gray-100 bg-opacity-60 rounded border border-gray-300 focus:border-indigo-400 py-1 px-3 text-gray-700 text-lg focus:bg-white focus:ring-2 outline-none transition-colors duration-200 ease-in-out " />
              </div>
              <div className="flex flex-col w-[45%] ">
                <label className="text-[20px] font-mono">Message</label>
                <textarea value={userMessage} onChange={(event) => setMessage(event.target.value) } className="bg-gray-100 bg-opacity-60 rounded border border-gray-300 focus:border-indigo-400 py-1 px-3 text-gray-700 text-lg focus:bg-white focus:ring-2 outline-none transition-colors duration-200 ease-in-out " />
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
    </>
  );
};
export default Form;
