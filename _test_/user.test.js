const factory = require('./user.factory')

test ('invalid username should raise an error', () => {

    const service = factory ({})

    const userModel = {
        username:null,
        password:null
    }

    expect(service(userModel)).rejects.toThrowError('invalid username');
    expect(service(userModel.password)).rejects.toThrowError('invalid password');

})


test('short username should raise an error', () =>{
const service = factory ({})
 
const userModel = {
    username :'a',
    password : 'abcd1234'
}
expect(service(userModel)).rejects.toThrowError('invalid username')

})

test('correct usermodel should be persisted', async () => {
     const persistUser = jest.fn()

     const service = factory({ persistUser })

     const userModel = {
         username : "abcd",
         password : "abcd1234"
     }
     const result = await service(userModel)

     expect(persistUser.mock.calls.length).toBe(2);
     expect(persistUser.mock.calls[0]).toEqual([
         userModel
     ]);
     expect(result).toEqual(userModel);
})


// const { signup,signin } = require('../controllers/usercontroller');
// test('should 401 with message if user with passed username does not exist', async () => {
//   const req = mockRequest(
//     {},
//     {
//       username: 'hugo-boss',
//       password: 'boss'
//     }
//   );
//   const res = mockResponse();
//   await signin(req, res);
//   expect(res.status).toHaveBeenCalledWith(401);
//   expect(res.json).toHaveBeenCalledWith({
//     message: 'No user with matching username'
//   });
// });



















// import axios from 'axios';
// import usercontroller from '../controllers/usercontroller';

// jest.mock('axios');

// test('should fetch users', () => {
//   const users = [{email: 'Bob@gmail.com'}];
//   const resp = {data: users};
//   axios.get.mockResolvedValue(resp);

//   // or you could use the following depending on your use case:
//   // axios.get.mockImplementation(() => Promise.resolve(resp))

//   return usercontroller.all().then(data => expect(data).toEqual(users));
// });