module.exports = function(app){
    
    app.get('/sobre', function(req, res){
        
        var connectionDynamo = app.infra.connectionFactoryDynamo();
        
        res.render("pages/about");
    });
}
