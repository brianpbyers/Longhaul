//main server functionality
const express = require('express');
const app = express();
const path = require('path');
//login functionality.  Will we need passport for Angular/Ionic?
const passport = require('passport');
//logs requests in console
const morgan = require('morgan');
//parses incoming req's
const bodyParser = require('body-parser');
// //needed to keep users logged in
// const session = require('express-session');
//helps route requests
const router = require('./config/routes');

require('dotenv').config();





  //CORS setup to allow other ports from this host

  //Only needed if not on Heroku/prod
  if(!process.env.DYNO) {
    app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "http://localhost:8100");
      res.header("Access-Control-Allow-Credentials", "true");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Authorization, Content-Type, Accept");
      res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
      next();
    });
  }

//provides logs of every server request
app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//used to update the last used time(to keep auto-update running), or reactivate the auto-update feature if server was shut down
app.use(router.keepActive);

//serves up www to be loaded by users.
app.use(express.static(path.join(__dirname, 'www')));


app.use(passport.initialize());

// //basically, perform the passport.js function, which assigns authorization/authentication functionality
require('./config/passport')(passport);

//sends all requests to router
app.use('/', router);




app.listen(process.env.PORT || 3000, console.log("Potato Server Listening on Port:", process.env.PORT ||3000));