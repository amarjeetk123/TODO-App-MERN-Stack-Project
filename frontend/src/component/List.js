import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

// this is my react-toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Todos = () => {
    const [userTodo, setUserTodo] = useState(""); // null or empty string "" both are same , this is default value
    const [messageShow, SetMessageShow] = useState("false")

    /**
     * To store the search string.
     */
     const [search, setSearch] = useState("")

     const handleSearch = async (e) => {
        try{
            e.preventDefault()
            setSearch(search.trim())
            if(!search) return
            // console.log(search)
            let result__ = await axios.get(`/search/${search}`)  
            console.log(result__)
        }catch(error){
            console.log("Error while fetching search todos in getTodos method")
            console.log("Error: ", error)
        }     
    }
   

    const fetchUserData = async () => {
        const respo = await axios.get("/list");
        // console.log(respo)
        // if no users is there plesae no set the value of setUserData
        if (respo.data.users.length > 0) {
            setUserTodo(respo.data.users);
        }
    };
    // console.log(userTodo);
    // here we can put all the code of fetchUserData function inside useEffect insted of  calling that funvtion but the problem is,  it is a bad practice to put asynch await inside useEffect
    
    useEffect(() => {
        fetchUserData();
    }, [userTodo]);

    const handleEdit = async (user) => {
        const userchoice = window.confirm("Are You Sure to edit this title ?")
        if (userchoice) {
            const new_title = prompt("Please enter a new title for your todos")
            if (new_title) {
                const result = await axios.put(`/edit/${user._id}`, {
                    title: new_title,
                })
                return toast("Todo Title Edited Successfully", {
                    autoClose: 1300,
                    type: "success"

                })
            }
            else if (!new_title) {
                return toast("Todo Title is not Edited", {
                    autoClose: 1300,
                    type: "error"

                })
            }


        }
    }

    const handledelete = async (user) => {
        let userChoic = window.confirm("Are You Sure ?")
        if (userChoic) {
            const delete_ = await axios.delete(`/delete/${user._id}`)
        }

        return toast("Todo Deleted Successfully", {
            autoClose: 1300,
            type: "success"

        })
    }
    const handledeleteMessage = async (user) => {
        let userChoic = window.confirm("Are You Sure ?")
        if (userChoic) {
            const delete_ = await axios.delete(`/delete/${user._id}`)
        }

        // return toast("Todo Deleted Successfully", {
        //     autoClose: 1300,
        //     type: "success"

        // })
    }

    return (
        <div className="flex justify-center items-center mb-8">
            <div className="w-[70%] ">
                <div className=" text-center text-[30px] font-bold ">
                    <h2 className="text-indigo-600">All ToDos!</h2>

                </div>
                <div className="flex justify-end mb-4 py-2">
                    <input value={search} onChange={ (e) => setSearch(e.target.value) } 
                     onKeyDown={(e)=>{
                        if(e.key === "Enter") handleSearch(e)
                    }}
                     placeholder="Search for a title....." className=" text-[20px]  border-[2px] border-indigo-400 rounded-[6px] w-[30%] h-[40px] pl-3 outline-none focus:border-[3px] focus:border-indigo-500 bg-gray-100 focus:bg-white " type={"text"} />
                    <i   onClick={(e)=>{
                        handleSearch(e)
                    }}
                    className="fa-solid fa-magnifying-glass  fa-2x  absolute mr-2 mt-1 text-indigo-500 cursor-pointer  "></i>
                </div>


                <div className="bg-indigo-100  px-4 py-4 w-full ">
                    {userTodo &&
                        userTodo.map((user, id) => (
                            <div key={id} className=" mb-3 flex justify-center items-center gap-4">
                                <div className="w-4 h-4 border border-blue-800 flex justify-center items-center p-4">
                                    <h1 className="text-[18px]"> {id + 1} </h1>
                                </div>

                                <div className="w-[100%]" >
                                    <div className="w-[100%] h-9 cursor-pointer hover:bg-indigo-300 p-2 bg-gray-100">
                                        <h1 className="text-[18px]" onClick={() => SetMessageShow(!messageShow)}  >{user.title}</h1>

                                    </div>

                                    <div className=" " >
                                        {messageShow && <h1 className="text-[20px]  border-[2px] border-indigo-400  flex   justify-between p-2 " >   {user.message} <div onClick={() => handledeleteMessage(user.message)} className="cursor-pointer text-red-400 " >
                                            <i className="fa-solid fa-trash-can "  ></i>
                                        </div>  </h1>}
                                        
                                    </div>
                                </div>

                                {/* code for edit button  */}
                                <div onClick={() => handleEdit(user)} className="cursor-pointer  text-indigo-500 opacity-0.7" >
                                    <i className="fa-regular fa-pen-to-square fa-2x"   ></i>
                                </div>
                                {/* code for delete button  */}
                                <div onClick={() => handledelete(user)} className="cursor-pointer text-red-400 " >
                                    <i className="fa-solid fa-trash-can fa-2x"  ></i>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
            <ToastContainer position="top-center" closeOnClick="true" pauseOnHover="true" />
        </div>
    );
};

export default Todos;


