//allows us to route requests to a controller
const router = require('express').Router();

//authentication strategy
const passport = require('passport');

//controls most of app funcitonality, except authentication
let mainController = require('../controllers/mainController');
//controls user authentication and token decoding
let authController = require('../controllers/authController');


//used by updateTrips&keepActive to keep the api calls running as long as a user is using the app.  Shuts down after 10min of inactivity
let lastUsed = Date.now();
//determines if the server is active(has seen user traffic in the last 15 min)
let isActive = false;


//will start up the interval function to make api calls.  this is where the API Update function will be called;
let updateTrips = ()=>{
	console.log("Hit Update Trip!");
	//will let functions know the updater is running and not to run it again
	isActive = true;
	// make API route call and parse data
	mainController.updateData();

	let rightNow = Date.now();
	//if nobody's been here in 15 minutes(900000ms), turn it off!
	if((rightNow-lastUsed)>600000){
		console.log("it has been 15 minutes with no server hits.  Should be shutting down");
		//lets functions know that the updater is not running and to restart it
		isActive = false;
		clearInterval(updateTimer);
	}
};

//using this method so we can clearInterval in updateTrips.  clearInterval needs a named setInterval to clear it.
updateTimer = setInterval(function(){updateTrips();},90000);


//keeps server awake and updating data only as long as people are requesting.  Called from server.  If it isn't already updating, it will start it up again!
router.keepActive = (req, res, next)=>{
	console.log("Hit keepActive! lastUsed:",lastUsed);
	lastUsed = Date.now();
	if(!isActive){
		updateTrips();
		updateTimer;
	}
	return next();
};

//dummy route to test basic functionality
router.get('/', (req,res)=>{
	res.json("POTATO Server is working!");
});

//dummy route to test router functionality
router.route('/api')
	.get(mainController.getApi);

//sends all available routes to user
router.route('/api/routes')
	.get(mainController.getRoutes);

//sends all buses associated with a route
router.route('/api/buses/:route')
	.get(mainController.getBuses);

//sends all available stops associated with a bus & route
router.route('/api/stops/:route/:bus')
	.get(mainController.getStops);

//provides real-time updates on the users trip
router.route('/api/update/:route/:stop/:bus')
	.get(mainController.getUpdate);

//login functionality
router.route('/api/login')
	.post(authController.login);

//signup functionality
router.route('/api/signup')
	.post(authController.signup);

//will only allow authenticated users to access their routes
router.route('/api/userroutes')
	.get(authController.hasGoodToken, mainController.getUserRoutes)
	.post(authController.hasGoodToken,mainController.postUserRoutes);

//will only allow authenticated users to manipulate their routes
router.route('/api/userroutes/:id')
	.get(authController.hasGoodToken,mainController.showUserRoute)
	.put(authController.hasGoodToken,mainController.editUserRoute)
	.delete(authController.hasGoodToken,mainController.deleteUserRoute);




module.exports = router;