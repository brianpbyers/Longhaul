const bcrypt = require('bcrypt');
//user model.  using bcrypts sync versions because async caused issues even with beforeCreate.  Has many user routes
module.exports = function(sequelize, Sequelize){
  var model = sequelize.define('user', {
    username: Sequelize.STRING,
    password: Sequelize.STRING
  }, {hooks: {
    beforeCreate: (user)=>{
      console.log('generating salt for new user');
      user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync());
    }  
  }});
  return model;
};
