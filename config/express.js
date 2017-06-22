var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');
//var busboyBodyParser = require('busboy-body-parser');
module.exports = function() {

    var app = express();
    app.set('view engine', 'ejs');
    app.set('views','./app/views');

    app.use('/styles', express.static(process.cwd() + '/styles'));
    
    //middlewareParser
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    //app.use(busboyBodyParser());
    
    // carregar rotas
    // para procurar routes em {cwd: 'app'}
    load('routes',{cwd: 'app'})
        .then('infra')
        .into(app);

    return app;

}