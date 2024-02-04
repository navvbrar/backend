const cart = require("../models/cartmodel")
const validation = require("../validation.js/cartvalidation")
var { buildSchema } = require("graphql");
class cartfunctions {
static addcart=async(args)=>{
   try{ 
await validation.addtocart(args.newadd)
    const {
        product_id,
        user_id,
        size,
        quantity
    } = args.newadd
    const addtocart = await new cart({
        product_id,
        user_id,
        size,
        quantity
    })
  addtocart.save();
  return addtocart
   }
   catch(err){
    return err
   }

}
 
static getcart = async(args)=>{
  try{
     const usercart = await cart.find({user_id:args.id}).populate("product_id")
     if(usercart==null){
        console.log("inif")
        return "cart not found"

     }
     console.log(usercart.product_id)
     return usercart
  }
  catch(err){
    return err
  }
} 

static updatecart = async(args)=>{
  try{
  
    const item = await cart.findByIdAndUpdate(args.updateinfo.id,{quantity:args.updateinfo.quantity,size:args.updateinfo.size},{new:true});
    
   await item.save()
   const fullcart= await cart.find({user_id:args.updateinfo.user_id}).populate("product_id");
   console.log(fullcart[0])
   
   let totalprice =0;
   for(let i=0;i<fullcart.length;i++){
      totalprice += fullcart[i].quantity * fullcart[i].product_id[0].price
      
   }
   console.log(totalprice)
   return fullcart
}
catch(err){
   console.log("error")
   return err
}}
static deletecart=async(args)=>{
   try{
      const item = await cart.findByIdAndRemove(args.id);
      return item
     }
     catch(err){
       return err
     }
   
}

}




module.exports = cartfunctions