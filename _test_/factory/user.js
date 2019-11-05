// const factory = require("factory-girl").factory;
var bcrypt = require("bcryptjs");
let UserTest = require("../../models/Signup").UserTest;

let UserFactory = (UserTest, {
    email: 'abcd@gmail.com',
    password: generate_salt(),
});

async function generate_salt() {
    var salt = await bcrypt.genSalt(10);
    let hashedPassword = bcrypt.hash(password(), salt)
    return hashedPassword;
  }
  
 exports.UserFactory = UserFactory;