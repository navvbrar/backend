const responsehelper = require("../helpers.js/responsehelpers");
const product= require("../models/product");


const categorysearch=async(req,res,next)=>{
      try{
    if(!req.query){
  return responsehelper.errorresponse("enter a query",res)
    }
    if(req.query.category){
   const search =await product.find({category:req.query.category})
   if(search){
   return res.status(200).json({
        search,
        success:true
    })
   }}
   else if(req.query.name){
    console.log(req.query.name)
    const search =await product.find({name:req.query.name})
    if(search){
    return res.status(200).json({
        message:"we are in name",
         search,
         success:true,
         
     })
    }
   }
   else{
   res.status(400).json({
    
    success:false
})
   }

      }
      catch(err){
        return responsehelper.errorresponse(err,res)
      }
}

module.exports=categorysearch;