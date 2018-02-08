module.exports = function(sequelize, Sequelize){
//bus model.  User-selectable information
  var model = sequelize.define('bus', {
    bus: Sequelize.STRING,
    route: Sequelize.STRING,
  });
  return model;
};