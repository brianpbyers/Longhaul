module.exports = function(sequelize, Sequelize){
//user-route model for users to save routes.  Stores reference data to routes and stops.  Belongs to one user, has one route and update
  var model = sequelize.define('user_route', {
    route_name: Sequelize.STRING,
    stop_number: Sequelize.STRING
  });
  return model;
};
