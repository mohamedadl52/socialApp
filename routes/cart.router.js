const router = require('express').Router()
const bodyParse = require('body-parser')


const cartControler = require('../controllers/cart.controller')

const auth = require('../middleware/auth')
const check = require('express-validator').check


router.get('/' , auth.isAth , cartControler.getcart)
router.post('/', bodyParse.urlencoded({extended : false}) , auth.isAth , check('amount').not().isEmpty().withMessage("amount  required").isInt({min : 1}).withMessage("number must be more than 1") , cartControler.postCard )
router.post('/save' , auth.isAth , check('amount').not().isEmpty().withMessage("amount  required").isInt({min : 1}).withMessage("number must be more than 1") , bodyParse.urlencoded({extended : false}) , cartControler.postsave )
router.post('/delete' , auth.isAth , cartControler.deletepost)
router.post('/deleteall' , auth.isAth , cartControler.deleteallpost)


module.exports = router