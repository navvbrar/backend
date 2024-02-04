const joi = require("joi");
const responsehelper = require("../helpers.js/responsehelpers")

class validation{
  static async addproduct(data){
    try{
    const schema = joi.object({

        name:joi.string().required(),
        description: joi.string().required(),
        price:joi.number().required(),
        rating:joi.number(),
        image:{ 
            public_id:joi.string().required(),
            url:joi.string().required()},
        stock:joi.number().required(),
        category:joi.string().required(),
        numberofreviews:joi.number(),
        reviews:{
       name:joi.string(),
       rating:joi.number(),
       comment:joi.string()
      },
      date:joi.date(),
      size:{
        S:joi.boolean(),
        M:joi.boolean(),
        L:joi.boolean(),
        XL:joi.boolean(),
        XXL:joi.boolean()
      },
    // isadmin:joi.boolean()
    })
    return  schema.validateAsync(data)

  }
  catch(err){
  // return responsehelper.errorresponse("somwthing went wrong",res)
  return err
  }


  }
}
module.exports=validation