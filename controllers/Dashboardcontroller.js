// const Dash = require('../models/Dashboardmodel');
// var bcrypt = require('bcryptjs');
// var jwt=require('jsonwebtoken');




// exports.getAll = ((req, res) => {
//     console.log("hello")
//     const name =req.body.name;
//     Dash.find({name:name}, (err, data) => {
//     if (err)
//     res.send(err);
//     res.json(data); 
//     });
//     });


// exports.dashboard = ((req, res) => {
//     const name = req.body.name;
//     const dash = new Dash({
//         name:name
//     })
//     return dash.save()
//     .then(result =>{
//         console.log(result)
//         res.status(200).json(
//             {
//                 res:result._id
//             }
//         )
//         })
//     .catch(err=>{
//         console.log(err);
//     })
    

// })