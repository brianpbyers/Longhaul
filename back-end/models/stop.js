module.exports = function(sequelize, Sequelize){
//stop model.  Contains information not provided by real-time data feed
  var model = sequelize.define('stop', {
    number: Sequelize.STRING,
    name: Sequelize.STRING,
  });
  return model;
};
