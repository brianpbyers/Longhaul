// var request = require('request');
// var gtfs = require('gtfs-realtime-bindings');
// var protobuf = require('protobufjs');
// var http = require('http');
// var btoa = require('btoa');


// better feed maybe:
// http://transitfeeds.com/api/

//could try 'http://RTDgtfsRT:realT!m3Feed@www.rtd-denver.com/google_sync/VehiclePosition.pb'

// var options = {
// 	URL: "http://www.rtd-denver.com/google_sync/VehiclePosition.pb",
// 	{
// 			auth:{
// 					user: 'RTDgtfsRT',
// 					pass: 'realT!m3Feed',
// 					sendImmediately: false
// 				}
// 	}
// }
// var options = {
// 	URL: "http://www.rtd-denver.com/google_sync/VehiclePosition.pb", 
// 	headers: {
// 		"Authorization": "Basic" + new Buffer('RTDgtfsRT' + ':' + 'realT!m3Feed').toString("base64")
// 	}
// }

// request.get("http://www.rtd-denver.com/google_sync/TripUpdate.pb",{
// 	auth:{
// 		user: 'RTDgtfsRT',
// 		pass: 'realT!m3Feed',
// 		sendImmediately: false
// 	}
// }, (err, response, body)=>{
// 		console.log(typeof(body));
// 		var feed = gtfs.FeedMessage.decode(body);
// 		console.log('hello');
// //     });

// http.get("http://www.rtd-denver.com/google_sync/TripUpdate.pb",{
// 	auth:{
// 		user: 'RTDgtfsRT',
// 		pass: 'realT!m3Feed',
// 		sendImmediately: false
// 	}}, (res)=>{
// 		console.log('res?',res);
// 		var data = [];
// 		res.on("data", (chunk)=>{
// 			data.push(chunk);
// 		});
// 		res.on("end", ()=>{
// 			data = Buffer.concat(data);
// 			console.log("job's done.",data);
// 		});
// 	});



var GtfsRealtimeBindings = require('gtfs-realtime-bindings');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var request = require('request');
var updates = [];
var positions = [];
var mongo = require('mongodb').MongoClient;
var dburl = ('mongodb://localhost:27017/RTDData');

// mongoose.connect("mongodb://localhost/RTDData");

// let UpdateSchema = new Schema({
// 	trip: {
// 	    trip_id: String,
// 	    schedule_relationship: Number,
// 	    route_id: String,
// 	    direction_id: Number
// 	},
// 	stop_time_update: [{
// 	    stop_sequence: String,
// 	    arrival: {
// 	        time: {
// 	        	low: Number,
// 	        	high: Number
// 	        }
// 	    },
// 	    departure: {
// 	        time: Number
// 	    },
// 	    stop_id: String,
// 	    schedule_relationship: String
// 	}],
// 	vehicle: {
// 	    id: String,
// 	    label: String
// 	},
// 	timestamp: String
// });


// let Update = mongoose.model('update', UpdateSchema);

var requestSettings = {
  method: 'GET',
  url: 'http://www.rtd-denver.com/google_sync/TripUpdate.pb',
  auth:{
	user: 'RTDgtfsRT',
	pass: 'realT!m3Feed',
	sendImmediately: false
	},
  encoding: null
};
request(requestSettings, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    var feed = GtfsRealtimeBindings.FeedMessage.decode(body);
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


var requestSettingsVP = {
  method: 'GET',
  url: 'http://www.rtd-denver.com/google_sync/VehiclePosition.pb',
  auth:{
	user: 'RTDgtfsRT',
	pass: 'realT!m3Feed',
	sendImmediately: false
	},
  encoding: null
};
request(requestSettingsVP, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    var feed = GtfsRealtimeBindings.FeedMessage.decode(body);
    feed.entity.forEach(function(entity) {
      if (entity.id) {
      	positions.push(entity);
      	}
    });
  }
  mongo.connect(dburl, function(err, db){
  	db.db('RTDData').collection('position').remove({});
  	if(err) console.log('there has been an error');
  	positions.forEach((position)=>{
  		db.db('RTDData').collection('position').insert(position, (err,res)=>{
  			if(err) console.log('THERE HAS BEEN AN ERROR');
  		});
  	});
  });
});