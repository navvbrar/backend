const express= require("express");
  const router = express.Router();
  const categorysearch = require("../controllers/Searchcontroller")
  const auth = require("../middleware/auth")
  
  
  router.get("/",categorysearch)
  
  
  module.exports=router;