let jwt = require('jwt-simple');
let DB = require('../models');
let User = DB.models.User;
let bcrypt = require('bcrypt');
let secretString = "SecretJWTString"

//login function.  upon success returns a jwt to the user for future server interactions
let login = (req, res)=>{
    User.findAll({where:{
        username: req.body.name
    }})
    .then((user)=>{
        if(!(user && user[0] && user[0].username)){
            return res.status(403).send({success:false, msg: "No such user was found."});
        }else{
            bcrypt.compare(req.body.password, user[0].password, (err, isValid)=>{
                if(!isValid||err){
                    return res.status(403).send({success:false, msg: "Incorrect Password."})
                }else{
                    let token = jwt.encode(user[0], secretString);
                    res.json({success: true, token: token, msg:"Welcome back to Longhaul!"+jwt.decode(token, secretString).id});
                }
            });
        }
    });
}

//signup function.  upon success returns a jwt for future server interactions
let signup = (req,res)=>{
    if(!req.body.name||!req.body.password){
        res.json({success: false, msg:"Please enter both a username AND a password"});
    }else{
        User.findAll({where:{
            username: req.body.name
        }})
        .then((user)=>{
            if(user && user[0] && user[0].username){
                return res.json({success: false, msg:"Username already exists.  Please choose another"});
            } else{
                let newUser = {
                    username: req.body.name,
                    password: req.body.password
                };
                User.create(newUser)
                .then((user)=>{
                    let token = jwt.encode(user, secretString);
                    res.json({success: true, token: token, msg: "Welcome to Longhaul!"});
                });
            }
        });
    }
}

//isAuthenticated function.  Success allows user to access their requested information.  Failure does not.
let hasGoodToken = (req, res, next)=>{
    if(req.headers.authorization && req.headers.authorization.split(' ')[0]==='Bearer'){
        let decodedToken = decodeToken(req);
        return next();
    }else{
        return res.json({success: false, msg:"error: invalid token!"});
    }

}

//returns user information stored in the req's token
let decodeToken = (req)=>{
    //.name, .password etc will be returned.
    return jwt.decode(req.headers.authorization.split(' ')[1], secretString);
}

module.exports.login=login;
module.exports.signup=signup;
module.exports.hasGoodToken=hasGoodToken;
module.exports.decodeToken=decodeToken;