const mongoose = require("mongoose");
const user = require("./usermodel");
const orderstatus = require("./orderstatus");

const orderschema= mongoose.Schema({
  
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phonenumber:{
        type:String,
        required:true
    },
    addressline:{
        type:String,
        required:true
    },
    city:{
        type:String
    },
    state:{
        type:String
    },
    zipcode:{
    type:String
    },
    country:{
        type:String
    },
    cartdata:{
       type:[Object]
    },
   product_info:{
    type:Object
   } ,
    total:{
     type:Number,
     required:true
    },
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:user,
        required:true
    },
    date:{
        type:String,
        default:Date.now()
    },
    status:{
        type:mongoose.Schema.Types.ObjectId,
        ref:orderstatus
    }
  
})


module.exports=mongoose.model("order",orderschema)