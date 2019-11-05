const UserTest = require("../../models/Signup").UserTest;
const UserFactory = require("../factory/user");
var bcrypt = require("bcryptjs");

describe("User", () => {

    // before(() => {
    //   UserFactory
    // });
  
    describe("Sign Up", () => {
      it("should allow a user to sign up", () => {
        var event = {};
        var context = {};
  
        event = {
          body: {
            email: "abcd@gmail.com",
            password: "Password@123"
          }
        };
        return Signup.run(event, context).then((response) => {
          expect(response.status.code).toEqual(200)
          expect(response.status.errorDetail).to.eq("")
          expect(response.status.message).to.eq("OK")
        });
      });
     
     
    
  
    
     
    
      
       
        
      });
    });
  
  
//   async function createUser() {
//     return factory.create("users_test", { email: "rkreloaded@yopmail.com", password: "Password@123" })
//   }
  
//   async function createExpiredLinkUser() {
//     return factory.create("users_test", { confirmationSentAt: moment().subtract(2, "days") })
//   }
  
//   async function createVerifiedUser() {
//     var salt = await bcrypt.genSalt(10);
//     let hashedPassword = bcrypt.hash("Password@123", salt)
//     return factory.create("users_test", { email: "rkreloaded@yopmail.com", active: true, password: hashedPassword })
//   }