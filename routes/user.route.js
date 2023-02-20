const express=require('express')
const jwt=require('jsonwebtoken')

const bcrypt=require('bcrypt')

const User=require("../model/usermodel")

const router=express.Router()

router.post("/register",async(req,res)=>{

    const{name,email,gender,password,age,city}=req.body
   
    try{
        const user=await User.find({email})
        if(user.length>0){
            res.send({"msg":"User already exist, please login."})
        }else{
            bcrypt.hash(password,5, async(err, hash)=>{
                const user=new User({name,email,gender,password:hash,age,city})
                await user.save()
                res.status(200).send({"msg":"Registered Successfully"})
            });

        }
        
       
    }catch(err){
        res.send({"msg":"something goes wrong","error":err.message})
    }
})

router.post("/login",async(req,res)=>{

    const{email,password}=req.body
    try{
        const user= await User.find({email})
        if(user.length>0){
            bcrypt.compare(password,user[0].password, async(err, result)=>{
               if(result){
                const token = jwt.sign({ userID: user[0]._id }, 'masai');
                res.status(200).send({"msg":"Logged In",token:token})
               }else{
                res.send({"msg":"Wrong crendential","error":err.message})
               }
            });

        }else{
            res.send({"msg":"Wrong crendential",})
        }

    }catch(err){
        res.send({"msg":"Something went wrong","error":err.message})
    }
})

module.exports=router