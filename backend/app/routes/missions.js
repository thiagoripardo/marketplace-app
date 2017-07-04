module.exports = function(app){
    var auth = require('../infra/isLoggedIn');

    /* ###################### GET ###################### */
    /*app.get('/missions', function(req, res){
        
        var connectionFactoryDynamo = app.infra.connectionFactoryDynamo();
        var missionsDAO = new app.infra.MissionsDAO(connectionFactoryDynamo);
        
        res.end();
        //connection.end();
    });*/
    
    /* ###################### POST ###################### */
    
    /*  Mission format:
    
    {
        id: <integer>         #p_key

        membersAssigned: <int>
        finished: <boolean>
    
        frontEndInfo: {
            name: <string>
            photoId: <integer>
            description: <string>
            requires: <string>
            exp: <integer>
            rewards: <string>
            
            owner: Adventurer(json)
            
            missionStatus: {
                expirationDate: <string>
                partyLimit: <int>
            }
        }
    }
    */
    
    
    app.post('/missions', function(req, res){
        
        var data = req.body;
        
        var connectionFactoryDynamo = app.infra.connectionFactoryDynamo();
        var missionDAO = new app.infra.MissionsDAO(connectionFactoryDynamo);
        
        if (typeof(data.action) != "undefined") {
            
            // -----------------------------------------------------------------
            //                              ADD
            
            /* data: {
                    name: <string>,
                    photoId: <integer>,
                    ownerEmail: <string>,
                    description: <string>,
                    requires: <string>,
                    client: <string>,
                    exp: <integer>,
                    rewards: <string>,
                    
                    owner: Adventurer(json),
                    
                    missionStatus: {
                        expirationDate: <string> (format: 'YYYY/MM/DD HH:MM:SS'),
                        partyLimit: <int>
                    },
                    
                    action: 'add'
                }
            */
            if(data.action === "add"){
                delete data.action;
                missionDAO.add(data, function(err, result){
                    if (err) {
                        console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
                    } else {
                        console.log("Add Item succeeded:");
                        res.json(result);
                    }
                });
            } 
            
            // -----------------------------------------------------------------
            //                              GET
            /*  data: {
                    name: <string>,
                    action: 'get'
                }
            */
            else if(data.action === "get"){
                delete data.action;
                missionDAO.get(data, function(err, result){
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
            
            // -----------------------------------------------------------------
            //                              EDIT
            /* data: {
                    name: <string>,                 (the new name if name changed)
                    photoId: <integer>,
                    ownerEmail: <string>,
                    description: <string>,
                    requires: <string>,
                    client: <string>,
                    exp: <integer>,
                    rewards: <string>,
                    
                    owner: Adventurer(json),
                    
                    missionStatus: {
                        expirationDate: <string> (format: 'YYYY/MM/DD HH:MM:SS'),
                        partyLimit: <int>
                    },
                    
                    nameOld: <string>,              (the previous name if name changed) #can be undefined
                    
                    action: 'edit'
                }
            */
            else if(data.action === "edit") {
                delete data.action;
                /*var nameOld = null;
                
                if(data.nameOld != undefined) {
                    nameOld = data.nameOld;
                }*/
                
                missionDAO.edit(data, function(err, result){
                    if (err) {
                        console.error("Unable to edit item. Error JSON:", JSON.stringify(err, null, 2));
                    } else {
                        console.log("Edit Item succeeded:");
                        delete data.Count;
                        delete data.ScannedCount;
                        res.json(result);
                    }
                });
                        /*adventurersDAO.getFromMission(mission.id, function(finished, doing) {
                            finished.forEach(function(adventurerFinished) {
                                var missionInfo = {
                                    adventurerId: adventurerFinished.id,
                                    nameOld: data.name,
                                    name: mission.name,
                                    finished: 1
                                }
                                
                                adventurersDAO.changeMissionId(missionInfo, function(err) {
                                    if(err) {
                                        console.log("Unable to change missionId: " + missionInfo.name + " at list, Mission Finished.");
                                    }
                                })
                            })
                            
                            doing.forEach(function(adventurerDoing) {
                                var missionInfo = {
                                    adventurerId: adventurerDoing.id,
                                    nameOld: data.name,
                                    name: mission.name,
                                    finished: 0
                                }
                                
                                adventurersDAO.changeMissionId(missionInfo, function(err) {
                                    if(err) {
                                        console.log("Unable to change missionId: " + missionInfo.name + " at list, Mission Doing.");
                                    }
                                })
                            })
                        })*/
            } 
            
            // -----------------------------------------------------------------
            //                              DELETE
            /*  data: {
                    name: <string>,
                    action: 'delete'
                }
            */
            else if(data.action === "delete"){
                delete data.action;
                missionDAO.delete(data, function(err, result){
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
            
            /*  data: {
                    name: <string>
                    action: 'assign' or 'unassign'
                }

            */
            else if(data.action === "assign" || data.action === "unassign"){
                missionDAO.party(data, function(result) {
                    res.json(result);
                })
            }
            
            /*  data: {
                    name: <string>
                    action: 'finish'
                }
            */
            else if(data.action === "finish"){
                delete data.action;
                missionDAO.finish(data, function(result) {
                    res.json(result);
                })
            }
            
            /*  data: {
                    name: <string>
                    action: 'isFinished'
                }
            */
            else if(data.action === "isFinished"){
                delete data.action;
                missionDAO.finish(data, function(result) {
                    res.json(result);
                })
            }
            /*
                data: {
                    adventurerId: <integer>,
                    action: 'getMissions'
                }
            */
            else if(data.action === "getMissions") {
                delete data.action;
                missionDAO.getFromUser(data, function(result) {
                    res.json(result);
                })
            }
            
            /*
                data: {
                    action: 'getMissions'
                }
            */
            else if(data.action === "getAll") {
                delete data.action;
                missionDAO.getAll(function(result) {
                    res.json(result);
                })
            }
            
        }
        else{
            console.error("Unable to take an action!");
        }
    });
}