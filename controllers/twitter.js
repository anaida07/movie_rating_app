const User = require("../models/User");
const passport = require('passport');
const config = require('./../config/Config');

module.exports.controller = (app) => {
  // twitter strategy
  const Strategy = require('passport-twitter').Strategy;

  passport.use(new Strategy({
    consumerKey: config.TWITTER_APP_ID,
    consumerSecret: config.TWITTER_APP_SECRET,
    userProfileURL: "https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true",
    callbackURL: '/login/twitter/return',
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

  app.get('/login/twitter',
    passport.authenticate('twitter', { scope: ['email'] }));

  app.get('/login/twitter/return',
    passport.authenticate('twitter', { failureRedirect: '/login' }),
    function(req, res) {
      console.log(req.user);
      res.redirect('/');
    });
}
