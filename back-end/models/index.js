let Sequelize = require('sequelize');

let compName = process.env.compName||require('../config/env.js').compName;

let sequelize = new Sequelize(`postgres://${compName}@localhost:5432/longhaul`);

module.exports.sequelize = sequelize;
module.exports.Sequelize = Sequelize;

let Bus = sequelize.import('./bus');
let Route = sequelize.import('./route');
let Stop = sequelize.import('./stop');

module.exports.models = {
	Bus: Bus,
	Route: Route,
	Stop: Stop
};