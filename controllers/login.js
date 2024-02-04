const joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const user = require("../models/usermodel")
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" })
const responsehelper = require("../helpers.js/responsehelpers");
const validation = require("../validation.js/loginvalidation")

const login = async (req, res, next) => {
  try {
    // await validation.login(req.body,res)
    const { email, password } = req.body;
    const search = await user.findOne({ email: email });
    if (!search) {
      return responsehelper.errorresponse("user not found", res)
    }

    const checkpass = await bcrypt.compare(password, search.password)
    if (!checkpass) {
      return responsehelper.errorresponse("username or pasword may be wrong", res)

    }

    const data = {
      user: { id: search.id, isadmin: search.isadmin }

    }

    const token = await jwt.sign(data, process.env.PRIMARY_KEY)


    res.status(200).json({
      success: true,
      messagge: "logged in successfully",
      token,
      search
    })
  }
  catch (err) {
    return responsehelper.errorresponse(err, res)
  }


}

module.exports = login;