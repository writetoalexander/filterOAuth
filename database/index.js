const mongoose = require('mongoose');
const keys = require('../config/keys');
const mongoKey = keys.mongoDB.dburi;

mongoose.connect(mongoKey, console.log('connected to database'));

const userSchema = mongoose.Schema({
  userid: String,
  userName: String
});

let User = mongoose.model('User', userSchema);

module.exports = User;
