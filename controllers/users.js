const User = require("../models/User");
const jwt = require("jsonwebtoken");
const passportJWT = require("passport-jwt");
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;
const jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
const config = require('./../config/Config');
const passport = require('passport');
require('./../config/passport')(passport);

module.exports.controller = (app) => {
  // login a user
  app.post("/api/users/login", function(req, res) {
    if(req.body.email && req.body.password){
      const email = req.body.email;
      const password = req.body.password;
      User.getUserByEmail(email, function(err, user){
        if( ! user ){
          res.status(404).json({ message:"The user does not exist!" });
        } else {
          User.comparePassword(password, user.password, function(err, isMatch){
            if(err) throw err;
            if(isMatch) {
              const token = jwt.sign(user.toJSON(), config.SECRET);
              res.json({ success: true, token: 'JWT ' + token, user_id: user.id });
            } else {
              res.status(401).json({ message: "The password is incorrect!" });
            }
          })
        }
      });
    }
  });

  app.get('/api/current_user', passport.authenticate('jwt', { session: false}), function(req, res) {
    const token = getToken(req.headers);
    if (token) {
      res.send({ current_user: req.user })
    } else {
      res.status(403).send({ success: false, msg: 'Unauthorized.' });
    }
  })

  getToken = function (headers) {
    if (headers && headers.authorization) {
      var parted = headers.authorization.split(' ');
      if (parted.length === 2) {
        return parted[1];
      } else {
        return null;
      }
    } else {
      return null;
    }
  };

  // register a user
  app.post('/api/users/register', (req, res) => {
    const email = req.body.email;
    const fullname = req.body.fullname;
    const password = req.body.password;
    const role = req.body.role || 'user';
    const newUser = new User({
      email: email,
      fullname: fullname,
      role: role,
      password: password
    })
    User.createUser(newUser, function(error, user) {
      if (error) {
        res.status(422).json({
          message: "Something went wrong. Please try again after some time!"
        });
      }
      res.send({ user: user })
    })
  })
}
