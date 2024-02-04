const express= require("express");
  const router = express.Router();
  const {addtocart,viewcart,deleteitem,updateitem}= require("../controllers/cartcontroller")
  const auth = require("../middleware/auth")
  router.post("/",auth,addtocart)
  router.get("/",auth,viewcart)
  router.delete("/:id",auth,deleteitem)
  router.put("/:id",auth,updateitem)



  module.exports = router;
