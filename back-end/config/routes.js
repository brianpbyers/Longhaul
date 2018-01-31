const router = require('express').Router();

const passport = require('passport');

const request = require('request');

const rtdUser = process.env.rtdUser || require('./env.js').rtdUser;
const rtdPassword = process.env.rtdPassword || require('./env.js').rtdPassword;


router.get('/', (req,res)=>{
	res.send("Server is working!");
});





module.exports = router;