const joi = require("joi");
const responsehelper= require("../helpers.js/responsehelpers");

class validation{

    static async addtocart(data,res){
        try{
        const schema = joi.object({

            product_id:joi.string().required(),
             user_id:joi.string(),
            authuser:{
              id:joi.string(),
              isadmin:joi.bool()
            },
            size:joi.string().required(),
            quantity:joi.number().required()
            })
            return schema.validateAsync(data);
    }
    catch(err){
        return responsehelper.errorresponse(err,res)
    }
}
}
module.exports=validation