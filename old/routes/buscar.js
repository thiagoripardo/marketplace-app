module.exports = function(app){
    
//    app.get('/buscar', function(req, res){
//        
//        res.render("pages/lista", {list:res});
//        
//    });
    
    app.get('/buscar/form', function(req, res){
        
        res.render("pages/formbus"); 
        
    });
    
    app.post('/buscar', function(req, res){
        
        var t0 = new Date();
        var contato = req.body;
        console.log(contato);
        var connection = app.infra.connectionFactoryCloudSQL();
        var contatosDAO = new app.infra.ContatosDAO(connection);
        
       	contatosDAO.listByName(contato, function(err, result){
            res.render("pages/lista", {list:result});
        });
        
        var t1 = new Date().getTime();
        var timeElapsed = t1-t0.getTime();
        
        /* LOGS */
        var connectionCloudDatastore = app.infra.connectionFactoryCloudDatastore();
        
        var logDAO = new app.infra.LogDAO(connectionCloudDatastore);

        logDAO.addLog("search", t0, timeElapsed, contato, function(err, result){
            if(err) console.log(err);
        });

    });
    
}