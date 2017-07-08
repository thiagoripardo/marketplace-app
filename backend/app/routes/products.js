// ja esta carregado var connectionFactory = require('../infra/connectionFactory');

module.exports = function(app){
    var auth = require('../infra/isLoggedIn');

    /* ###################### GET ###################### */
    app.get('/shops/products/:ownerstore/', function(req, res) {
        
        var data = {
            "ownerstore" : Number(req.params.ownerstore)
        };
        console.log(req.params);
        var connectionFactoryDynamo = app.infra.connectionFactoryDynamo();
        var productsDAO = new app.infra.ProductsDAO(connectionFactoryDynamo);

        productsDAO.scan(data, function(err, result){
            responseToFront(err, res, result);
        });
    });

    app.get('/shops/products/info/:id/', function(req, res) {
        
        var data = {
            "id" : Number(req.params.id)
        };
        console.log(req.params);
        var connectionFactoryDynamo = app.infra.connectionFactoryDynamo();
        var productsDAO = new app.infra.ProductsDAO(connectionFactoryDynamo);

        productsDAO.get(data, function(err, result){
            responseToFront(err, res, result);
        });
    });
    
    /* ###################### POST ###################### */

    app.post('/shops/products', function(req, res) {
        
        var data = req.body;
        var connectionFactoryDynamo = app.infra.connectionFactoryDynamo();
        var productsDAO = new app.infra.ProductsDAO(connectionFactoryDynamo);
        
        if (typeof(data.action) != "undefined") {
            
            if(data.action === "add") {
                delete data.action;
                productsDAO.add(data, function(err, result){
                    responseToFront(err, res, result);
                });
            } 

            else if(data.action === "scan") {
                delete data.action;
                productsDAO.scan(data, function(err, result){
                    responseToFront(err, res, result);
                });
            } 
            
            else if(data.action === "scanAll") {
                delete data.action;
                productsDAO.scanAll(data, function(err, result){
                    responseToFront(err, res, result);
                });
            }

            else if(data.action === "edit") {
                delete data.action;
                productsDAO.edit(data, function(err, result){
                    responseToFront(err, res, result);
                });
            } 
            
            else if(data.action === "delete") {
                delete data.action;
                productsDAO.delete(data, function(err, result){
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