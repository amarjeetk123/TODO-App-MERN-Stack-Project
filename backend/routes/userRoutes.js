const express = require("express");
const router = express.Router()

const {home,add_todo,getTodos,delete_todo,edit_todo} = require("../controller/userController")

router.get("/",home)
router.post("/add",add_todo)
router.get("/list",getTodos)
router.delete("/delete/:id" , delete_todo)
router.put("/edit/:id" , edit_todo)

module.exports = router;