const express= require("express");
  const router = express.Router();
  const login= require("../controllers/login");
  // const auth = require("../middleware/auth")
  const isadmin= require("../middleware/admin");
const { matchpassword } = require("../controllers/usercontroller");
const auth = require("../middleware/auth");
  router.post("/",login)
  router.put("/",matchpassword)



  module.exports = router;
