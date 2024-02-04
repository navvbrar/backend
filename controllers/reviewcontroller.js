const reviews = require("../models/reviews")
const responsehelper = require("../helpers.js/responsehelpers")
const validation = require("../validation.js/reviewvalidation")
const user = require("../models/usermodel")


const add_review=async(req,res)=>{
   try{           
      await validation.add_validation(req.body,res)                
   const {comment,rating,product_id}=req.body;
   const {id} =  req.body.authuser
   const currentuser =await user.findById(id)
   const review_info = await new reviews({
      name:currentuser.name,
      comment,                                                                                                                                                                                        
      rating,
      user_id:id,
      product_id
 })                                                                                            
    await review_info.save();                                        
    res.json({
      success:true,                
      review_info
    })
     
   }
   catch(err){
    responsehelper.errorresponse(err,res)
   }
  


}

const getreviews=async(req,res)=>{
    if(!req.params.product_id){
 return responsehelper.errorresponse("no product id",res)
    }
    const fetch_reviews = await reviews.find({product_id:req.params.product_id})
    if(!fetch_reviews){
     return responsehelper.errorresponse("no review", res)
    }
    let total = 0
    for(i=0;i<fetch_reviews.length;i++){
      total += fetch_reviews[i].rating
    }     
    average_rating = total/fetch_reviews.length
    res.json({
      success:true,
      fetch_reviews,
      average_rating
    })
}
module.exports ={add_review,getreviews}