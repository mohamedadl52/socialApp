const router = require("express").Router()

const auth = require("../middleware/auth")


const profile = require("../controllers/profile.controller")




router.get("/" , auth.isAth  , profile.getprofile )
router.get("/:id" , auth.isAth  , profile.getprofile )




module.exports = router