// ja esta carregado var connectionFactory = require('../infra/connectionFactory');

module.exports = function(app){
    var images = app.infra.connectionFactoryS3();
    var multer = require('multer');

    app.get('/contatos', function(req, res){
        
        console.log("listando");
        var connection = app.infra.connectionFactoryCloudSQL();
        var contatosDAO = new app.infra.ContatosDAO(connection);
        
        contatosDAO.list(function(err, result){
            
            res.format({
                html: function(){
                    res.render("pages/lista", {list:result}); 
                },
                json: function(){
                    res.json(result);
                }
            });
        });
        connection.end();
    });
    
    app.get('/contatos/form', function(req, res){
        
        res.render("pages/form"); 
        
    });
    
    app.post('/contatos', images.multer.single('image'), images.sendUploadToGCS, (req, res, next) => {
        
        var t0 = new Date();

        var data = req.body;
        var connection = app.infra.connectionFactoryCloudSQL();
        var contatosDAO = new app.infra.ContatosDAO(connection);

        // Was an image uploaded? If so, we'll use its public URL
        // in cloud storage.
        if (req.file && req.file.cloudStoragePublicUrl) {
            data.photo = req.file.cloudStoragePublicUrl;
        }

        /* Save Data */
       	contatosDAO.save(data, function(err, result){
            res.redirect("/contatos"); 
        });

        /* Logs */
        var t1 = new Date().getTime();
        
        var timeElapsed = t1-t0.getTime();
        console.log("Time Elapsed: " + timeElapsed + "milliseconds");
        
        
        var connectionCloudDatastore = app.infra.connectionFactoryCloudDatastore();
        var logDAO = new app.infra.LogDAO(connectionCloudDatastore);

        logDAO.addLog("add", t0, timeElapsed, data, function(err, result){
            if(err) console.log(err);
        });
    });
}
