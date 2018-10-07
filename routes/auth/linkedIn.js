const express = require('express');
const router = express.Router();
const keys = require('../../config/keys');
const LINKEDIN_KEY = keys.linkedIn.clientID;
const LINKEDIN_SECRET = keys.linkedIn.clientSecret;
const LinkedInStrategy = require('passport-linkedin').Strategy;
const passport = require('passport');
const User = require('../../database');

passport.initialize();

passport.use(new LinkedInStrategy({
    consumerKey: LINKEDIN_KEY,
    consumerSecret: LINKEDIN_SECRET,
    callbackURL: "http://localhost:5001/auth"
  },
  function(token, tokenSecret, profile, done) {

    User.findOne({userid : profile.id},function(err,result){
      console.log('result is ', result);
      if(!result){
        console.log('first time');
        // userObj.userid = profile.id;
        // userObj.username = profile.displayName;
        //....
        var userObj = new User({
          userid: profile.id,
          userName: profile.displayName
        });
        console.log('userObj is ', userObj )
        userObj.save((err, user) => {
          if (err) {
            console.log('err in new User Update');
          } else {
            console.log('success in creating new user');
          }
        });
      }else{
        console.log('user already present');
      }
    });
  }
));

router.get('/', passport.authenticate('linkedin'));



module.exports = router;
