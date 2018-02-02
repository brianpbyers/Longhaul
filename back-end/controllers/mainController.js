const request = require('request');
const GTFS = require('gtfs-realtime-bindings');
const DB = require('../models').models;

//getting keys for the requests
const rtdUser = process.env.rtdUser || require('../config/env.js').rtdUser;
const rtdPassword = process.env.rtdPassword || require('../config/env.js').rtdPassword;

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
	res.json([{id_num: 1, name:"one"},{id_num: 2, name:"two"},{id_num: 3, name:"did you see this Mark?"},{id_num: 4, name:"POTATO"},{id_num: 5, name:"alive"}]);
};

//updates real-time trip data provided by RTD
let updateData = ()=>{
	let requestSettings = {
	  method: 'GET',
	  url: 'http://www.rtd-denver.com/google_sync/TripUpdate.pb',
	  auth:{
		user: 'rtdUser',
		pass: 'rtdPassword',
		sendImmediately: false
		},
	  encoding: null
	};
	request(requestSettings, function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	    let feed = GTFS.FeedMessage.decode(body);
	    feed.entity.forEach(function(entity) {
	      if (entity.trip_update) {
	      	updates.push(entity.trip_update);
	      	}
	    });
	  }
	  mongo.connect(dburl, function(err, db){
	  	db.db('RTDData').collection('update').remove({});
	  	if(err) console.log('there has been an error');
	  	updates.forEach((update)=>{
	  		db.db('RTDData').collection('update').insert(update, (err,res)=>{
	  			if(err) console.log('THERE HAS BEEN AN ERROR');
	  		});
	  	});
	  });
	});

};


module.exports.getApi = getApi;
module.exports.getRoutes = getRoutes;
module.exports.getStops = getStops;
module.exports.updateData = updateData;