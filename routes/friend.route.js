const router = require("express").Router()

const auth = require("../middleware/auth")
const friend = require("../controllers/friends.controller")


router.post("/add" , auth.isAth ,  friend.add)
router.post("/cancel" , auth.isAth , friend.cancel )
router.post("/accept" , auth.isAth , friend.accept )
router.post("/reject" , auth.isAth , friend.reject)
router.post("/delete" , auth.isAth ,  friend.delete)




module.exports = router