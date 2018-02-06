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
      bcrypt.genSalt((err,salt)=>{
        if(err) console.log('there has been a salty error:',err);
        console.log('salt:',salt);
        bcrypt.hash(user.password, salt,(err, hash)=>{
          if(err) console.log('there has been a hashy error:',err);
          console.log('generating hash for new user:',hash);
          user.password = hash;
        })
      })
    }  
  }});
  return model;
};
