import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

const Todos = () => {
    const [userTodo, setUserTodo] = useState(""); // null or empty string "" both are same , this is default value

    const fetchUserData = async () => {
        const respo = await axios.get("/list");
        // console.log(respo)

        // if no users is there plesae no set the value of setUserData
        if (respo.data.users.length > 0) {
            setUserTodo(respo.data.users);
        }
    };
    console.log(userTodo);
    // here we can put all the code of fetchUserData function inside useEffect insted of  calling that funvtion but the problem is,  it is a bad practice to put asynch await inside useEffect
    useEffect(() => {
        fetchUserData();
    }, [userTodo]);

    const handleEdit = async (user) => {
        const userchoice = window.confirm("Are You Sure to edit this title ?")
        if (userchoice) {
            const new_title = prompt("Please enter a new title for your todos")

            if (!new_title) {
                alert("please neter the title name")
            }
            else {
                const result = await axios.put(`/edit/${user._id}`, {
                    title: new_title,
                })
            }
        }

    }
    const handledelete = async (user) => {
        let userChoic = window.confirm("Are You Sure ?")
        if (userChoic) {
            const delete_ = await axios.delete(`/delete/${user._id}`)
        }
    }

    return (
        <div className="flex justify-center items-center mb-8">
            <div className="w-[70%] pl-8">
                <div className=" text-center text-[30px] font-bold">
                    <h2 className="text-indigo-600">All ToDos!</h2>
                </div>
                <div className="bg-red-100  px-4 py-4 w-full border border-red-500">
                    {userTodo &&
                        userTodo.map((user) => (
                            <div className=" mb-3 flex justify-center items-center gap-4">
                                <div className="w-4 h-4 border border-blue-800 flex justify-center items-center p-4">
                                    <h1 className="text-[18px]">1</h1>
                                </div>

                                <div className="w-[70%] h-9 cursor-pointer hover:bg-indigo-100 p-2 bg-gray-100">
                                    <h1 className="text-[18px]">{user.title}</h1>
                                </div>

                                {/* code for edit button  */}
                                <div onClick={() => handleEdit(user)} className="cursor-pointer  text-indigo-500 opacity-0.7" >
                                    <i class="fa-regular fa-pen-to-square fa-2x"   ></i>
                                </div>
                                {/* code for delete button  */}
                                <div onClick={() => handledelete(user)} className="cursor-pointer text-red-400 " >
                                    <i class="fa-solid fa-trash-can fa-2x"  ></i>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default Todos;


