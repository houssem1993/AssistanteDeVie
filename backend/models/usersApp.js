const mongoose = require("mongoose");
// import mongoose unique validator  module
const uniqueValidator=require("mongoose-unique-validator");


const userAppSchema=mongoose.Schema({

    FirstName:String,
    lastName:String,
    tel:Number,
    birthDay:Date,
    email:{type:String,unique:true} ,
    adresse:String,
    pwd:String,
    role:String,
    cv:String,
    avatar:String,
    status:String,

});

userAppSchema.plugin(uniqueValidator);

const userApp=mongoose.model("UserApp",userAppSchema);

module.exports=userApp;
