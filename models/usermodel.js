const mongoose = require("mongoose");
const { boolean } = require("webidl-conversions");

const userschema = mongoose.Schema({
   name:{
    type:String,
    required:true,
    minLength:[4],
    maxLength:[20]
   },
   email:{
 type:String,
 required:true,
 unique:true

   },
   phonenumber:{
  type:Number,
  required:true
   },
   username:{
   type:String,
   required:true,
   minLength:5,
   maxLength:15

   },
   password:{
    type:String,
    required:true,
    minLength:4
   },
   isadmin:{
    type:Boolean
   },
   OTP:{
    type:Number
   },
   otp_time:{
    type:Date
   }


})

module.exports=mongoose.model("user",userschema)