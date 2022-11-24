const express = require("express");
const { route } = require("../App");
const router = express.Router()

const {home,add_todo,delete_todo,edit_todo} = require("../controller/userController")

router.get("/",home)
router.get("/add",add_todo)
router.delete("/delete/:id" , delete_todo)
router.put("/edit/:id" , edit_todo)

module.exports = router;