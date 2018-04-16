const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema
const UserSchema = new Schema({
  fullname: String,
  email: String,
  role: String,
  password: String,
})

const User = mongoose.model("User", UserSchema)
module.exports = User

module.exports.createUser = function(newUser, callback){
  bcrypt.genSalt(10, function(err, salt){
    bcrypt.hash(newUser.password, salt, function(err, hash){
      // store hash in your password DB
      newUser.password = hash;
      newUser.save(callback);
    })
  })
}

module.exports.getUserByEmail = function(email, callback) {
  var query = { email: email }
  User.findOne(query, callback)
}

module.exports.comparePassword = function(candidatePassword, hash, callback) {
  bcrypt.compare(candidatePassword, hash, function(err, isMatch){
    if(err) throw err;
    callback(null, isMatch);
  })
}
