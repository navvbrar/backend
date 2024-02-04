const mongoose = require("mongoose");

const connectdb = ()=>{
 mongoose.connect("mongodb://127.0.0.1/ecommerce2").then(()=>{
    console.log("connected to database")
 }).catch((err)=>{
  console.log(err)
 })

}
module.exports = connectdb