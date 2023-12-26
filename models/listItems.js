const mongoose=require("mongoose")

const listitemSchema=new mongoose.Schema({
    listItem:{type:String,required:true},
    email:{type:String,required:true},

})
const listmodel=mongoose.model("listitem",listitemSchema)
module.exports=listmodel