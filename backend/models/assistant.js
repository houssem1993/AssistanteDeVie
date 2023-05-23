const mongoose = require("mongoose");
// import mongoose unique validator  module
const uniqueValidator=require("mongoose-unique-validator");


const assistantSchema=mongoose.Schema({

    FirstName:String,
    lastName:String,
    tel:Number,
    birthDay:Date,
    email:{type:String,unique:true} ,
    adresse:String,
    pwd:String,
    role:String,

});

assistantSchema.plugin(uniqueValidator);

const assistant=mongoose.model("Assistant",assistantSchema);

module.exports=assistant;


