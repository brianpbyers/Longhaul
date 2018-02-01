var Sequelize = require('sequelize');

var compName = process.env.compName||require('../config/env.js').compName;

var sequelize = new Sequelize(`postgres://${compName}@localhost:5432/longhaul`);

module.exports.sequelize = sequelize;
module.exports.Sequelize = Sequelize;

var Bus = sequelize.import('./bus');
var Route = sequelize.import('./route');
var Stop = sequelize.import('./stop');

module.exports.models = {
	Bus: Bus,
	Route: Route,
	Stop: Stop
};