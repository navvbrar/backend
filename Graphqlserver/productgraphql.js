const product = require("../models/product");
const validation = require("../validation.js/productvalidation.js")
const responsehelper = require("../helpers.js/responsehelpers")
class productfunctions {
 static addProduct= async(args)=> {
    try{
      console.log("running")
  await validation.addproduct(args.product)
           const {
        name, 
        description,
        price,
        stock, 
        category,
        numberofreviews,
        rating,
        reviews,
        image,
        size,
      } = args.product;
      const productadd = await new product({
        name,
        description,
        price,
        stock,
        category,
        numberofreviews,
        rating,
        reviews,
        image,
        size
      });
    await  productadd.save();
      return productadd 
    }
    catch(err){
      console.log(err.message)
      return err
    }

 }


static productget= async function(args){
  try {
    const products = await product.findById(args.id);
    if (products) {
      return  products
    
    }}
   catch (err) {
    return err
  }
}
static getproducts=async function(){
  try {
    const products = await product.find();
    if (products) {
      
            return products
    } }
   catch(err) {
    return err
  }
}
static deleteproduct= async function(args){
  try {
    const products = await product.findById(args.id);
    if (products) {
     const deleted= await product.findByIdAndRemove(args.id)
      return  deleted
    
    }
     return "no product"  }
   catch (err) {
    return err
  }
} }



module.exports = productfunctions