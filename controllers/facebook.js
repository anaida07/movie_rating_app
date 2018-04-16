const User = require("../models/User");
const passport = require('passport');
const config = require('./../config/Config');

module.exports.controller = (app) => {
  // facebook strategy
  const Strategy = require('passport-facebook').Strategy;

  passport.use(new Strategy({
    clientID: config.FACEBOOK_APP_ID,
    clientSecret: config.FACEBOOK_APP_SECRET,
    callbackURL: '/login/facebook/return',
    profileFields: ['id', 'displayName', 'email']
  },
  function(accessToken, refreshToken, profile, cb) {
    const email = profile['emails'][0]['value'];
    User.getUserByEmail(email, function(err, user) {
      if (!user) {
        const newUser = new User({
          fullname: profile['displayName'],
          email: profile['emails'][0]['value'],
          facebookId: profile['id']
        })
        User.createUser(newUser, function(error, user) {
          if (error) {
            res.status(422).json({
              message: "Something went wrong. Please try again after some time!"
            });
          }
          return cb(null, user);
        })
      } else {
        return cb(null, user);
      }
    })
  }));

  app.get('/login/facebook',
    passport.authenticate('facebook', { scope: ['email'] }));

  app.get('/login/facebook/return',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    function(req, res) {
      console.log(req.user);
      res.redirect('/');
    });
}
