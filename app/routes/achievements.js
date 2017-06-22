module.exports = function(app){
    var images = require('../infra/connectionFactoryS3');

    /* ###################### GET ###################### */
    app.get('/achievements', function(req, res){
        
        var connectionFactoryDynamo = app.infra.connectionFactoryDynamo();
        var achievementsDAO = new app.infra.AchievementsDAO(connectionFactoryDynamo);
        
        res.end();
        //connection.end();
    });
    
    /* ###################### POST ###################### */
    app.post('/achievements', function(req, res){
        
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
                achievementsDAO.add(data, function(err, result){
                    if (err) {
                        console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
                    } else {
                        console.log("Added item:", JSON.stringify(data, null, 2));
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
                achievementsDAO.get(data, function(err, data){
                    if (err) {
                        console.error("Unable to find item. Error JSON:", JSON.stringify(err, null, 2));
                    } else {
                        console.log("FindItem succeeded:");
                        delete data.Count;
                        delete data.ScannedCount;
                        
                        //console.log(JSON.stringify(data, null, 2));
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
            else if(data.action === "edit"){
                delete data.action;
                achievementsDAO.edit(data, function(err, data) {
                    if (err) {
                        console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
                    } else {
                        console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
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
                achievementsDAO.delete(data, function(err, data) {
                    if (err) {
                        console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
                    } else {
                        console.log("DeleteItem succeeded:", JSON.stringify(data, null, 2));
                    }
                });
            }
        }
        else{
            console.error("Unable to take an action!");
        }
    });
}