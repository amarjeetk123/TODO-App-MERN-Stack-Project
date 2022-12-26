import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import "./style.css";

// this is my react-toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Todos = ({ userId, userEmail }) => {
  const [userTodo, setUserTodo] = useState([]); // null or empty string "" both are same , this is default value
  const [messageShow, SetMessageShow] = useState(false);

  const [userTodosea, setUserTodosea] = useState([]);

  const [isSearch, setIsSearch] = useState(false);

  const [todos, settodos] = useState(""); // this field is filled we i click on any title

  const [newTitle, setNewTitle] = useState("");
  const [newMessage, setNewMessage] = useState("");

  /**
   * To store the search string.
   */

  const [search, setSearch] = useState("");
  // console.log(userEmail, userId)

  const fetchUserData = async () => {
    const userData = {
      userId: userId,
      userEmail: userEmail,
    };
    // console.log("daat22", userData);
    try {
      const respo = await axios.get("/list", userData);

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
  };

  const [editDetailsPermission, setEditDetailsPermission] = useState(false);
  const [isTitleChanging, setIsTitleChanging] = useState(false);
  const [isMessageChanging, setIsMessageChanging] = useState(false);

  const saveChange = async (todos) => {
    if (newTitle == "" && isTitleChanging) {
      setIsTitleChanging(false);
      return alert("Title can not be blank..");
    }
    if (newMessage == "" && isMessageChanging) {
      setIsMessageChanging(false);
      return alert("Message can not be blank..");
    }

    if (
      isTitleChanging &&
      newTitle !== "" &&
      isMessageChanging &&
      newMessage !== ""
    ) {
      const result = await axios.put(`/edit/${todos._id}`, {
        title: newTitle,
        message: newMessage,
      });
      if (result) {
        todos.title = newTitle;
        todos.message = newMessage;
        setIsMessageChanging(false);
        setIsTitleChanging(false);
        setNewMessage("");
        setNewTitle("");
      }
    } else if (isTitleChanging && newTitle !== "") {
      const result = await axios.put(`/edit/${todos._id}`, {
        title: newTitle,
      });
      if (result) {
        todos.title = newTitle;
        setIsTitleChanging(false);
        setNewTitle("");
      }
    } else if (isMessageChanging && newMessage !== "") {
      const result = await axios.put(`/edit/${todos._id}`, {
        message: newMessage,
      });
      if (result) {
        todos.message = newMessage;
        setIsMessageChanging(false);
        setNewMessage("");
      }
    }
    setIsMessageChanging(false);
    setIsTitleChanging(false);
  };

  useEffect(() => {
    fetchUserData();

    if (search === "") {
      setIsSearch(false);
    }
  }, [userTodo]);
  // useEffect(() => {
  //   isTitleChanging(false)
  //   isMessageChanging(false)
  // }, [])

  return (
    <>
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
                    className=" mb-3 flex justify-center items-center gap-4"
                  >
                    <div className="w-4 h-4 border border-blue-800 flex justify-center items-center p-4">
                      <h1 className="text-[18px]"> {id + 1} </h1>
                    </div>

                    <div className="w-[100%]">
                      <div className="w-[100%] h-9 cursor-pointer hover:bg-indigo-300 p-2 bg-gray-100">
                        <h1
                          className="text-[18px]"
                          onClick={() => {
                            SetMessageShow(!messageShow);
                            settodos(user);
                          }}
                        >
                          {user.title}
                        </h1>
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
                        onClick={() => {
                          SetMessageShow(!messageShow);
                          settodos(user);
                        }}
                      >
                        {user.title}
                      </h1>
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
      </div>
      {messageShow && (
        <div className=" w-[100vw] h-full absolute top-0 flex justify-center items-center bg1">
          <div className="min-w-[70%]  min-h-[200px]   px-4 bg-white  ">
            <i
              className="fa-solid fa-xmark text-[25px] cursor-pointer float-right mt-2  "
              onClick={() => {
                SetMessageShow(false);
                settodos("");
                setEditDetailsPermission(false);
                setIsMessageChanging(false);
                setIsTitleChanging(false);
              }}
            ></i>

            {editDetailsPermission ? (
              <button
                onClick={() => {
                  setEditDetailsPermission(!editDetailsPermission);
                  saveChange(todos);
                }}
                className="mt-4 text-[20px] py-1 float-right mr-4 mt-2 px-4 rounded-[7px] bg-indigo-500 text-white  "
              >
                Update Details
              </button>
            ) : (
              <button
                onClick={() => setEditDetailsPermission(!editDetailsPermission)}
                className="mt-4 text-[20px] py-1 float-right mr-4 mt-2 px-4 rounded-[7px] bg-indigo-500 text-white  "
              >
                Edit Details
              </button>
            )}

            <h1 className="mt-4 text-[26px]  ">
             <span className="text-indigo-700" > Title:-</span>
              {editDetailsPermission ? (
                <input
                  defaultValue={todos.title}
                  className="text-[22px] border-[2px] border-gray-600 px-1 min-w-[60%] "
                  onChange={(e) => {
                    setNewTitle(e.target.value);
                    setIsTitleChanging(true);
                  }}
                />
              ) : (
                <span className="font-serif">{todos.title}</span>
              )}
            </h1>

            <h1 className="mt-4 text-[26px] flex items-start flex-row">
           
              <span className="text-indigo-700" >Tasks:- </span>
              {editDetailsPermission ? (
                <textarea
                  defaultValue={todos.message}
                  className="text-[22px] border-[2px] border-gray-600 px-1 min-w-[80%] min-h-[40px] "
                  onChange={(e) => {
                    setNewMessage(e.target.value);
                    setIsMessageChanging(true);
                  }}
                />
              ) : (
                <span className="font-serif">{todos.message}</span>
              )}
            </h1>

            {/* <h1 className=" text-[26px] " >   <span className="font-mono">{openMessage}</span> </h1> */}
          </div>
        </div>
      )}
      <ToastContainer
        position="top-center"
        closeOnClick="true"
        pauseOnHover="true"
      />
    </>
  );
};

export default Todos;
