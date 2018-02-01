module.exports = function(sequelize, Sequelize){
  var model = sequelize.define("stop", {
    stopId: Sequelize.STRING,
    stopName: Sequelize.STRING,
  });
  return model;
};
