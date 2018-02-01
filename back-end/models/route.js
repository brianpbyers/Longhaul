module.exports = function(sequelize, Sequelize){
  var model = sequelize.define("route", {
    rouetId: Sequelize.STRING,
    routeName: Sequelize.STRING,
    routeColor: Sequelize.STRING
  });
  return model;
};
