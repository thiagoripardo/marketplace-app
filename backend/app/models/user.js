// load the things we need
//var AWS = require('aws-sdk');
//AWS.config.loadFromPath('./config/config.json');
var path = require('../../config/config.json');
var dynamoose = require('dynamoose');
dynamoose.AWS.config.update(path);
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var Schema = dynamoose.Schema;
var userSchema = new Schema({
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['Client', 'Manager', 'Admin'],
    default: 'Client'
  }
},
{
  throughput: {read: 5, write: 5}
});
// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

// Saves the user's password hashed (plain text password storage is not good)
/*userSchema.save = function (next) {
  var user = this;
  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        return next(err);
      }
      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) {
          return next(err);
        }
        user.password = hash;
        next();
      });
    });
  } else {
    return next();
  }
};*/

// Create method to compare password input to password saved in database
userSchema.methods.comparePassword = function(pw, cb) {
  bcrypt.compare(pw, this.password, function(err, isMatch) {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};


// create the model for users and expose it to our app
module.exports = dynamoose.model('User', userSchema);