const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const  UserSchema = new Schema({
  firstname:{
    type:String,
    required:'first name is required'
  },
  lastname:{
    type:String,
    required:'last name is required'
  },
  phone_number:{
    type:Number,
    required:'phone number cannot be blank'
  },
  email:{
    type:String,
    required:'please Enter valid name'
  },
  password: {
    type: String,
    required: 'Please Enter valid emailId'
  }
});

module.exports = mongoose.model('UserInfo', UserSchema);