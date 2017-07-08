module.exports = function(app, passport) {
    var auth = require('../infra/isLoggedIn');
    var User = require('../models/user');
    var jwt        = require("jsonwebtoken");
    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function(req, res) {
        //res.render('index.ejs'); // load the index.ejs file
        res.json({message : "Service is running!"});
    });

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    /*app.get('/login', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('login.ejs', { message: req.flash('loginMessage') }); 
    });*/
    
    

    // process the login form
    // app.post('/login', do all our passport stuff here);
    // process the login form
    /*app.post('/login', passport.authenticate('login', { failureRedirect: '/login' }),
        function(req, res) {
            res.redirect('/profile');
        }
    );*/
    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    /*app.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        //res.render('signup.ejs', { message: req.flash('signupMessage') });
        res.json(req.body);
    });
    
    // process the signup form
    app.post('/signup', passport.authenticate('json-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));*/
    
    /*app.post('/signup', passport.authenticate('signup', { failureRedirect: '/signup' }),
        function(req, res) {
            res.redirect('/profile');
        }
    );*/

    // Register new users
    app.post('/register', function(req, res) {
        if(!req.body.email || !req.body.password) {
            res.json({ success: false, message: 'Please enter email and password.' });
        } else {

            /*var newUser = new User({
                email: req.body.email,
                password: req.body.password
            });*/
            User.get({email: req.body.email}, function(err, user) {
                if (err) throw err;

                // check to see if theres already a user with that email
                if (user) {
                    res.status(403).send({ success: false, message: 'That email address already exists.'});
                } else {
                    var newUser = new User();

                    // set the user's local credentials
                    newUser.email    = req.body.email;
                    newUser.password = newUser.generateHash(req.body.password);

                    // Attempt to save the user
                    newUser.save(function(err) {
                        if (err) throw err;
                        else{
                            res.json({ success: true, message: 'Successfully created new user.' });
                        }
                    });
                } 
            });
        }
    });

    app.post('/login', function(req, res) {
        User.get({
            email: req.body.email
        }, function(err, user) {
            if (err) throw err;

            if (!user) {
                res.status(403).send({success: false, msg: 'Authentication failed, User not found'});
            } else {
                // Check if password matches
                user.comparePassword(req.body.password, function(err, isMatch) {
                    if (isMatch && !err) {
                    // Create token if the password matched and no error was thrown
                    
                    var token = jwt.sign(user, "ThisIsAnVerySecureKey", {
                        expiresIn: 1000 // in seconds
                    });
                        res.json({ success: true, token: 'JWT ' + token });
                    } else {
                        return res.status(403).send({success: false, msg: 'Authenticaton failed, wrong password.'});
                    }
                });
            }
        });
    });

    app.get('/dashboard', passport.authenticate('jwt', { session: false }), function(req, res) {
        res.json(
            { 
                message : 'It worked!', 
                user: 'User id is: ' + req.user.email + '.'
            });
    });

    // process the signup form
    // app.post('/signup', do all our passport stuff here);

    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    /*app.get('/profile', auth.isLoggedIn, function(req, res) {
        
        res.json({message : "You are logged!", user: req.user});
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });*/
};

// route middleware to make sure a user is logged in
/*function isLoggedIn(req, res, next) {
    console.log(req.body);
    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}*/
