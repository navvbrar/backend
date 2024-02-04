const product = require("../models/product");
const joi = require("joi");
const validation = require("../validation.js/productvalidation");
const responsehelper = require("../helpers.js/responsehelpers");
const reviews = require("../models/reviews")

const createproduct = async (req, res, next) => {
  try {
     await validation.addproduct(req.body, res);

   

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
    } = req.body;
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
      size,
    });
    productadd.save();
    res.status(200).json({
      productadd,
    });
  } catch (err) {
    return responsehelper.errorresponse(err, res);
  }
};

const getproduct = async (req, res, next) => {
  try {
    const products = await product.find();
    
    return res.status(200).json({
     success:true,
      products
     } );
  } catch (err) {
    return responsehelper.errorresponse(err, res);
  }
};
const productdetails = async (req, res, next) => {
  try {
    const products = await product.findById(req.params.id);

    if (products) {
      const review_rating = await reviews.find({product_id:req.params.id})
      let total = 0
      for(i=0;i<review_rating.length;i++){
        total += review_rating[i].rating
      }     
      average_rating = total/review_rating.length
      res.status(200).json({
        success: true,
        products,
        average_rating
      });
    } else {
      return responsehelper.errorresponse("product not found ", res);
    }
  } catch (err) {
    return responsehelper.errorresponse(err, res);
  }
};

module.exports = { createproduct, getproduct, productdetails };
