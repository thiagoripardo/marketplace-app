var app = require('./config/express')();
//var routes = require('./app/routes/produtos')(app);

//app.use()

app.listen(8080, function(){
    
    console.log("servidor rodando na porta 8080");
})
