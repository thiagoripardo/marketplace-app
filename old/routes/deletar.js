module.exports = function(app){
    
    app.get('/deletar', function(req, res){
        
        res.render("pages/formdel"); 
        
    });
    
    app.post('/deletar', function(req, res){
        
        var t0 = new Date();

        var contato = req.body;
        var connection = app.infra.connectionFactoryCloudSQL();
        var contatosDAO = new app.infra.ContatosDAO(connection);
        
       	contatosDAO.delete(contato, function(err, result){
            res.redirect("/contatos"); 
            
        });
        
        var t1 = new Date().getTime();
        var timeElapsed = t1-t0.getTime();
        
        var connectionCloudDatastore = app.infra.connectionFactoryCloudDatastore();
        var logDAO = new app.infra.LogDAO(connectionCloudDatastore);

        logDAO.addLog("delete", t0, timeElapsed, contato, function(err, result){
            if(err) console.log(err);
        });
    });
    
}