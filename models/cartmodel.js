const mongoose = require("mongoose");
const user = require("./usermodel")
const product = require("./product");


const cartschema = mongoose.Schema({

  product_id:[ {
    type: mongoose.Schema.Types.ObjectId,
    ref: product
}],
user_id: {

type:mongoose.Schema.Types.ObjectId,
ref : user
},
size:{
  type:String,
  required:true
},
quantity:{
  type:Number,
  default:1
}

})
module.exports=mongoose.model("cart",cartschema)