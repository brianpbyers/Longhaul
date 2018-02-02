module.exports = function(sequelize, Sequelize){
  var model = sequelize.define('update', {
    trip: Sequelize.STRING,
    route: Sequelize.STRING,
    bus: Sequelize.STRING,
    stop: Sequelize.STRING,
    eta: Sequelize.INTEGER
  });
  return model;
};
