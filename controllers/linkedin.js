const User = require("../models/User");
const passport = require('passport');
const config = require('./../config/Config');

module.exports.controller = (app) => {
  // linkedin strategy
  const Strategy = require('passport-linkedin').Strategy;

  passport.use(new Strategy({
    consumerKey: config.LINKEDIN_APP_ID,
    consumerSecret: config.LINKEDIN_APP_SECRET,
    callbackURL: '/login/linkedin/return',
    profileFields: ['id', 'first-name', 'last-name', 'email-address']
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

  app.get('/login/linkedin',
    passport.authenticate('linkedin'));

  app.get('/login/linkedin/return',
    passport.authenticate('linkedin', { failureRedirect: '/login' }),
    function(req, res) {
      console.log(req.user);
      res.redirect('/');
    });
}