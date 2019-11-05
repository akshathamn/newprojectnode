const UserData = require('../models/Signup');
var bcrypt = require('bcryptjs');
var jwt=require('jsonwebtoken');
var isAuth=require('../Middleware/isAuth')

exports.getAllUsers = (isAuth,(req, res) => {
  console.log("hello")
  UserData.find({userId:req.decodedToken}, (err, data) => {
  if (err)
  res.send(err);
  res.json(data); 
  });
  });
 
exports.signup = ( req, res ) => {
  // const email = req.body.email;
  // const password = req.body.password;
  // const reg_username=/^[A-Za-z]$/;
  // const reg_firstname=/^[A-Za-z]\w{7,14}$/;
  // const reg_lastname=/^[A-Za-z]\w{7,14}$/;
  // const reg_mob=/^[0]?[789]\d{9}$/;
  const reg_email=/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
  const reg_pwd=/^[A-Za-z]\w{7,14}$/
    console.log(req.body)
    console.log(req)

  if(!reg_pwd.test(req.body.password)){
    res.statusCode = 401;
    return res;
    // res.send('password is invalid');'
    // return res.status(400).json({ message: 'password are required' })

  }
  if(reg_email.test(req.body.email)){
    UserData.find({email: req.body.email},function(err, data){
      if(data != null && data != ''){
        res.statusCode = 401;

        // res.send('User already exists');
      }
      else
      {
        var User = new UserData(req.body);
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(User.password, salt, (err, hash) => {
            User.password = hash;
            User.save(( err, data ) => {
              if(err)
                res.send(err.message);
              res.json(data);
            })
          })
        })
      }
    });
  }
  else {
    res.statusCode = 401;

    // res.send('Email is invalid');
  }
};

exports.signin = ( req, res, next ) =>{
  const email = req.body.email;
  const password = req.body.password;
  let loadedUser;
  UserData.findOne({email: email})
  .then(user =>{
    if(!user){
      const error = new Error('A user with this email could not be found.');
      error.statusCode = 401;
      throw error;
    
    }
    loadedUser = user;
    return bcrypt.compare(password,user.password);
  })
  .then(isEqual =>{
    if(!isEqual){
      const error = new Error('wrong password.');
      error.statusCode = 401;
      throw error;
    }
    const token = jwt.sign(
    {
      email: loadedUser.email,
      userId:loadedUser._id.toString()
    },'secret')
    return res.status(200).json({token: token, userId: loadedUser._id.toString(), email: loadedUser.email})
  })
  .catch(err => {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }); 
}





    