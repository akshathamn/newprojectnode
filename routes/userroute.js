const express = require ('express')

const router = express.Router();
 
const userController = require('../controllers/usercontroller');

const User=require('../models/Signup');



const { body } = require('express-validator/check');

router.post('/signup',[
    body('username').trim().not().isEmpty(),
    body('firstname').trim().not().isEmpty(),
    body('lastname').trim().not().isEmpty(),
    body('phone_number').trim().not().isEmpty(),
    body('email').isEmail().withMessage('please enter valid email')
    .custom((value,{ req })=>{
        return User.findOne({email:value})
        .then(userDoc =>{
            if(userDoc){
            return Promise.reject('email is already exist')
        }
    })
    }).normalizeEmail(),
    body('password').trim().not().isEmpty(),
],userController.signup);
router.get('/signup',userController.getAllUsers );

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

router.post('/signin',userController.signin);
router.get('/signin',userController.getAllUsers );


module.exports=router;