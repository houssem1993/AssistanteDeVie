const nodemailer = require("nodemailer");


module.exports=async(userEmail,subject,htmlTemplate)=>
{
    try {

        const transporter = nodemailer.createTransport({
            service:"Gmail",
            
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

        const info=await transporter.sendMail(mailOption);
        console.log("Email sent"+info.response);


        
    } catch (error) {

        console.log(error);
        throw new Error("internal Server Error");
        
    }
}







   

 
      



 