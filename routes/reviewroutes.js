const express = require("express")
const router = express.Router();
const {add_review,getreviews}= require("../controllers/reviewcontroller")
const auth = require("../middleware/auth")

router.post("/",auth,add_review)
router.get("/:product_id",getreviews)


module.exports = router





