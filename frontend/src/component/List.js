import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

// this is my react-toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Todos = ({ userId, userEmail }) => {
    const [userTodo, setUserTodo] = useState([]); // null or empty string "" both are same , this is default value
    const [messageShow, SetMessageShow] = useState(false);

    const [userTodosea, setUserTodosea] = useState([]);

    const [isSearch, setIsSearch] = useState(false);
   

    /**
     * To store the search string.
     */

    const [search, setSearch] = useState("");
    // console.log(userEmail, userId)

    //  console.log(userEmail)

    const fetchUserData = async () => {

        const  userData =  {
            userId: userId,
            userEmail: userEmail,
        };

        console.log("daat22", userData)
        try {
            const respo = await axios.get("/list", userData);
            // console.log(respo)
            // if no users is there plesae no set the value of setUserData
            if (respo.data.users.length > 0) {
                setUserTodo(respo.data.users);
                // console.log(respo.data.users)
            }
        } catch (error) {
            console.log(error);
        }
    };
    // console.log(userTodo);
    // here we can put all the code of fetchUserData function inside useEffect insted of  calling that funvtion but the problem is,  it is a bad practice to put asynch await inside useEffect

    const [noSearchValue, SetNoSearchValue] = useState(false);
    const handleSearch = async (e) => {
        try {
            e.preventDefault();

            setIsSearch(true);

            if (!search) {
                return;
            }

            let res = await axios.get("/search", { params: { search } });

            SetNoSearchValue(false);

            if (res.data.unfilteredTodos.length > 0) {
                setUserTodosea(res.data.unfilteredTodos);
            }
        } catch (error) {
            // console.log("Error while fetching search todos in search todos method")
            // console.log("Error: ", error)

            if (error.response.data == "no value available") {
                SetNoSearchValue(true);
            }
        }
    };

    const handleEdit = async (user) => {
        const userchoice = window.confirm("Are You Sure to edit this title ?");
        if (userchoice) {
            const new_title = prompt("Please enter a new title for your todos");
            if (new_title) {
                const result = await axios.put(`/edit/${user._id}`, {
                    title: new_title,
                });
                return toast("Todo Title Edited Successfully", {
                    autoClose: 1300,
                    type: "success",
                });
            } else if (!new_title) {
                return toast("Todo Title is not Edited", {
                    autoClose: 1300,
                    type: "error",
                });
            }
        }
    };

    const handledelete = async (user) => {
        let userChoic = window.confirm("Are You Sure ?");
        if (userChoic) {
            const delete_ = await axios.delete(`/delete/${user._id}`);
        }

        return toast("Todo Deleted Successfully", {
            autoClose: 1300,
            type: "success",
        });
    };
    const handledeleteMessage = async (user) => {
        let userChoic = window.confirm("Are You Sure ?");
        if (userChoic) {
            const delete_ = await axios.delete(`/delete/${user._id}`);
        }

        // return toast("Todo Deleted Successfully", {
        //     autoClose: 1300,
        //     type: "success"

        // })
    };

    useEffect(() => {
       
        fetchUserData();

        if (search == "") {
            setIsSearch(false);
        }
    }, [userTodo]);
    
    useEffect(() => {
     console.log("id",userId)
    }, [])
    

    return (
        <div className="flex justify-center items-center mb-8">
            <div className="w-[70%] ">
                <div className=" text-center text-[30px] font-bold ">
                    <h2 className="text-indigo-600">All ToDos!</h2>
                </div>
                <div className="flex justify-end mb-4 py-2">
                    <input
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") handleSearch(e);
                        }}
                        placeholder="Search for a title....."
                        className=" text-[20px]  border-[2px] border-indigo-400 rounded-[6px] w-[30%] h-[40px] pl-3 outline-none focus:border-[3px] focus:border-indigo-500 bg-gray-100 focus:bg-white "
                        type={"text"}
                    />
                    <i
                        className="fa-solid fa-magnifying-glass  fa-2x  absolute mr-2 mt-1 text-indigo-500 cursor-pointer  "
                        onClick={(e) => {
                            handleSearch(e);
                        }}
                    ></i>
                </div>

                <div className="bg-indigo-100  px-4 py-4 w-full ">
                    {isSearch ? (
                        noSearchValue ? (
                            <p className="text-sm md:text-2xl font-semibold text-violet-800 text-center p-2">
                                No todos title available with respect to your search
                            </p>
                        ) : (
                            userTodosea.map((user, id) => (
                                <div
                                    key={id}
                                    className=" mb-3 flex justify-center items-center gap-4"    >
                                    <div className="w-4 h-4 border border-blue-800 flex justify-center items-center p-4">
                                        <h1 className="text-[18px]"> {id + 1} </h1>
                                    </div>

                                    <div className="w-[100%]">
                                        <div className="w-[100%] h-9 cursor-pointer hover:bg-indigo-300 p-2 bg-gray-100">
                                            <h1
                                                className="text-[18px]"
                                                onClick={() => {
                                                    SetMessageShow(!messageShow)

                                                }}
                                            >
                                                {user.title}
                                            </h1>
                                        </div>

                                        <div >
                                            {messageShow && (
                                                <h1 className="text-[20px]  border-[2px] border-indigo-400  flex   justify-between p-2 ">
                                                    {user.message}
                                                    {/* <div
                                                        onClick={() => handledeleteMessage(user.message)}
                                                        className="cursor-pointer text-red-400 "
                                                    >
                                                        <i className="fa-solid fa-trash-can "></i>
                                                    </div> */}
                                                </h1>
                                            )}
                                        </div>
                                    </div>

                                    {/* code for edit button  */}
                                    <div
                                        onClick={() => handleEdit(user)}
                                        className="cursor-pointer  text-indigo-500 opacity-0.7"
                                    >
                                        <i className="fa-regular fa-pen-to-square fa-2x"></i>
                                    </div>
                                    {/* code for delete button  */}
                                    <div
                                        onClick={() => handledelete(user)}
                                        className="cursor-pointer text-red-400 "
                                    >
                                        <i className="fa-solid fa-trash-can fa-2x"></i>
                                    </div>
                                </div>
                            ))
                        )
                    ) : userTodo.length === 0 ? (
                        <p className="text-2xl font-semibold text-violet-800 text-center p-2">
                            Your have no todos left...!
                        </p>
                    ) : (
                        userTodo.map((user, id) => (
                            <div
                                key={id}
                                className=" mb-3 flex justify-center items-center gap-4"
                            >
                                <div className="w-4 h-4 border border-blue-800 flex justify-center items-center p-4">
                                    <h1 className="text-[18px]"> {id + 1} </h1>
                                </div>

                                <div className="w-[100%]">
                                    <div className="w-[100%] h-9 cursor-pointer hover:bg-indigo-300 p-2 bg-gray-100">
                                        <h1
                                            className="text-[18px]"
                                            onClick={() => SetMessageShow(!messageShow)}
                                        >
                                            {user.title}
                                        </h1>
                                    </div>

                                    <div>
                                        {messageShow && (
                                            <h1 className="text-[20px]  border-[2px] border-indigo-400  flex   justify-between p-2 ">
                                               
                                                {user.message}
                                                {/* <div onClick={() => handledeleteMessage(user.message)} className="cursor-pointer text-red-400 " >
                                                        <i className="fa-solid fa-trash-can "  ></i>
                                                    </div> */}
                                            </h1>
                                        )}
                                    </div>
                                </div>

                                {/* code for edit button  */}
                                <div
                                    onClick={() => handleEdit(user)}
                                    className="cursor-pointer  text-indigo-500 opacity-0.7"
                                >
                                    <i className="fa-regular fa-pen-to-square fa-2x"></i>
                                </div>
                                {/* code for delete button  */}
                                <div
                                    onClick={() => handledelete(user)}
                                    className="cursor-pointer text-red-400 "
                                >
                                    <i className="fa-solid fa-trash-can fa-2x"></i>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
            <ToastContainer
                position="top-center"
                closeOnClick="true"
                pauseOnHover="true"
            />
        </div>
    );
};

export default Todos;
