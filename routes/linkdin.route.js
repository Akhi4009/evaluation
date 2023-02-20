const express=require('express')

const Linkdin=require("../model/linkdinmodel")

const router=express.Router()

router.post("/create",async(req,res)=>{
const payload=req.body
try{
    const post= new Linkdin(payload)
    await post.save()
    res.send({"msg":"post added"})
}catch(err){
    res.send({"msg":"Something went wrong","error":err.message})
}
})
router.get("/",async(req,res)=>{

    try{
        const posts=await Linkdin.find({userID:req.body.userID})
        res.status(200).send({"msg":"success",Post:posts})
    }catch(err){
        res.send({"msg":"Something went wrong","error":err.message})
    }
})


router.get("/top",async(req,res)=>{
    try{
        const posts=await Linkdin.find({userID:req.body.userID})
        res.status(200).send({"msg":"success",Post:posts})
    }catch(err){
        res.send({"msg":"Something went wrong","error":err.message})
    }
})

router.patch("/update/:id",async(req,res)=>{
    const id=req.params.id
    const payload=req.body
    const post=await Linkdin.findOne({"_id":id})

    const userID=req.body.userID
   try{
        if(post.userID!==userID){
            res.send({"msg":"You are not authorized"})
        }else{
            await Linkdin.findByIdAndUpdate({"_id":id},payload)
            res.send({"msg":"updated"})
        }
    }catch(err){
        res.send({"msg":"Something went wrong","error":err.message})
    }

})


router.delete("/delete/:id",async(req,res)=>{
    const id=req.params.id
   
    const post=await Linkdin.findOne({"_id":id})

    const userID=req.body.userID

    try{
        if(post.userID!==userID){
            res.send({"msg":"You are not authorized"})
        }else{
            await Linkdin.findByIdAndDelete({"_id":id})
            res.send({"msg":"Deleted"})
        }
    }catch(err){
        res.send({"msg":"Something went wrong","error":err.message})
    }

})





module.exports=router