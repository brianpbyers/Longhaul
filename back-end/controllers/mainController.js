const request = require('request');
const GTFS = require('gtfs-realtime-bindings');
const DaBa = require('../models');
const DB = DaBa.models;

//getting keys for the requests
const rtdUser = process.env.rtdUser || require('../config/env.js').rtdUser;
const rtdPassword = process.env.rtdPassword || require('../config/env.js').rtdPassword;

let oneUpdate = {};
let updates = [];

let getApi = (req, res)=>{
	res.send('You got to the Get API request!');
};

let getRoutes = (req, res)=>{
	DB.Route.findAll()
		.then((routes)=>{
			res.json(routes);
		});
};

let getStops = (req, res)=>{
	let userRoute = req.params.route;
	let resObj = {buses:[], stops:[]};
	DB.Bus.findAll({where:{route:userRoute}})
	.then((buses)=>{
		resObj.buses = buses;
		console.log('found buses!',...buses);
		DaBa.sequelize.query(`select * from (select distinct on (route, stop) route, stop from updates where route = '${userRoute}') potato JOIN stops ON potato.stop=stops.number;`)
		 .then((stops)=>{
		 	console.log('sorta found stops',...stops[0]);
		 	resObj.stops = stops[0];
		 	res.json(resObj);
		});
	});
};

let getUpdate = (req,res)=>{
	updateData();
	res.send("You got here!");
};

//updates real-time trip data provided by RTD
let updateData = ()=>{
	let StartTime = Date.now();
	let requestSettings = {
	  method: 'GET',
	  url: 'http://www.rtd-denver.com/google_sync/TripUpdate.pb',
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
	  }
	  DB.Update.destroy({where:{}})
	  .then(()=>{
		  DB.Update.bulkCreate(updates,{validate:true})
		  .then((updates)=>{
		  	let TotalTime = (Date.now()-StartTime)/1000;
		  	console.log('created updates!!!!! took: ',TotalTime,'Seconds');
		  	DB.Update.findAll({attributes:[DaBa.sequelize.literal('DISTINCT ON("bus") "bus", "route"')], raw: true})
		  	.then((buses)=>{
		  		DB.Bus.destroy({where:{}})
		  		.then(()=>{
		  			DB.Bus.bulkCreate(buses)
		  			.then((buses)=>{
		  				let totalToBuses = (Date.now()-StartTime)/1000;
		  				console.log("SHOULD HAVE CREATED BUSES!  Took:",totalToBuses,"seconds");
		  			});
		  		});
		  	});

		  });
		});
	});

};


module.exports.getApi = getApi;
module.exports.getRoutes = getRoutes;
module.exports.getStops = getStops;
module.exports.getUpdate = getUpdate;
module.exports.updateData = updateData;