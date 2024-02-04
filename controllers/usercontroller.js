const user = require("../models/usermodel");
const joi = require("joi");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv=  require("dotenv");
dotenv.config({path:"./config/config.env"})
const validation= require("../validation.js/uservalidation")
const responsehelper = require("../helpers.js/responsehelpers");
const ordermails = require("../email.js/orderemail");
 
const adduser =async(req,res,next)=>{
  try{
   await validation.adduser(req.body,res) 
  const{name,email,phonenumber,password,username} = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashpassword =await bcrypt.hash(password,salt);
  const userexists = await user.findOne({email:email})
  if(userexists){
    return responsehelper.errorresponse("validation error",res)
  }
  const newuser =await  new user({
    name,email,phonenumber,password:hashpassword,username
  })
  newuser.save();
  const data ={
  user:{id:newuser.id,isadmin:newuser.isadmin}
 }
  const token = jwt.sign(data,process.env.PRIMARY_KEY)
  res.json(
  
    {newuser,token,success:true}
  )


}
catch(error){
  responsehelper.errorresponse(error,res)
}

}

const getuser=async(req,res,next)=>{
  try{
   const currentuser= await user.findById(req.body.authuser.id)
   if(!user){ 
   return responsehelper.errorresponse("user not found",res)
   }
   res.status(200).json({
    success:true,
    currentuser
   })
  }
  catch(error){
    responsehelper.errorresponse(err,res)
  }
  




}

const resetpass = async(req,res)=>{
  try{
 const currentuser =await user.findOne({email:req.body.email})
 if(!currentuser){
 return responsehelper.errorresponse("user not found",res)
 }
 var digits = '0123456789'; 
    let OTP = ''; 
    for (let i = 0; i < 5; i++ ) { 
        OTP += digits[Math.floor(Math.random() * 10)]; 
    } 
    const {email} =req.body
    const time_value= new Date()
    
    const add_otp_database=await user.findOneAndUpdate({email:req.body.email},{OTP:OTP,otp_time:time_value},{new:true})
    await add_otp_database.save()
    ordermails.forgetpass(email,OTP)
   return  res.status(200).json({
      success:true,
      OTP
    })
  }
  catch(err){
    return responsehelper.errorresponse(err,res)
  }


    
}

const matchpassword =async(req,res)=>{
  if(!req.body.OTP && !req.body.email){
    return responsehelper.errorresponse({success:false,msg:"enter proper credentials"},res)
  }
  const database_user =await user.findOne({email:req.body.email})
  if(!database_user){
    return res.json({
      success:false,
      msg:"user not found"
    })
  }
   const otp_databse= await database_user.OTP
  if(otp_databse==req.body.OTP){
    const salt = await bcrypt.genSalt(10)
    const hashpassword =await bcrypt.hash(req.body.password,salt)
    const changepassword = await user.findOneAndUpdate({email:req.body.email},{password:hashpassword},{new:true})
    console.log(changepassword)
    await changepassword.save()
   return res.json({
      success:true
    })
  }
  return res.json({
    success:false,
    Message:"incorrect credentials"
  })

}

module.exports={adduser,getuser,resetpass,matchpassword}