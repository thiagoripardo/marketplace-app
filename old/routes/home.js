module.exports = function(app){
    
    app.get('/', function(req, res){
        
        //console.log("listando");
        //var connection = app.infra.connectionFactoryRDS();
        //var contatosDAO = new app.infra.ContatosDAO(connection);
        
        res.render("pages/index");
        
//        contatosDAO.list(function(err, result){
//            
//            res.format({
//                html: function(){
//                    
//                },
//                json: function(){
//                    res.json(result);
//                }
//            });
//        });
        //connection.end();
    });
}
