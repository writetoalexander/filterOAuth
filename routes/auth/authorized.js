const express = require('express');
const router = express.Router();
const passport = require('passport');

/* GET Authorized page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Authorized' });
// });

router.get('/', passport.authenticate('linkedin', {
  successRedirect: '/',
  failureRedirect: '/login'
}));

module.exports = router;
