
const jwt = require("jsonwebtoken");
  const user = require("../models/usermodel")
  const dotenv=  require("dotenv");
const responsehelper = require("../helpers.js/responsehelpers");
  dotenv.config({path:"./config/config.env"})

const auth = async(req,res,next)=>{
try{
  const token = req.header("auth-token");
  if(!token){
    return res.status(400).json({
        success:false,
        message:"no token "
      
         })
    
  }
  const verification = await jwt.verify(token,process.env.PRIMARY_KEY);
 
  req.body.authuser =  verification.user;
  
  

next();
}
catch(err){
  return responsehelper.errorresponse(err.message,res)
}
}
module.exports= auth;