module.exports = function(sequelize, Sequelize){
  var model = sequelize.define('user', {
    username: Sequelize.STRING,
    password: Sequelize.STRING
  });
  return model;
};
