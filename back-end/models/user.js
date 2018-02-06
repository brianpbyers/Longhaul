const bcrypt = require('bcrypt');

let hashPw=(pass)=>{
  bcrypt.genSalt((err, salt)=>{

  })
}


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
