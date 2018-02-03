module.exports = function(sequelize, Sequelize){
  var model = sequelize.define('bus', {
    bus: Sequelize.STRING,
    route: Sequelize.STRING,
  });
  return model;
};