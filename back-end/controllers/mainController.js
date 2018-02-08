const request = require('request');
//tool used to parse incoming .pb data
const GTFS = require('gtfs-realtime-bindings');
//Allowed to connect to database.  REFACTOR: Get rid of models object and put everything on front index.js file.
const DaBa = require('../models');
const Op = DaBa.Sequelize.Op;
//Calls up models
const DB = DaBa.models;

const Auth = require('./authController');

//getting keys for the requests
const rtdUser = process.env.rtdUser || require('../config/env.js').rtdUser;
const rtdPassword = process.env.rtdPassword || require('../config/env.js').rtdPassword;

// //defines variables used in routes.
// let oneUpdate = {};
// let updates = [];


let getApi = (req, res)=>{
	res.send('You got to the Get API request!');
};

//sends all available routes
let getRoutes = (req, res)=>{
	DaBa.sequelize.query(`SELECT * FROM routes JOIN (SELECT DISTINCT (route) route FROM updates) AS potato ON routes.name = potato.route;`)
		.then((routes)=>{
			res.json(routes[0]);
		});
};

//returns all buses on a route
let getBuses = (req, res)=>{
	let userRoute = req.params.route;
	DB.Bus.findAll({where:{route:userRoute}})
	.then((buses)=>{
		res.json(buses);
	});

};

//sends all stops and buses associated with the route param
let getStops = (req, res)=>{
	let userRoute = req.params.route;
	let userBus = req.params.bus;
	DaBa.sequelize.query(`SELECT * FROM (SELECT DISTINCT ON (route, stop) route, stop FROM updates WHERE route = '${userRoute}' AND bus = '${userBus}') potato JOIN stops ON potato.stop=stops.number;`)
	 .then((stops)=>{
	 	res.json(stops[0]);
	});
};


//sends trip updates for the selected route, stop, and bus
let getUpdate = (req,res)=>{
	// res.send("TYPE OF ROUTE:",typeof(req.params.route), "TYPE OF STOP:", typeof(req.params.stop));

	DB.Update.findAll({where:{route: req.params.route, stop: req.params.stop, bus:req.params.bus}})
	.then((update)=>{
		res.json(update[0]);
	});
};

//updates real-time trip data provided by RTD
let updateData = ()=>{
	let StartTime = Date.now();
	let updates = [];
	let oneUpdate = {};
	let requestSettings = {
	  method: 'GET',
	  url: 'https://www.rtd-denver.com/google_sync/TripUpdate.pb',
	  auth:{
		user: rtdUser,
		pass: rtdPassword,
		sendImmediately: false
		},
	  encoding: null
	};
	request(requestSettings, function (error, response, body) {
		console.log('got to the request');
	  if (!error && response.statusCode == 200) {
	  	console.log('got some stuff I think');
	    let feed = GTFS.FeedMessage.decode(body);
	    feed.entity.forEach(function(entity) {
	    //having trouble with MULTIPLE bus #'s not being included'
	      if (entity.trip_update) {
	      	oneUpdate = {trip: entity.trip_update.trip.trip_id||"FIXME", route: entity.trip_update.trip.route_id||"FIXME", bus:entity.trip_update.vehicle?entity.trip_update.vehicle.id:entity.trip_update.trip.route_id||"FIXME"};
	      	console.log('OneUpdate:',oneUpdate);
	      	entity.trip_update.stop_time_update.forEach((stop)=>{
	      		oneUpdate.stop = stop.stop_id;
	      		oneUpdate.eta = (stop.arrival? stop.arrival.time.low:stop.departure?stop.departure.time.low:0)*1000;
	      		updates.push(Object.assign({},oneUpdate));
	      	});
	      	}
	    });
	    let searchTime = Date.now();
	  }
	  DB.Update.count().then((numUpdates)=>{
	  	console.log('updating, then destroying',numUpdates,'updates');
	  	DB.Update.bulkCreate(updates, {validate:true})
	  	.then(()=>{
	  		//deleting any records created over 30 seconds ago.  This will allow for recent updates to be retained, but old updates to be removed
	  		DB.Update.destroy({where:{createdAt:{[Op.lt]:(Date.now()- 30000)}}})
	  		.then(()=>{
		  		let totalTime = (Date.now()-StartTime)/1000;
		  		let deleteTime = (Date.now()-StartTime)/1000;
		  		DB.Update.findAll({attributes:[DaBa.sequelize.literal('DISTINCT ON("bus") "bus", "route"')], raw: true})
			  	.then((buses)=>{
			  		DB.Bus.destroy({where:{}})
			  		.then(()=>{
			  			DB.Bus.bulkCreate(buses)
			  			.then((buses)=>{
			  				let totalToBuses = (Date.now()-totalTime -StartTime)/1000;
			  				console.log("SHOULD HAVE CREATED BUSES!  Took:",totalToBuses,"seconds");
		  					console.log("Total Time:",totalTime);
		 			 		console.log("Delete Time:",deleteTime);
		 			 		console.log("should have destroyed",numUpdates, "updates");
			  				console.log("This many updates:",updates.length);
			  			});
			  		});
		  		});
		  	});

	  	});
	  });
	});

};

//returns all saved routes associated with the user
let getUserRoutes = (req, res)=>{
	let user = Auth.decodeToken(req);
	DaBa.sequelize.query(`SELECT user_routes.id, user_routes.route_name, user_routes.stop_number, stops.name, routes.description FROM user_routes JOIN stops ON user_routes.stop_number=stops.number JOIN routes ON user_routes.route_name=routes.name WHERE user_routes."userId"=${user.id}`)
	.then((routes)=>{
		res.json(routes[0]);
	});
}

//creates user routes
let postUserRoutes = (req, res)=>{
	let user = Auth.decodeToken(req);
	let newRoute = {
		userId: user.id,
		route_name: req.body.route_name,
		stop_number: req.body.stop_number
	}

	DB.UserRoute.create(newRoute)
	.then((route)=>{
		res.json(route);
	});
}

//returns a specific route
let showUserRoute = (req, res)=>{
	let routeId = Number(req.params.id);
	DB.UserRoute.findById(routeId)
	.then((route)=>{res.json(route)});
}

let editUserRoute = (req, res)=>{

}


//destroys a specific route
let deleteUserRoute = (req, res)=>{
	DB.UserRoute.destroy({where:{id:Number(req.params.id)}})
	.then(()=>{
		res.json("Success!");
	})
}

module.exports.getApi = getApi;
module.exports.getRoutes = getRoutes;
module.exports.getBuses = getBuses;
module.exports.getStops = getStops;
module.exports.getUpdate = getUpdate;
module.exports.updateData = updateData;
module.exports.getUserRoutes = getUserRoutes;
module.exports.postUserRoutes = postUserRoutes;
module.exports.showUserRoute = showUserRoute;
module.exports.editUserRoute = editUserRoute;
module.exports.deleteUserRoute = deleteUserRoute;