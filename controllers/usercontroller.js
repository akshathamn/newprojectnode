const UserInfo = require('../models/Signup');
var bcrypt = require('bcryptjs');
var jwt=require('jsonwebtoken');
var isAuth=require('../Middleware/isAuth')

exports.getAllUsers = (isAuth,(req, res) => {
  console.log("hello")
  UserInfo.find({userId:req.decodedToken}, (err, data) => {
  if (err)
  res.send(err);
  res.json(data); 
  });
  });
 
exports.signup = async ( req, res ) => {
  try{
  const reg_email=/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
  const reg_pwd=/^[A-Za-z]\w{7,14}$/
    console.log('controller request---------------', req.body)
    console.log(UserInfo)
  if(req.body) {
  if(!(reg_pwd.test(req.body.password))){
    console.log('----',statusCode)
    res.statusCode = 400;
    // return res;
    res.send('password is invalid');
    // return res.status(400).json({ message: 'password are required' })
  }
  console.log('controller request 2---------------', req.body.email)
  if(reg_email.test(req.body.email)){
    console.log("inside if--------------------", UserInfo)
    // const user = await UserModel.findOne({ email });
    //  UserInfo.find({ email: req.body.email }).exec()
    UserInfo.find({ email: req.body.email })
    .then(res => console.log('res---------', res))
    .catch(err => console.log(err))
    const user = await UserInfo.find({ email: req.body.email })
    console.log('controller user---------------', user)
    // res.json(user);
    // if (user) {
      if(user != null && user != ''){
        res.statusCode = 401;
        res.json({ message:" user already exists"})
      }
      else
      {
        var User = new UserInfo(req.body);
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(User.password, salt, async (err, hash) => {
            User.password = hash;
            await User.save(( err, data ) => {
              if(err)
              res.send(err.message);
              res.json({ message:" user created successfully"})
              res.statusCode = 200;
            })
          })
        })
      }
    //  return user;
    // });
  }
  else {
    console.log('inside esle-------------------')
    res.statusCode = 401;
    // res.send('Email is invalid');
  }
}
else {
  console.log('inside final esle-------------------')
  res.statusCode = 401;
  // res.send('empty body');
}
} catch(err){
  console.error(err) 
}
};

exports.signin = ( req, res, next ) =>{
  const email = req.body.email;
  const password = req.body.password;
  let loadedUser;
  UserInfo.findOne({email: email})
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





    