const express = require("express")
const router = express.Router()
const addpromo = require("../controllers/promotion")
router.post("/",addpromo)

module.exports = router