module.exports = function(sequelize, Sequelize){
//route model.  contains information not provided by real time data feed.  Belongs to one update, and belongs to one user_route
  var model = sequelize.define('route', {
    name: Sequelize.STRING,
    description: Sequelize.STRING,
    color: Sequelize.STRING
  });
  return model;
};
