const csv = require('csvtojson');

//database
let DaBa = require("./models");
//models
let DB = DaBa.models;
DaBa.sequelize.sync({force: true}).then(function(){
	let routesArray = [];
	let stopsArray = [];
	let tripsArray = [];
	let invalidRoutes = ["Start"];
	let invalidStops = ["Start"];
	let invalidTrips = ["Start"];
//converts txt data to json objects so we can store the data in SQL
	csv()
	.fromFile('./StaticTripData/routes.txt')
	.on('json',(jsonObj)=>{
		if(jsonObj.route_id) routesArray.push({name: jsonObj.route_id, description: jsonObj.route_long_name, color: jsonObj.route_color});
		else invalidRoutes.push(jsonObj);
	})
	.on('done', (err)=>{
		console.log('done converting routes');
		console.log('Invalid Routes:', ...invalidRoutes);
		DB.Route.bulkCreate(routesArray, {validate: true})
		.then((createdRoutes)=>{
			console.log("CREATED ROUTES!", createdRoutes);
			console.log('end');

			csv()
			.fromFile('./StaticTripData/stops.txt')
			.on('json',(jsonObj)=>{
				if(jsonObj.stop_id) stopsArray.push({number:jsonObj.stop_id, name:jsonObj.stop_name});
				else invalidStops.push(jsonObj);
			})
			.on('done',(err)=>{
				console.log('done converting Stops CSV');
				console.log('Invalid Stops:', ...invalidStops);
				DB.Stop.bulkCreate(stopsArray, {validate: true})
				.then((createdStops)=>{
					console.log("CREATED STOPS!");

				console.log('Ended');
				process.exit();

				});
			});
		});
	});
});
