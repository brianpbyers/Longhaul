module.exports = function(sequelize, Sequelize){
//trip update model.  Contains all relevant data provided by RTD's real-time-data feed.  Has One bus, stop, and route
  var model = sequelize.define('update', {
    trip: Sequelize.STRING,
    route: Sequelize.STRING,
    bus: Sequelize.STRING,
    stop: Sequelize.STRING,
    eta: Sequelize.BIGINT
  });
  return model;
};
