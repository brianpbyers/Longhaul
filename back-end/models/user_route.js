module.exports = function(sequelize, Sequelize){
  var model = sequelize.define('user_route', {
    route_name: Sequelize.STRING,
    stop_number: Sequelize.STRING
  });
  return model;
};
