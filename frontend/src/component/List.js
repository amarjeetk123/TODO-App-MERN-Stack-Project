import React from 'react'

const Todos = () => {
    return (
        <>
            <div className="w-[70%] pl-8">
                <div className="text-center text-[30px] font-bold"><h2 className="text-indigo-800">All Tasks</h2></div>
                <div className=" w-full">
                    <table className="table-auto w-full text-left ">
                        <thead>
                            <tr>
                                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">
                                    Title
                                </th>
                                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                                    Date
                                </th>
                                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                                    Open
                                </th>
                                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                                    Delete
                                </th>
                            </tr>
                        </thead>
                        {/* <tbody>
                            {userData &&
                                userData.map((user) => (
                                    <tr>
                                        <td className="px-4 py-3">{user.name}</td>
                                        <td className="px-4 py-3">{user.email}</td>
                                        <td className="px-4 py-3">
                                            <button
                                                className="hover:text-green-500"
                                                onClick={() => handleEdit(user)}
                                            >
                                                Edit
                                            </button>
                                        </td>
                                        <td className="px-4 py-3 text-lg text-gray-900">
                                            <button
                                                className="hover:text-red-500"
                                                onClick={() => handleDelete(user._id)} // we can pass yser or user._id
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody> */}
                    </table>
                </div>
            </div>
        </>
    )
}

export default Todos;