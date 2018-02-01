module.exports = function(sequelize, Sequelize){
  var model = sequelize.define('route', {
    name: Sequelize.STRING,
    description: Sequelize.STRING,
    color: Sequelize.STRING
  });
  return model;
};
