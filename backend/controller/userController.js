const User = require("../model/userModel");

exports.home = (req, res) => {
    res.send("Amarjett Kumar Aryan");
};

// function for add the TODO
exports.add_todo = async (req, res) => {
    try {
        // collect the details
        const { title, message } = req.body;

        // check title is present or not
        if (!title) {
            res.status(401).send("title is required");
        }

        // inserting user data inti database
        const user_data = await User.create({ title, message });

        res.status(201).json({
            succsess: true,
            message: "TODO created succesfully",
            user_data,
        });
    } catch (error) {
        console.log(error.message);
        res.status(201).json({
            succsess: false,
            message: "Error in add_todo function",
        });
    }
};

// get all the TODOs
exports.getTodos = async (req,res) =>{

    try {
        const users = await User.find()
        res.status(200).json({
            success:true,
            users,
        })
        
    } catch (error) {
        console.log(error)
        res.status(400).json({
            success : false,
            message : error.message,
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

