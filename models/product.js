
const mongoose = require("mongoose");

const productschema = mongoose.Schema({
  
  name:{
    type:String,
    required:true,

  },
  description:{
    type:String,
    required:true
  },
  price:{
    type:Number,
    required:true
  },
  rating:{
    type:Number,
    default:0
  },
  image:{
public_id:{
    type:String,
    required:true
},
url:{
    type:String,
    required:true
}},
stock:{
 type:Number,
 required:true,
 maxLength:[4]
},
category:{
    type:String,
    required:true
},
numberofreviews:{
    type:String,
    
},
 reviews:{
   name:{
      type:String,
      
   } ,
   rating:{
    type:Number,

   },
   comment:{
    type:String,
    
   }
}, 
 
createdat:{
    type:Date,
    default:Date.now
},
size:{
   S:{type:Boolean},
   M:{type:Boolean},
   L:{type:Boolean},
   XL:{type:Boolean},
   XXL:{type:Boolean}
  }


  


})

module.exports = mongoose.model("product",productschema);
