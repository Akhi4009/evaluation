const mongoose=require("mongoose")

const linkSchema=mongoose.Schema({
    title:{type:String,required:true},
    body:{type:String,required:true},
    device:{type:String,required:true},
    no_if_comments:{type:Number,required:true},
    userID:{type:String,required:true}
    
},{
    versionKey:false
})

const Linkdin=mongoose.model("data",linkSchema)

module.exports=Linkdin