module.exports = function(sequelize, Sequelize){
  var model = sequelize.define('stop', {
    id_num: Sequelize.STRING,
    name: Sequelize.STRING,
  });
  return model;
};
