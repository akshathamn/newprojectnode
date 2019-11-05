const userController = require('../controllers/usercontroller');

describe("user signup", () => {
it("should do signup functionality", () => {
expect(typeof userController.signup).toBe("function");
// return userController.signup(4).then(data => expect(data).toEqual('akshatha@gmail.com'));

// expect(email).toBe('abcd@gmail.com');

});
});


// describe("Sign Up", () => {
//   it("should allow a user to sign up", () => {
//     var event = {};
//     var context = {
//       statusCode: 200
//     };

//     event = {
//       body: {
//         email: "akshathamn01@gmail.com",
//         password: "Password@123",
//       }
//     };
//     // console.log('---------------', userController.signup(event, context))
//     const response = userController.signup(event, context) //.then((response) => {
//       expect(response.statusCode).toBe(401)
//     //   expect(response.status.errorDetail).to.eq("")
//       expect(response.statusCode).toBe(401)
//     // });
//   });
// });

const mockRequest = (sessionData) => {
  return {
    body: sessionData,
  };
};

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('signup', () => {
  test('should 401 if session data is not set', () => {
    const req = mockRequest();
    const res = mockResponse();
     userController.signup(req, res);
    //  console.log(req)
     console.log(res)
    expect(res.status).toHaveBeenCalledWith(401);
  });
  test('should 200 with username from session if session data is set', () => {
    const req = mockRequest({ email: 'akshathamn1@gmail.com',password: 'aksh1234' });
    const res = mockResponse();
    userController.signup(req, res);
    console.log(res)
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toBeCalled({ email: 'akshathamn1@gmail.com' });
    expect(req.session.data).toEqual({
      email: 'akshathamn1@gmail.com' 
    });
  });
});

// describe('signin', () => {
// test('should 201 and set session.data with username if user exists and right password provided', () => {
//   const req = mockRequest(
//     {},
//     {
//       username: 'guest',
//       password: 'guest-boss'
//     }
//   );
//   const res = mockResponse();
//   userController.signin(req, res);
//   expect(res.status).toHaveBeenCalledWith(201);
//   expect(res.json).toHaveBeenCalled();
//   expect(req.session.data).toEqual({
//     username: 'guest',
//   });
// });
// });





















// describe("userController.signin", () => {
//     it("should do signin functionality", () => {
//       // const sign = require('../controllers/usercontroller');
//       // expect(sign(email))
//     const email='abcd@gmail.com';
//     const password='abcd1234';
//     expect(email).toBe('abcd@gmail.com');
//     expect(password).toBe('abcd1234');
//   });
// });

// const {MongoClient} = require('mongodb');
// describe('insert',() => {
//   let connection;
//   let db;

//   beforeAll (async, () => {
//     connection = await MongoClient.connect(global.__MONGO_URI__, {
//       useNewUrlParser: true,
//     });
//     db = await connection.db(global.__MONGO_DB_NAME__);
//   });

// afterAll(async, () => {
//   await connection.close();
//     await db.close();
// });

// it('should insert a doc into collection', async () => {
//   const users = db.collection('users');

//   const mockUser = { email: 'John@gmail.com',password: 'abcd1234'};
//   await users.insertOne(mockUser);
//   const insertedUser = await users.findOne({_id: 'some-user-id'});
//   expect(insertedUser).toEqual(mockUser);
// });
// });

