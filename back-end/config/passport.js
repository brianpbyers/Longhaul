//passport jwt utilizes json web tokens to determine if a valid user is attempting to access the server.
const jsonStrat = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

let DB = require('../models');
let User = DB.models.User;

module.exports = function(passport){
    let opts = {};
    opts.secretOrKey = "SecretJWTString";
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    passport.use(new jsonStrat(opts, (jwt_payload, done)=>{
        User.findById(jwt_payload.id)
        .then((user)=>{
            if(user) return done(null, user);
            else return done(null, false);
        });
    }));
}