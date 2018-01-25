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
var request = require('request');

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
        console.log(entity.trip_update);
      }
    });
  }
});