const mongoose = require("mongoose");
const user = require("./usermodel")
const product = require("./product")

const review_schema = mongoose.Schema({

  user_id:{
    type:mongoose.Schema.Types.ObjectId,
    ref:user
  },
   product_id:{
    type: mongoose.Schema.Types.ObjectId,
    ref:product
   },
  name:{
    type:String
  },
  rating:{
    type:Number
  },
  comment:{
    type:String
  }

})

module.exports = mongoose.model("reviews",review_schema)