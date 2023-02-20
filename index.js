const express=require("express")

const connection=require("./db")
require('dotenv').config()
const app=express()
app.use(express.json())
const authentication=require('./middleware/middle')

const userRouter=require('./routes/user.route')
const linkdinRouter=require('./routes/linkdin.route')

app.get("/",(req,res)=>{
    res.send("Welcome")
})

app.use("/users",userRouter)
app.use(authentication)
app.use("/posts",linkdinRouter)

const port=process.env.port
app.listen(port,async()=>{

    try{
        await connection
        console.log("connected to db")
    }catch(err){
        console.log({"msg":"notconnected to db","error":err.message})
    }
    console.log(`connecting to server port ${port}`)
})