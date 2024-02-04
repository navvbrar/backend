const order= require("../models/ordermodel");
const cart= require("../models/cartmodel");
const product = require("../models/product")
const joi= require("joi");
const ordermails = require("../email.js/orderemail")
  const validation = require("../validation.js/ordervalidation")
  const responsehelper = require("../helpers.js/responsehelpers");
const { trusted } = require("mongoose");
const addorder = async(req,res,next)=>{
  try{
 await validation.addorder(req.body,res)

   const usercart=await cart.find({user_id:req.body.authuser.id}).populate("product_id")
    
   console.log(usercart[0].product_id[0])
   if(!usercart){
    return  responsehelper.errorresponse("cart not found ",res)
   }
   var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;
   var neworder
   let totalprice=0;
   for(let i=0;i<usercart.length;i++){
     totalprice += usercart[i].quantity * usercart[i].product_id[0].price
     total_each_item = usercart[i].quantity * usercart[i].product_id[0].price
     const product_info = await product.findById(usercart[i].product_id[0])
      neworder = await new order({
      firstname:req.body.firstname,
      lastname:req.body.lastname,
      email:req.body.email,
      phonenumber:req.body.phonenumber,
      addressline:req.body.addressline,
      city:req.body.city,
      state:req.body.state,
      zipcode:req.body.zipcode,
      country:req.body.country,
      total:total_each_item,
      cartdata:usercart[i],
      product_info:product_info,
      user_id:req.body.authuser.id ,
      date:today

   })
   await neworder.save()
    let stock = usercart[i].product_id[0].stock;
    let newstock = stock - usercart[i].quantity
    let updatedstock =await product.findByIdAndUpdate(usercart[i].product_id[0]._id,{stock:newstock},{new:true})
     await updatedstock.save()
    }
   

 
  
 let email = req.body.email
 await ordermails.ordersuccess(email,neworder._id,req.body.totalprice)
  res.status(200).json({
    success:true,
    neworder
    
  })}
   catch(err){
  return responsehelper.errorresponse(err.message,res)
   }

}

  const getorder=async(req,res,next)=>{
    try{

    const orders =await order.find({user_id:req.body.authuser.id})
    if(!orders){
      return responsehelper.errorresponse("order not found ",res)
    }
    const deletecart = await cart.deleteMany({user_id:req.body.authuser.id})
    res.status(200).json({
      success:true,
      orders
    })
  }
  catch(err){
    return responsehelper.errorresponse(err,res)
  }
  }

  module.exports= {addorder,getorder}