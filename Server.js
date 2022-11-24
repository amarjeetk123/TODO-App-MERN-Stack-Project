const app = require("./App")
const PORT = process.env.PORT || 4000
app.listen(PORT,()=>{
    console.log("APP is running at port number:-" , PORT)
})