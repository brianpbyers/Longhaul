const request = require('request');
const GTFS = require('gtfs-realtime-bindings');

//getting keys for the requests
const rtdUser = process.env.rtdUser || require('../config/env.js').rtdUser;
const rtdPassword = process.env.rtdPassword || require('../config/env.js').rtdPassword;

let getApi = (req, res)=>{
	res.send('You got to the Get API request!');
};



//updates real-time trip data provided by RTD
let updateData = ()=>{

};


module.exports.getApi = getApi;
module.exports.updateData = updateData;