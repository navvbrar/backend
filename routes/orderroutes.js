const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {addorder,getorder} = require("../controllers/ordercontroller");

router.post("/",auth,addorder)
router.get("/",auth,getorder)

module.exports = router