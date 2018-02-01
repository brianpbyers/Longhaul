// var request = require('request');
// var gtfs = require('gtfs-realtime-bindings');
// var protobuf = require('protobufjs');
// var http = require('http');
// var btoa = require('btoa');


// better feed maybe:
// http://transitfeeds.com/api/
// let lastActive = Date.now();

// updateTest = setInterval(()=>{
//   let rightNow = Date.now();
//   console.log("Time:",rightNow);
//   if((rightNow-lastActive)>6000){
//     console.log("All Done!");
//     clearInterval(updateTest);
//   }

// }, 1000);

var GtfsRealtimeBindings = require('gtfs-realtime-bindings');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var request = require('request');
var updates = [];
var positions = [];
var mongo = require('mongodb').MongoClient;
var dburl = ('mongodb://localhost:27017/RTDData');






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