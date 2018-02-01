const router = require('express').Router();

const passport = require('passport');

const request = require('request');

const rtdUser = process.env.rtdUser || require('./env.js').rtdUser;
const rtdPassword = process.env.rtdPassword || require('./env.js').rtdPassword;

let lastUsed = Date.now();
let isActive = false;

let updateTrips = ()=>{setInterval(()=>{
	//will let functions know the updater is running and not to run it again
	isActive = true;
// make API route call and parse data
	let rightNow = Date.now();
	//if nobody's been here in 15 minutes, turn it off!
	if((rightNow-lastUsed)>900000){
		//lets functions know that the updater is not running and to restart it
		isActive = false;
		clearInterval(updateTrips);
	}
}, 90000);};

let keepActive = (req, res, next)=>{
	lastUsed = Date.now();
	if(!isActive) updateTrips();
};

router.get('/', (req,res)=>{
	res.send("Server is working!");
});





module.exports = router;