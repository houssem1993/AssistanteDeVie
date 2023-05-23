// import express module
const express = require("express");
// import bcrypt  module
const bcrypt = require("bcrypt");
// import jwt  module
const jwt = require("jsonwebtoken");

const nodemailer = require("nodemailer");

// import multer  module
const multer = require("multer");
// import path  module
const path = require("path");
// import body-parser module
const bodyParser = require("body-parser");
// import mongoose module
const mongoose = require("mongoose");
mongoose.connect('mongodb://127.0.0.1:27017/validationDB');


// create express application
const app = express();

// import authenticate
const authenticate= require("./middelware/authenticate");



// configure body-parser
// send JSON response
app.use(bodyParser.json());
// get object from Request
app.use(bodyParser.urlencoded({ extended: true }));

// Security configuration
app.use((req, res, next) => {
   res.setHeader("Access-Control-Allow-Origin", "*");
   res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, Accept, Content-Type, X-Requested-with, Authorization, expiresIn"
   );
   res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, DELETE, OPTIONS, PATCH, PUT"
   );
   next();
});

app.use('/document', express.static(path.join('backend/document')))

const MIME_TYPE = {
   'application/doc': 'doc',
   'application/docx': 'docx',
   'application/pdf': 'pdf',
}
const storageConfig = multer.diskStorage({
   // destination
   destination: (req, file, cb) => {
      const isValid = MIME_TYPE[file.mimetype];
      let error = new Error("Mime type is invalid");
      if (isValid) {
         error = null;
      }
      cb(null, 'backend/document')
   },
   filename: (req, file, cb) => {
      const name = file.originalname.toLowerCase().split(' ').join('-');
      const extension = MIME_TYPE[file.mimetype];
      const cvName = name + '-' + Date.now() + '-crococoder-' + '.' +
         extension;
      cb(null, cvName);
   }
});


app.use('/avatars', express.static(path.join('backend/images')))

const MIME_TYPE_TWO = {
   'image/png': 'png',
   'image/jpeg': 'jpg',
   'image/jpg': 'jpg'
  }

  const storageConfigUser = multer.diskStorage({
   // destination
   destination: (req, file, cb) => {
   const isValid = MIME_TYPE_TWO[file.mimetype];
   let error = new Error("Mime type is invalid");
   if (isValid) {
   error = null;
   }
   cb(null, 'backend/images')
   },
   filename: (req, file, cb) => {
   const name = file.originalname.toLowerCase().split(' ').join('-');
   const extension = MIME_TYPE_TWO[file.mimetype];
   const imgName = name + '-' + Date.now() + '-crococoder-' + '.' + 
  extension;
   cb(null, imgName);
   }
  })



// import assistant model
const Assistant = require("./models/assistant");
// import user model
const User = require("./models/user");
// import userApp model
const UserApp = require("./models/usersApp");
const Demande = require("./models/demande");
const demande = require("./models/demande");






app.post("/allUsers/assistant/subscription", multer({ storage: storageConfig }).single('cv'), (req, res) => {
   console.log("here BL: Signup Assistant", req.body);

   bcrypt.hash(req.body.pwd, 8).then(
      (cryptedPwd) => {
         let assistant = new UserApp({

            FirstName: req.body.FirstName,
            lastName: req.body.lastName,
            tel: req.body.tel,
            birthDay: req.body.birthDay,
            email: req.body.email,
            adresse: req.body.adresse,
            pwd: cryptedPwd,
            role: req.body.role,
            status:req.body.status,
            cv: `http://localhost:3000/document/${req.file.filename}`,
           

         });

         assistant.save((error, doc) => {
            console.log("here error", error);
            console.log("here doc", doc);

            if (doc) {
               res.json({ message: "assistant added" });
            } else {
               res.json({ message: "error" });
            }

         });





      });




});



// BL : Login 
app.post("/allUsers/signin", (req, res) => {
   console.log("here BL:Login ", req.body);

   let findedUser;

   UserApp.findOne({ email: req.body.email }).then(
      (doc) => {
         findedUser=doc;
         console.log(doc);

         if (!doc) {

            res.json({ message: "check email" })

         }
         return bcrypt.compare(req.body.pwd, doc.pwd);
      }).then(
         (pwdResult) => {
            console.log(pwdResult);
            if (!pwdResult) {
               res.json({ message: "check pwd" })

            } else {

               const token = jwt.sign(
                  {
                  email: findedUser.email,
                  id: findedUser._id,
                  role: findedUser.role,
                  },
                  "Testing" ,
                  { expiresIn: "5min" }
                  );
                  let userToSend = {
                  id: findedUser._id,
                  FirstName: findedUser.FirstName,
                  lastName: findedUser.lastName,
                  role: findedUser.role,
                  jwt: token,
                  expiresIn: 300,
                  }
                 
               res.json({ message: "welcome" , user:userToSend })
            }
         }
      )

});



// BL : Get All Assistants
app.get("/allUsers/assistant", (req, res) => {
   console.log("here BL:Get All Assistants");

   UserApp.find({ role: "assistant" }).then(
      (data) => {

         res.json({ assistants: data });
      }
   );


});

// BL : Get All Assistants For Demande
// app.get("/allUsers/assistant/:id", (req, res) => {
//    console.log("here BL:Get All Assistants for demande");

//    let id=req.params.id;

//    UserApp.find({_id:id}).then(
//       (data) => {

//          res.json({ assistants: data });
//       }
//    );


// });


// BL: GET ALL ASSISTANT CONFIRME

app.get("/allUsers", (req, res) => {
   console.log("here BL:Get All Assistants confirmed");

   UserApp.find({ role: "assistant", status:"confirmed"}).then(
      (data) => {

         res.json({ assistantsConfirmed: data });
      }
   );


});


// BL : Edit  Assistant
app.put("/allUsers/assistant", (req, res) => {
   console.log("here BL: Edit  Assistant");

   let newAssistant = req.body;

   UserApp.updateOne({ _id: newAssistant._id }, newAssistant).then(
      (editResponse) => {
         console.log(editResponse);
         if (editResponse.nModified == 1) {

            res.json({ message: "edited assistant with success" })

         }
      }
   );



});


// BL : Get Assistant By Id
app.get("/allUsers/assistant/:id", (req, res) => {
   console.log("here BL:Get Assistant By Id");

   let id = req.params.id;

   UserApp.findOne({ _id: id }).then(
      (data) => {
         res.json({ findedAssistant: data });
      }
   );
});


// BL : Delete Assistant By Id
app.delete("/allUsers/assistant/:id", (req, res) => {
   console.log("here BL:Delete Assistant By Id");

   let id = req.params.id;

   UserApp.deleteOne({ _id: id }).then(
      (deletedResponse) => {
         if (deletedResponse.deletedCount == 1) {

            res.json({ message: "deletedResponse :deleted assistant with success" });

         }
      }
   );


});



// BL : Signup  user
app.post("/allUsers/user/subscription", multer({ storage: storageConfigUser }).single('img'), (req, res) => {
   console.log("here BL: Signup user", req.body);

   bcrypt.hash(req.body.pwd, 8).then(
      (cryptedPwdUser) => {
         let user = new UserApp({

            FirstName: req.body.FirstName,
            lastName: req.body.lastName,
            tel: req.body.tel,
            birthDay: req.body.birthDay,
            email: req.body.email,
            adresse: req.body.adresse,
            pwd: cryptedPwdUser,
            role: req.body.role,
            avatar: `http://localhost:3000/avatars/${req.file.filename}`

         });


         user.save((error, doc) => {
            console.log("here error", error);
            console.log("here doc", doc);

            if (doc) {
                res.json({ message: "user added" });
            } else {
                res.json({ message: "error" });
            }

        });





      }
   )

});



// BL : Login user
app.post("/allUsers/signin", (req, res) => {
   console.log("here BL:Login Assistant", req.body);

   UserApp.findOne({ email: req.body.email }).then(
      (doc) => {
         console.log(doc);

         if (!doc) {

            res.json({ message: "check email" })

         }
         return bcrypt.compare(req.body.pwd, doc.pwd);
      }).then(
         (pwdResult) => {
            console.log(pwdResult);
            if (!pwdResult) {
               res.json({ message: "check pwd" })

            } else {
               res.json({ message: "welcome" })
            }
         }
      )

});


// BL : Edit user
app.put("/allUsers/userk", (req, res) => {
   console.log("here BL:Edit user");
});

// BL : GET ALL USERS 

app.get("/allUsers/user", (req, res) => {
   console.log("GET ALL USERS");

   UserApp.find({ role: "user" }).then(
      (data) => {
         res.json({ users: data })
      }
   );
}
);


// BL : GET USER BY ID

app.get("/allUsers/user/:id", (req, res) => {

   console.log("HERE INTO BL GET USER BY ID");

   let id = req.params.id;

   UserApp.findOne({ _id: id }).then(
      (data) => {
         res.json({ findedUser: data })
      }
   );


})


// BL : DELETE USER

app.delete("/allUsers/user/:id", (req, res) => {

   console.log("here BL delete user");

   let id = req.params.id;

   UserApp.deleteOne({ _id: id }).then(
      (deletedResponse) => {
         console.log("test delete :", deletedResponse);
         if (deletedResponse.deletedCount == 1) {

            res.json({ message: "deletedResponse :deleted user with success" });

         }


      }
   )

})

// BL:EDIT PROFILE

// app.put("/allUsers/user",(req,res)=>
// {
//    console.log("BL EDIT PRAOFILE USER");

//    let newProfile=req.body;

//    UserApp.updateOne({_id:id},newProfile)

// })


// BL: SIGNUP ADMIN

app.post("/allUsers/admin/subscription",(req,res)=>
{
   console.log("BL SIGNUP ADMIN:",req.body);

   bcrypt.hash(req.body.pwd, 8).then(
      (cryptedPwdAdmin) => {

   let admin = new UserApp(
      {
         FirstName:req.body.FirstName,
         lastName:req.body.lastName,
         tel:req.body.tel,
         email:req.body.email,
         pwd:cryptedPwdAdmin,
         role:req.body.role,
      }
   )

   admin.save((error, doc) => {
      console.log("here error", error);
      console.log("here doc", doc);

      if (doc) {
          res.json({ message: "admin added" });
      } else {
          res.json({ message: "admin error" });
      }

  });


      })

  

});

// POST DEMANDE

app.post("/allDemande",(req,res)=>
{
   console.log("here is demande ",req.body);

   const demande= new Demande(
      {
         FirstName:req.body.FirstName,
         lastName:req.body.lastName,
         tel:req.body.tel,
         subject:req.body.subject,
         idAssistant:req.body.idAssistant,
         idUser:req.body.idUser,
         status:req.body.status,
      }
   )

   demande.save();

   res.json({message:"demande saved with suucess"})

}) ;


// GET ALL DEMANDE

app.get("/allDemande",(req,res)=>
{
   console.log("BL : GET ALL DEMANDE");

   Demande.find().then(
      (doc)=>
      {

         res.json({demandeTab:doc});
        

         // console.log("Demande Tab",doc);

         // console.log("Assistant Demande Tab",doc.FirstName);

      }
   )


})

// GET ALL DEMANDE Parametre

app.get("/allDemande/AllDemandeParameter/:id",(req,res)=>
{
   console.log("BL : GET ALL DEMANDE Parametre");

   let id = req.params.id;

   Demande.find({idUser:id}).then(
      (doc)=>
      {

         res.json({demandeTab:doc})

      }
   )


})



// GET  DEMANDE by Assistant

app.get("/allDemande/:id/contact",(req,res)=>
{
   console.log("BL : GET  DEMANDE by Assistant");

   let id = req.params.id;

   console.log(id);



   Demande.find({idAssistant:id}).then(
      (doc)=>
      {

         res.json({demandeTab:doc})

      }
   )


})


// TEST

app.get("/allDemande/:id/demandeClient", (req, res) => {
   console.log("here BL get all demande");

   Demande.find({ idUser: req.params.id }).then(
       (data) => {
           console.log("here demand", data);
           const assistantIds = data.map((d) => d.idAssistant);

           UserApp.find(({ _id: { $in: assistantIds } })).then(
               (doc) => {
                   console.log("here data", doc);
                   res.json({ allDemande: doc })
               }
           )
       }
   )
})




// GET  DEMANDE by id

app.get("/allDemande/status/:id",(req,res)=>
{
   console.log("BL : GET  DEMANDE by id");

   let id = req.params.id;

   console.log(id);



   Demande.findOne({_id:id}).then(
      (doc)=>
      {

         res.json({demande:doc})

      }
   )


})

// EDIT DEMANDE

app.put("/allDemande", (req, res) => {
   console.log("here BL: Edit  Demande");

   let newobj=req.body;

   Demande.updateOne({ _id:newobj._id },newobj).then(
      (editResponse) => {
         console.log(editResponse);
         if (editResponse.nModified == 1) {

            const transporter = nodemailer.createTransport({
               service:"gmail",
               
               auth: {
                 user: "ouertani.houssem.eddine@gmail.com", // generated ethereal user
                 pass: "vgyywpvabwahpjyn", // generated ethereal password
               },
             });
   
             const mailOption={
   
               from: "ouertani.houssem.eddine@gmail.com", 
               to: "ouertani.houssem.eddine@gmail.com" , 
               subject:"Confirmation de la Demande" , 
               html: "Votre demande est confirmée avec succès !", 
           
           } ;
           transporter.sendMail(mailOption, function(err,info){
            if (err) {
               console.log(err);
            } else {
               console.log("Email sent :", info.response);
            }
           });

            res.json({ message: "edited demande with success" })

         }
      }
   );



});











// make app importable from another file
module.exports = app;