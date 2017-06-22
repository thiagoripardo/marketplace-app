module.exports = function(app){

    app.get('/logs', function(req, res){
        
        var connectionCloudDatastore = app.infra.connectionFactoryCloudDatastore();
        var logDAO = new app.infra.LogDAO(connectionCloudDatastore);
        
        logDAO.list(function(result){
            
            
            res.format({
                html: function(){
                    res.render("pages/logs", {list:result}); 
                },
                json: function(){
                    res.json(result);
                }
            });
            
        });
    });
}