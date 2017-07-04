// load all the things we need
var JsonStrategy = require('passport-json').Strategy;

// load up the user model
var User = require('../app/models/user');

// expose this function to our app using module.exports
module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.email);
    });

    // used to deserialize the user
    passport.deserializeUser(function(email, done) {
        User.get({email: email}, function(err, user) {
            done(err, user);
        });
    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('signup', new JsonStrategy({
        usernameProp: 'email',
        passwordProp: 'password'
        },
        function(email, password, done) {
            process.nextTick(function() {
                
                // find a user whose email is the same as the forms email
                // we are checking to see if the user trying to login already exists
                //User.get({ local.email :  email }, function(err, user) {
                //User.query('email').eq(email).exec(function (err, user) {
                User.get({email: email}, function(err, user) {
                    // if there are any errors, return the error
                    if (err)
                        return done(err);

                    // check to see if theres already a user with that email
                    if (user) {
                        return done(null, false);
                    } else {

                        // if there is no user with that email
                        // create the user
                        var newUser = new User();

                        // set the user's local credentials
                        newUser.email    = email;
                        newUser.password = newUser.generateHash(password);
                        //console.log(newUser.email+' '+newUser.password);
                        // save the user
                        newUser.save(function(err) {
                            if (err)
                                throw err;
                            return done(null, newUser);
                        });
                    }
                });    
            });
        }
    ));
    
    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('login', new JsonStrategy({
        usernameProp: 'email',
        passwordProp: 'password'
        },
        function(email, password, done) {
            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            console.log(email);
            User.get({email: email}, function(err, user) {
                // if there are any errors, return the error before anything else
                if (err)
                    return done(err);

                // if no user is found, return the message
                if (!user)
                    return done(null, false); //req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash

                // if the user is found but the password is wrong
                if (!user.validPassword(password))
                    return done(null, false); //req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

                // all is well, return successful user
                return done(null, user);
            });
        }
    ));
};