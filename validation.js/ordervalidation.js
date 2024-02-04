const joi = require("joi");
const responsehelper = require("../helpers.js/responsehelpers")

class validation{

  static async addorder(data,res){

    try{
    const validationschema= joi.object({
        firstname:joi.string().required().min(3),
          lastname:joi.string().required(),
          email:joi.string().email().required(),
          phonenumber:joi.string().required(),
          addressline:joi.string().required(),
          state:joi.string().required(),
          city:joi.string().required(),
          country:joi.string().required(),
          zipcode:joi.string().required(),
          authuser:joi.object(),
          user_id:joi.string(),
          totalprice:joi.number().required()
             
         })

   return validationschema.validateAsync(data)
        }
        catch(err){
          return err
            // return responsehelper.errorresponse(err,res)
        }


  }



}
module.exports=validation