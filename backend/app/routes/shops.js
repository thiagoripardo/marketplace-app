// ja esta carregado var connectionFactory = require('../infra/connectionFactory');

module.exports = function(app){
    var auth = require('../infra/isLoggedIn');
    var connectionFactoryDynamo = app.infra.connectionFactoryDynamo();
    var shopsDAO = new app.infra.ShopDAO(connectionFactoryDynamo);

    /* ###################### GET OPERATIONS ###################### */
    app.get('/shops/:ownerid', function(req, res) {
        
        var data = {
            "ownerid" : req.params.ownerid
        };

        shopsDAO.scan(data, function(err, result){
            responseToFront(err, res, result);
        });
    });
    
    app.get('/shops/info/:id', function(req, res) {
        
        var data = {
            "id" : Number(req.params.id)
        };

        shopsDAO.get(data, function(err, result){
            responseToFront(err, res, result);
        });
    });

    app.get('/all/shops', function(req, res) {
        
        var data = {
            "id" : Number(req.params.id)
        };

        shopsDAO.scanAll(function(err, result){
            responseToFront(err, res, result);
        });
    });

    /* ###################### POST OPERATIONS ###################### */

    app.post('/shops', function(req, res) {
        
        var data = req.body;
        var connectionFactoryDynamo = app.infra.connectionFactoryDynamo();
        var shopsDAO = new app.infra.ShopDAO(connectionFactoryDynamo);
        
        if (typeof(data.action) != "undefined") {
            
            if(data.action === "add") {
                delete data.action;
                shopsDAO.add(data, function(err, result){
                    responseToFront(err, res, result);
                });
            } 

            else if(data.action === "edit") {
                delete data.action;
                shopsDAO.edit(data, function(err, result){
                    responseToFront(err, res, result);
                });
            } 
            
            else if(data.action === "delete") {
                delete data.action;
                shopsDAO.delete(data, function(err, result){
                    responseToFront(err, res, result);
                });
            }
        }
        else {
            console.error("Unable to take an action!");
            res.status(403).send({ success: false, message: "Unable to take an action!"});
        }
    });

    responseToFront = function(err, res, result){
        if (err) {
            console.error("Operation performed with error. Error JSON:", JSON.stringify(err, null, 2));
            res.status(403).send({ success: false, message: "Operation performed with error. Error JSON:"+ JSON.stringify(err, null, 2)});
        } else {
            console.log("Operation performed successfully");
            res.json(result);
        }
    };
}