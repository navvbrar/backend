const joi = require("joi")
const responsehelper = require("../helpers.js/responsehelpers")

class validation {
 static async add_validation(data,res){
    try{
     const schema = joi.object({
   comment:joi.string().required(),
   rating:joi.number().required(),
   authuser:joi.object().required(),
   product_id:joi.string().required()
    })
  return  schema.validateAsync(data)
}
catch(err){
    // responsehelper.errorresponse(err,res)
    return err
}


 }



}

module.exports = validation