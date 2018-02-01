const csv = require('csvtojson');


let DaBa = require("./models");
let DB = DaBa.models;
DaBa.sequelize.sync({force: true}).then(function(){
	let routesArray = [];
	let stopsArray = [];
	let invalidRoutes = ["Start"];
	let invalidStops = ["Start"];

	csv()
		.fromFile('./StaticTripData/routes.txt')
		.on('json',(jsonObj)=>{
			if(jsonObj.route_id) routesArray.push(jsonObj);
			else invalidRoutes.push(jsonObj);
		})
		.on('done', (err)=>{
			console.log('done converting routes');
			console.log('Invalid Routes:', ...invalidRoutes);
			routesArray.forEach((route)=>{
			//routeId: route_id, routeName: route_long_name, routeColor: route_color
				DB.Route.create({
					name: route.route_id,
					description: route.route_long_name,
					color: route.route_color
				})
				.then((routeN)=>{
					console.log('Saved Route:',routeN.name);
				});
			});
			console.log('end');
		});

	csv()
		.fromFile('./StaticTripData/stops.txt')
		.on('json',(jsonObj)=>{
			if(jsonObj.stop_id) stopsArray.push(jsonObj);
			else invalidStops.push(jsonObj);
		})
		.on('done',(err)=>{
			console.log('done converting Stops CSV');
			console.log('Invalid Stops:', ...invalidStops);
			stopsArray.forEach((stop)=>{
				DB.Stop.create({
					id_num: stop.stop_id,
					name: stop.stop_name
				})
				.then((stopN)=>{
					console.log('Saved Stop:',stopN.name);
				});
			//stopId: stop_id, stopName: stop_name
			});

			console.log('Ended');
		});
});
