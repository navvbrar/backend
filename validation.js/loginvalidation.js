const joi = require("joi");
const responsehelper = require("../helpers.js/responsehelpers")
class validation{
    
   static async login(data,res){
    try{
    const schema = joi.object({
        email: joi.string().email().required(),
        password: joi.string(),
        
       
       })
       return schema.validateAsync(data)
   }
   catch(err){
    return  responsehelper.errorresponse(err,res)
   }

    }



}
module.exports=validation