module.exports = function(sequelize, Sequelize){
  var model = sequelize.define('bus', {
    number: Sequelize.STRING,
    route: Sequelize.STRING,
  });
  return model;
};