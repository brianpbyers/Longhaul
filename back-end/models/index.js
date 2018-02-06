let Sequelize = require('sequelize');

let compName = process.env.compName||require('../config/env.js').compName;

let sequelize = new Sequelize(process.env.HEROKU_POSTGRESQL_AQUA_URL || `postgres://${compName}@localhost:5432/longhaul`);

module.exports.sequelize = sequelize;
module.exports.Sequelize = Sequelize;

let Bus = sequelize.import('./bus');
let Route = sequelize.import('./route');
let Stop = sequelize.import('./stop');
let Update = sequelize.import('./update');
let User = sequelize.import('./user');
let UserRoute = sequelize.import('./user_route');

UserRoute.belongsTo(User);
User.hasMany(UserRoute);

module.exports.models = {
	Update: Update,
	Route: Route,
	Stop: Stop,
	Bus: Bus,
	User: User,
	UserRoute: UserRoute
};