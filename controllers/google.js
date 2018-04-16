const User = require("../models/User");
const passport = require('passport');
const config = require('./../config/Config');

module.exports.controller = (app) => {
  // google strategy
  const Strategy = require('passport-google-oauth').OAuth2Strategy;

  passport.use(new Strategy({
    clientID: config.GOOGLE_APP_ID,
    clientSecret: config.GOOGLE_APP_SECRET,
    callbackURL: '/login/google/return',
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

  app.get('/login/google',
    passport.authenticate('google', { scope: ['email'] }));

  app.get('/login/google/return',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
      console.log(req.user);
      res.redirect('/');
    });
}