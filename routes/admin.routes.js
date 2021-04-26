const router = require("express").Router()
const admin = require('../controllers/admin.controller')
const multer = require('multer')
const check = require('express-validator').check
const auth = require("../middleware/auth")
router.post("/add" , multer({
    storage : multer.diskStorage({
        destination : (req,file,cb)=>{
            cb(null , 'images')
        } ,
        filename :(req,file,cb)=>{
           cb(null , Date.now() + '_' + file.originalname)
       }
    })
   }).single("image") , check('image').custom((value , {req})=>{
          if (req.file) return true
          else throw "image require"
   }), 
   check('name').not().isEmpty().withMessage("name required"),
   check('price').not().isEmpty().withMessage("price required").isLength({min:1}).withMessage("must  be more than 0"),
   check('catorgress').not().isEmpty().withMessage("catogress required"), admin.addporduct )
   

 router.get('/add' ,auth.isAdmin , admin.getinputproduct)
module.exports = router