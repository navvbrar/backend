const express= require("express");
  const router = express.Router();
  const {createproduct,getproduct,productdetails}= require("../controllers/productcontroller");
  const auth = require("../middleware/auth");
  const isadmin = require("../middleware/admin")

  router.post("/",isadmin,createproduct);
  router.get("/",auth,getproduct);
  router.get("/:id",auth,productdetails);



  module.exports = router;
