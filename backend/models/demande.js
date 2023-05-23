const mongoose = require("mongoose");


const demandeSchema=mongoose.Schema({

    FirstName:String,
    lastName:String,
    tel:Number,
    birthDay:Date,
    email:String,
    subject:String,
    pwd:String,
    role:String,
    idAssistant:String,
    idUser:String,
    status:String,


});

const demande=mongoose.model("Demande",demandeSchema);

module.exports=demande;
