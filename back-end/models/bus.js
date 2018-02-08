module.exports = function(sequelize, Sequelize){
//bus model.  User-selectable information.  Populated when we make the update call.  Belongs to one update
  var model = sequelize.define('bus', {
    bus: Sequelize.STRING,
    route: Sequelize.STRING,
  });
  return model;
};