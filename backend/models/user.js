const mongoose=require("mongoose") ;
// import mongoose unique validator  module
const uniqueValidator = require("mongoose-unique-validator");

const userSchema=mongoose.Schema({

    FirstName:String ,
    lastName: String,
    tel :Number ,
    email: {type:String, unique:true} ,
    adresse:String ,
    birthDay: Date,
    role:String,
    pwd:String,


}) ;

userSchema.plugin(uniqueValidator);

const user = mongoose.model("User",userSchema);

module.exports=user;