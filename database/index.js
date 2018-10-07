const mongoose = require('mongoose');
const keys = require('../config/keys');
const mongoKey = keys.mongoDB.dburi;

mongoose.connect(mongoKey, console.log('connected to database'));

const userSchema = mongoose.Schema({
  userid: String,
  userName: String
});

// userSchema.statics.findOrCreate = function findOrCreate(profile, cb){

//     var userObj = new User({
//         userid: profile.id,
//         username: profile.displayName
//     });
//     console.log('userObj looking like', JSON.stringify(userObj));
//     this.findOne({userid : profile.id},function(err,result){
//         console.log('result is ', result);
//         if(!result){
//             console.log('first time');
//             // userObj.userid = profile.id;
//             // userObj.username = profile.displayName;
//             //....
//             userObj.save(cb);
//         }else{
//             console.log('user already present');
//             cb(err,result);
//         }
//     });
// };

let User = mongoose.model('User', userSchema);

module.exports = User;
