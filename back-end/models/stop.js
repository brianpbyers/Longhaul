module.exports = function(sequelize, Sequelize){
  var model = sequelize.define('stop', {
    number: Sequelize.STRING,
    name: Sequelize.STRING,
  });
  return model;
};
