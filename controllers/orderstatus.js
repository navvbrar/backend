const order = require("../models/ordermodel")
const orderstatus=  require("../models/orderstatus")

const getstatus = async(req,res)=>{

  const {order_id}=req.body
  const getorder = await orderstatus.findOne({order_id})


}