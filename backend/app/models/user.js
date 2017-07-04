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
  email: String,
  password: String
},
{
  throughput: {read: 5, write: 5}
});
// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

// create the model for users and expose it to our app
module.exports = dynamoose.model('User', userSchema);