module.exports = function(sequelize, Sequelize){
  var model = sequelize.define('trip', {
    route: Sequelize.STRING,
    service: Sequelize.STRING,
    trip: Sequelize.STRING
  });
  return model;
};
