const validation = require("../validation.js/uservalidation")
const user = require("../models/usermodel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv=  require("dotenv");
dotenv.config({path:"./config/config.env"})
 class userfunctions {
  static addUsers = async(args)=>{
  try {
   
     await validation.adduser(args.users)
    const {
    name,
    email,
    username,
    password,
    phonenumber,
    
  } = args.users

     const newuser = await user.find({email:email})
   if(newuser==null){
    return "user already exists"
   }
   const salt = await bcrypt.genSalt(10)
   const hashpassword = await bcrypt.hash(password,salt)
   
   const addusers = await new user({
    name,
    email,
    username,
    password:hashpassword,
    phonenumber
   })
   const data = {
    user:{id:addusers._id,isadmin:addusers.isadmin}
     
   }
   const token = jwt.sign(data,process.env.PRIMARY_KEY)
   console.log(token)
  await addusers.save()
  return addusers
}
  catch(err){
    console.log("in err")
    return err
  }

}
 static getuser = async(args)=>{
    const existing = user.findById(args.id)
    if(existing){
      return existing
    }
    return "user not found"
 } }

 module.exports= userfunctions
