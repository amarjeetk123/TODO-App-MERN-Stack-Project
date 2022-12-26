const User = require("../model/userModel");

exports.home = (req, res) => {
    res.send("Amarjett Kumar Aryan");
};

// function for add the TODO
exports.add_todo = async (req, res) => {
    try {
        // collect the details
        const { title, message, userId , userEmail } = req.body;
      
        // check title is present or not
        if (!title) {
            res.status(401).send("title is required");
        }
        if (!userId) {
            return res.status(401).send("User Id is required to add the todos")
        }

        // inserting user data inside database
        else {
            const user_data = await User.create({ title, message, userId , userEmail });
           
            res.status(201).json({
                succsess: true,
                message: "TODO created succesfully",
                user_data,
            });
        }
    } catch (error) {
        console.log(error.message);
        res.status(201).json({
            succsess: false,
            message: "Error in add_todo function",
        });
    }
};

// get all the TODOs
exports.getTodos = async (req, res) => {
    // const {  userId , userEmail } = req.body;
    // console.log(userEmail,userId)
    // if (!userId) {
    //     return res.status(401).send("userId is required to fetch the todos")
    // }
    // if (!userEmail) {
    //     return res.status(401).send("userEmail  is required to fetch the todos")
    // }

    try {
        // const users = await User.findById({userId , userEmail})
        const users = await User.find()
        // console.log(users)
        res.status(200).json({
            success: true,
            users,
        })

    } catch (error) {
        console.log(error)
        res.status(400).json({
            success: false,
            message: error.message,
        })

    }

}

//function for EDIT the todo

exports.edit_todo = async (req, res) => {
    try {
        const user_data = await User.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).json({
            success: true,
            message: "TODO update succesfull"
        })

    } catch (error) {
        console.log(error.message);
        res.status(201).json({
            succsess: false,
            message: "Error in edit_todo function",
        });
    }

}

//function for delete the todo

exports.delete_todo = async (req, res) => {
    try {
        const user_id = req.params.id
        const userData = await User.findByIdAndDelete(user_id)
        res.status(200).json({
            success: true,
            message: "TODO delete succesfull"
        })
    } catch (error) {
        console.log(error.message);
        res.status(201).json({
            succsess: false,
            message: "Error in delete_todo function",
        });
    }

}

// FUNCTION FOR SEARCH ANy TODO
/**
 * searchTodos() - Asynchronous Function
 *      - Destructures the input received in req.query.
 *      - Validated if userId/appwriteId is received.
 *      - Validated if userId/appwriteId received is of type string. 
 *      - Validated if search is received.
 *      - Validated if search received is of type string.
 *      - Fetch the user using userId/appwriteId - (Asynchronous operation - find())
 *      - Validate if user exists in DB
 *      - Finds the todos and tasks which include the search value using regex and $or operation.
 *      - Validate if todos and tasks returned falsy values.
 *      - Only filter the todos whose user reference matches with the user we fetched
 */
exports.searchTodos = async (req, res) => {
    const { search } = req.query
    const { userId } = req.body
    if (!search) {
        return res.status(401).send("Please give any value")
    }
    // if(!userId){
    //     return res.status(401).send("User Id is required to fetch the todos")
    // }
    try {

        // const user = await User.find({userId});

        // if(!user){
        //     throw new Error("User not found in DB")
        // }

        const unfilteredTodos = await User.find({ $or: [{ title: new RegExp(search, 'i') }] })
        console.log(unfilteredTodos)

        if (unfilteredTodos == "") {
            console.log("skskkskskksks")
            return res.status(401).send("no value available")
        }

        // const todos = unfilteredTodos.filter((todo)=>todo.user.equals(user[0]._id))
        res.status(200).json({
            success: true,
            unfilteredTodos
        })
    } catch (error) {
        console.log("Error in search todo controller")
        console.log(error)
        res.status(401).json({
            success: false,
            error
        })
    }
}





/**
 * deleteTodo() - Asynchronous Function
 *      - Destructures the input received in req.params.
 *      - Validated if userId/appwriteId is received.
 *      - Validated if userId/appwriteId received is of type string.
 *      - Validated if todoId is received.
 *      - Validated if todoId received is of type string.
 *      - Fetch the todo using todoID - (Asynchronous operation - findByIDAndDelete())
 *      - Fetch the user using userId/appwriteId - (Asynchronous operation - find())
 *      - Validate todo exists
 *      - Validate user exists
 *      - Filter the user todos collection. Filter all the todos which was not deleted and store it to user todos
 *      - Save the user (Asynchronous operation - save())
 */
//  exports.deleteTodo = async (req, res) => {
//     try{
//         const { userId, todoId } = req.params

//         if(!userId){
//             throw new Error("User ID is required to delete the todo")
//         }

//         if(typeof userId !== "string"){
//             throw new Error("User Id should of type string")
//         }

//         if(!todoId){
//             throw new Error("Todo ID is required to fetch the todo")
//         }

//         if(typeof todoId !== "string"){
//             throw new Error("Todo Id should of type string")
//         }

//         const todo = await Todo.findByIdAndDelete(todoId)

//         const user = await User.find({appwriteId: userId})

//         if(!todo){
//             throw new Error("Todo not found in DB")
//         }

//         if(!user[0]){
//             throw new Error("User not found in DB")
//         }

//         user[0].todos = user[0].todos.filter((todoObj)=>(todoObj.equals(todo._id)===false))

//         await user[0].save()

//         res.status(200).json({
//             success: true,
//             message: "Todo deleted successfully",
//             deleteTodo: todo
//         })
//     } catch(error){
//         console.log("Error in delete todo controller")
//         console.log("ERROR: ", error)
//         res.status(400).json({
//             success: false,
//             messageSrc: "Error in delete todo controller",
//             error
//         })
//     }
// }
