
var nodemailer = require('nodemailer');

class ordermails{

  static async ordersuccess(email,orderid,totalprice){ 
     var transporter = await nodemailer.createTransport({
        service:"gmail",
      auth: {
        user: 'bnavdeep189@gmail.com',
        pass: 'mnubxocwphkrgbuz'
      }
    });
    
    var mailOptions = {
      from: 'bnavdeep189@gmail.com',
      to: email,
      subject: `order success`,
      text: `your order is successfully placed 
      order_id:${orderid}
      totalprice:${totalprice}`
    };
    
 await  transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error + "someting went wrong");
      } else {
        console.log('Email sent: ' + info.response);
      }
    });



  }
  static async forgetpass(email,code){ 
    var transporter =  nodemailer.createTransport({
       service:"gmail",
     auth: {
       user: 'bnavdeep189@gmail.com',
       pass: 'mnubxocwphkrgbuz'
     }
   });
   
   var mailOptions = {
     from: 'bnavdeep189@gmail.com',
     to: email,
     subject: `order success`,
     text: `your code to reset password is
           ${code}
     `
   
   };
   
   transporter.sendMail(mailOptions, function(error, info){
     if (error) {
       console.log(error + "someting went wrong");
     } else {
       console.log('Email sent: ' + info.response);
     }
   });



 }

}
module.exports=ordermails ;