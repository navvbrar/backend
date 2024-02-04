const express= require("express");
  const router = express.Router();
  const {adduser,getuser, resetpass} = require("../controllers/usercontroller")
  const auth = require("../middleware/auth");

  router.post("/", adduser)
  router.get("/",auth,getuser)
  router.put("/",resetpass)


  module.exports = router;
