const csv = require('csvtojson');
const Sequelize = require('sequelize');
const compName = require('./config/env.js').compName;
var sequelize = new Sequelize(`postgres://${compName}@localhost:5432/longhaul`);

var DB = require("./models");
DB.sequelize.sync({force: true}).then(function(){
  process.exit();
});

csv()
	.fromFile('./StaticTripData/routes.txt')
	.on('json',(jsonObj)=>{
		console.log("COMPLETE!");
		console.log(jsonObj);
		//routeId: route_id, routeName: route_long_name, routeColor: route_color
	})
	.on('done', (err)=>{
		console.log('end');
	});

csv()
	.fromFile('./StaticTripData/stops.txt')
	.on('json',(jsonObj)=>{
		console.log("Complete!!!");
		console.log(jsonObj);
		//stopId: stop_id, stopName: stop_name
	})
	.on('done',(err)=>{
		console.log('Ended');
	});

//there might be a better way to do this, but I don't want to drop all tables every time we process data after this.
var DB = require("./models");
DB.sequelize.sync({force: false}).then(function(){
  process.exit();
});