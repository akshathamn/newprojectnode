var express = require('express')
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// const DashRoutes=require('./routes/Dashboard');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
 
const userRoutes=require('./routes/userroute');

app.use('/',userRoutes);
// app.use('/dashboard',DashRoutes);

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Users');

// db connection
app.set('port', (process.env.port || 3005));

app.listen(app.get('port'), function(){
    console.log("server started on port " + app.get('port'));
})