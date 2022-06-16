const express = require('express');
const User = require('./models/User')
const Club = require('./models/Club')
const Organisation = require('./models/Organisation')
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const application = express();
const port = 8080;


mongoose.connect('mongodb://localhost:27017/CollectyForm', {useNewUrlParser: true});
    mongoose.connection.once('open', function(){
      console.log('Conection has been made!');
    }).on('error', function(error){
        console.log('Error is: ', error);
    });

application.use(bodyParser.json())

// Add headers before the routes are defined
application.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

application.use("/", require("./src/routes"));

application.get('/', (req, res) => {
  res.send('Hello World')
});


application.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});