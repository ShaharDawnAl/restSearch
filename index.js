const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
//api.js is containing the app GET PUT POST AND ALL
//setup express app
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//connect to mongoDB
mongoose.connect('mongodb://localhost:27017/list', { useNewUrlParser: true });

app.use(cors({
  methods:['GET','POST','DELETE','PUT']
}));

//initialize routes
app.use('/api',require('./routes/api'));

//error handling middleware
app.use(function(err,req,res,next){
  //console.log(err);
  return res.status(422).send({error:err.message});
});
mongoose.Promise = global.Promise;

//listen for requests
app.listen(process.env.port || 4000,function(){
  console.log('Now listening for requests');
});
