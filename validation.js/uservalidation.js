 const joi = require("joi")
 const responsehelper = require("../helpers.js/responsehelpers")

 class validation {
  static async adduser(data){
    const schema =joi.object({
        name: joi.string().alphanum().min(5).max(20).required(),
        email: joi.string()
          .email().required(),
          phonenumber:joi.number().max(1000000000000).required(),
          username: joi.string()
          .alphanum()
          .min(5)
          .max(15)
          .required(),
          password: joi.string().min(4)
        })
        return schema.validateAsync(data)
        

  }
  
  
 
 }

 module.exports= validation