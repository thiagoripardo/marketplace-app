module.exports = function(app){
    var images = require('../infra/connectionFactoryCloudStorage');
    var multer = require('multer');

    app.get('/atualizar', function(req, res){
        
        res.render("pages/formup"); 
        
    });
    
    app.post('/atualizar', images.multer.single('image'), images.sendUploadToGCS, (req, res, next) => {
        
        var t0 = new Date();
        var data = req.body;
        var connection = app.infra.connectionFactoryCloudSQL();
        var contatosDAO = new app.infra.ContatosDAO(connection);
        
        if (req.file && req.file.cloudStoragePublicUrl) {
            data.photo = req.file.cloudStoragePublicUrl;
        }

       	contatosDAO.update(data, function(err, result){
            res.redirect("/contatos"); 
            
        });

        var t1 = new Date().getTime();
        var timeElapsed = t1-t0.getTime();
        
        var connectionCloudDatastore = app.infra.connectionFactoryCloudDatastore();
        var logDAO = new app.infra.LogDAO(connectionCloudDatastore);

        logDAO.addLog("update", t0, timeElapsed, data, function(err, result){
            if(err) console.log(err);
        });
    });
    
}
    