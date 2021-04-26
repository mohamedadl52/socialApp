const express = require('express')
const router = express.Router()
const bodyBarser = require('body-parser')
const routerhome = require('../controllers/home.controller')
const check = require('express-validator').check
const auth = require('../middleware/auth')
router.get('/login' , routerhome.getlogin )
router.get('/rejister' , routerhome.getrejister  )
router.post('/rejister' , 
check('username').not().isEmpty().withMessage("username required") ,
 check('email').not().isEmpty().withMessage("email required").isEmail().withMessage("email must be just mail ") ,
 check('password').isLength({min : 6}).withMessage("password mustbe more than 6 letter"),
 check("repassword").custom((value , {req})=>{
         if (value == req.body.password) {
                   return true
         } else {
          throw "passwords not equale"
         }
 }) , 


 routerhome.postrejister  )
router.post('/login' ,
check('email').not().isEmpty().withMessage("email required").withMessage("email must be just mail ") ,
check('password').isLength({min : 6}).withMessage("password mustbe more than 6 letter")
, routerhome.postlogin  )
router.all('/logout' , routerhome.logout)

router.get( '/'  , routerhome.gethome )


module.exports = router