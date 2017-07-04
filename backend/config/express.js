var express = require('express');
var app = express();
var load = require('express-load');
var bodyParser = require('body-parser');
var passport = require('passport');
var flash = require('connect-flash');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var cors = require('cors');

module.exports = function() {

    app.set('view engine', 'ejs');
    app.set('views','./app/views');

    //app.use('/styles', express.static(process.cwd() + '/styles'));

    // set up our express application
    app.use(morgan('dev')); // log every request to the console
    app.use(cookieParser()); // read cookies (needed for auth)
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    
    //middlewareParser
    require('../config/passport')(passport); // pass passport for configuration

    // required for passport
    app.use(require('express-session')({ secret: 'ilovesuniquestheavymetalmilf', resave: true, saveUninitialized: true })); // session secret
    app.use(passport.initialize());
    app.use(passport.session()); // persistent login sessions
    app.use(flash()); // use connect-flash for flash messages stored in session
    app.use(cors());
    
    // load routes
    require('../app/routes/authentication.js')(app, passport); // load our routes and pass in our app and fully configured passport
    require('../app/routes/achievements.js')(app);
    require('../app/routes/adventurers.js')(app);
    require('../app/routes/missions.js')(app);
    
    // load infrastructure
    load('infra', {cwd: 'app'}).into(app);
    
    return app;

}