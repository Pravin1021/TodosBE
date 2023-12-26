const mongoose=require("mongoose")


const userSchema=new mongoose.Schema({
    regMail:{type:String,required:true},
    regPassword:{type:String,required:true}
})

const usersmodel=mongoose.model('users',userSchema)

module.exports=usersmodel