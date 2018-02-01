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
//needed to keep users logged in
const session = require('express-session');
//helps route requests
const router = require('./config/routes');





  //CORS setup to allow other ports from this host

  //Only needed if not on Heroku/prod
  if(!process.env.DYNO) {
    app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "http://localhost:8100");
      res.header("Access-Control-Allow-Credentials", "true");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
      next();
    });
  }

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//serves up dist to be used by users
app.use(express.static(path.join(__dirname, 'dist')));


// //Session is used to genereate a hash.  Users denied without the secret.
// //sets up passport
// app.use(session({ secret: 'This is a long string of stuff to generate a hash' })); 
// app.use(passport.initialize());
// app.use(passport.session()); 

// // //basically, perform the passport.js function, which assigns authorization/authentication functionality
// require('./config/passport')(passport);

// //asigning currentUser
// app.use((req,res,next)=>{
// 	res.locals.currentUser = req.user;
// 	next();
// });

app.use('/', router);




app.listen(process.env.PORT || 3000, console.log("Potato Server Listening on Port:", process.env.PORT ||3000));