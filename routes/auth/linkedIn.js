const express = require('express');
const router = express.Router();
const keys = require('../../config/keys');
const LINKEDIN_KEY = keys.linkedIn.clientID;
const LINKEDIN_SECRET = keys.linkedIn.clientSecret;
const LinkedInStrategy = require('passport-linkedin').Strategy;
const passport = require('passport');
const User = require('../../database')

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Auth Route' });
// });

// passport.use(new LinkedInStrategy({
//   clientID: LINKEDIN_KEY,
//   clientSecret: LINKEDIN_SECRET,
//   callbackURL: "http://localhost:5001/auth",
//   scope: ['r_emailaddress', 'r_basicprofile'],
// }, function(accessToken, refreshToken, profile, done) {
//   // asynchronous verification, for effect...
//   process.nextTick(function () {
//     // To keep the example simple, the user's LinkedIn profile is returned to
//     // represent the logged-in user. In a typical application, you would want
//     // to associate the LinkedIn account with a user record in your database,
//     // and return that user instead.
//     return done(null, profile);
//   });
// }));

// router.get('/',
//   passport.authenticate('linkedin', { state: 'TRUE STATE'  }),
//   function(req, res){
//     // The request will be redirected to LinkedIn for authentication, so this
//     // function will not be called.
//   });

passport.use(new LinkedInStrategy({
    consumerKey: LINKEDIN_KEY,
    consumerSecret: LINKEDIN_SECRET,
    callbackURL: "http://localhost:5001/auth"
  },
  function(token, tokenSecret, profile, done) {
    User.findOrCreate({ linkedinId: profile.id }, function (err, user) {
      if (err) {
        console.log('err in findOrCreate');
      } else {
        console.log('success in findOrCreate');
      }

      return done(err, user);
    });
  }
));

router.get('/', passport.authenticate('linkedin'));



module.exports = router;
