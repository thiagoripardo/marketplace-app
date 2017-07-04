var app = require('./config/express')();
var port = process.env.PORT || 8080;

app.listen(port);
console.log('Running at port: ' + port);