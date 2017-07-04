module.exports = function(app){
    var auth = require('../infra/isLoggedIn');

    /* ###################### GET ###################### */
    /*app.get('/achievements', function(req, res){
        
        var connectionFactoryDynamo = app.infra.connectionFactoryDynamo();
        var achievementsDAO = new app.infra.AchievementsDAO(connectionFactoryDynamo);
        res.end();
        //connection.end();
    });*/
    
    /* ###################### POST ###################### */
    app.post('/achievements', auth.isLoggedIn, function(req, res){
        
        var data = req.body;
        
        var connectionFactoryDynamo = app.infra.connectionFactoryDynamo();
        var achievementsDAO = new app.infra.AchievementsDAO(connectionFactoryDynamo);

        if (typeof(data.action) != "undefined"){
            /*  Para adicionar um novo usuário
            
                var result = 
                {
                    name : <string>,
                    photo_id : <string>,
                    description : <string>,
                    skills : <string>,
                    email : <string>,
                    action : 'add'
                }
            
            */
            if(data.action === "add"){
                delete data.action;
                achievementsDAO.add(data, function(err, result) {
                    if (err) {
                        console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
                    } else {
                        console.log("Added item:", JSON.stringify(result, null, 2));
                        res.json(result);
                    }
                });
            } 
            /*  Para obter o json do usuário
            
                var result = 
                {
                    email : <string>,
                    action: 'get'
                }
            
            */
            else if(data.action === "get"){
                delete data.action;
                achievementsDAO.get(data, function(err, result){
                    if (err) {
                        console.error("Unable to get item. Error JSON:", JSON.stringify(err, null, 2));
                    } else {
                        console.log("Get Item succeeded:");
                        delete data.Count;
                        delete data.ScannedCount;
                        res.json(result);
                    }
                });
            } 
            /*  Para editar um usuário
            
                var result = 
                {
                    name : <string>,
                    photo_id : <string>,
                    description : <string>,
                    skills : <string>,
                    email : <string>,
                    action : 'edit'
                }
            
            */
            else if(data.action === "update"){
                delete data.action;
                achievementsDAO.edit(data, function(err, result){
                    if (err) {
                        console.error("Unable to edit item. Error JSON:", JSON.stringify(err, null, 2));
                    } else {
                        console.log("Edit Item succeeded:");
                        delete data.Count;
                        delete data.ScannedCount;
                        res.json(result);
                    }
                });
            } 
            /*  Para deletar o usuário
            
                var result = 
                {
                    email : <string>,
                    action: 'delete'
                }
            
            */
            else if(data.action === "delete"){
                delete data.action;
                achievementsDAO.delete(data, function(err, result){
                    if (err) {
                        console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
                    } else {
                        console.log("Delete Item succeeded:");
                        delete data.Count;
                        delete data.ScannedCount;
                        res.json(result);
                    }
                });
            }
        }
        else{
            console.error("Unable to take an action!");
        }
    });
}