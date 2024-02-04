const mongoose = require("mongoose")
const order = require("./ordermodel")

const orderschema = mongoose.Schema({

 ordered:{
    type:Boolean
 },
 shipped:{
    type:Boolean
 },
 pickup:{
    type:Boolean
 },
 deliver:{
    type:Boolean
 }


})

module.exports = mongoose.model("orderstatus",orderschema)