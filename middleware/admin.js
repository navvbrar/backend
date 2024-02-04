const responsehelper = require("../helpers.js/responsehelpers")
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" })
const jwt = require("jsonwebtoken")
const user = require("../models/usermodel")

const isadmin = async (req, res, next) => {
  try {
    const token = req.header("auth-token");
    if (!token) {
      return responsehelper.errorresponse("token not found", res)
    }
    const varification = await jwt.verify(token, process.env.PRIMARY_KEY)

    console.log(varification)
    const admin = await user.findById(varification.user.id)

    if (admin.isadmin == true) {
      //  req.body.isadmin =admin.isadmin
      //  console.log(req.body) 
    }
    else {
      return responsehelper.errorresponse("not an admin", res)
    }
    next()
  }
  catch (err) {
    return responsehelper.errorresponse(err.message, res)
  }
}
module.exports = isadmin