// ja esta carregado var connectionFactory = require('../infra/connectionFactory');

module.exports = function(app){
    var auth = require('../infra/isLoggedIn');

    /* ###################### GET ###################### */
    /*app.get('/adventurers', function(req, res) {
        
        var connectionFactoryDynamo = app.infra.connectionFactoryDynamo();
        var adventurersDAO = new app.infra.AdventurersDAO(connectionFactoryDynamo);
        
        res.end();
        //connection.end();
    });*/
    
    /* ###################### POST ###################### */
    
    /*  The Json format for a Adventurer is:
    
    {
        id: <integer>         #p_key
        
        _local: {
            password: <string>
            email: <string>
        }
        
        _level: <integer>
        exp: <integer>
        expCharge: <integer>
        missions: {
                finished: [ Mission(Json) ]   #id of mission
                doing: [ Mission(Json) ]   #id of mission
        }
        achievements: [ Achievement(Json) ]   #id of achievements
        
        frontendInfo: {
                name: <string>
                photo_id: <integer>
                description: <string>
                skills: <string>
        }
    }
    
    */
    
    /*  In the method bellow, the mobile application will send a json file has
    information by post command. The format send by mobile needs to be
    completed to turn in a Adventurer json. Above each method, the json
    structure used with the info parameter is described. Please use exactly
    that structure with the methods.
    */
    
    app.post('/adventurers', function(req, res) {
        
        var data = req.body;
        
        var connectionFactoryDynamo = app.infra.connectionFactoryDynamo();
        var adventurersDAO = new app.infra.AdventurersDAO(connectionFactoryDynamo);
        
        if (typeof(data.action) != "undefined") {
            
            // ------------------------------------------------------------------------------------------
            //                                          ADD
            /*  data: {
                    id: <integer>,
        
                    local: {
                        password: <string>,
                        email: <string>
                    },
                    
                    frontendInfo: {
                        name: <string>,
                        photo_id: <integer>,
                        description: <string>,
                        skills: <string>
                    },
                    
                    action : 'add'
                }
            */
            
            if(data.action === "add") {
                delete data.action;
                adventurersDAO.add(data, function(err, result){
                    if (err) {
                        console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
                    } else {
                        console.log("Add Item succeeded:");
                        res.json(result);
                    }
                });
            } 
            
            // ------------------------------------------------------------------------------------------
            //                                      GET
            
            /*data: {
                    id: <integer>,
                    action: 'get'
                }
            */
            
            else if(data.action === "get") {
                delete data.action;
                adventurersDAO.get(data, function(err, result){
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
            
            // ------------------------------------------------------------------------------------------
            //                                      EDIT
            
            /*  data: {
                    id: <integer>,
                    
                    frontendInfo:
                    {
                        name: <string>
                        photo_id: <integer>
                        descript: <string>
                        skills: <string>
                    },
                    
                    action: 'edit'
                }
            */
            else if(data.action === "edit") {
                delete data.action;
                adventurersDAO.edit(data, function(err, result){
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
            
            // ------------------------------------------------------------------------------------------
            //                                      DELETE
            /*  data: {
                    id: <integer>,
                    action: 'delete'
                }
            */
            else if(data.action === "delete") {
                delete data.action;
                adventurersDAO.delete(data, function(err, result){
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
            
            // ------------------------------------------------------------------------------------------
            //                                      GAINEXP
            
            /*  data: {
                    id: <integer>,
                    xp_gain: <integer>,
                    action: 'gainExp'
                }
            */
            
            else if(data.action === "gainExp") {
                delete data.action;

                adventurersDAO.gainExp(data, function(result) {
                    //console.log(JSON.stringify(result, null, 2))
                    adventurersDAO.refresh(result, function(err, finish) {
                        if (err) {
                            console.error("Unable to edit item. Error JSON:", JSON.stringify(err, null, 2));
                        } else {
                            console.log("Edit Item succeeded:");
                            delete data.Count;
                            delete data.ScannedCount;
                            res.json(finish);
                        }
                    })
                })
            }
            
            // ------------------------------------------------------------------------------------------
            //                              ASSIGN OR UNASSIGN

            /*  data: {
                    id: <integer> (adventurer)
                    mission: Mission(Json),
                    action: <string> (assign or unassign)
                }
                
                IMPORTANT: in front end this action needs to be executed 
                together the (un)assign actions of missions route
            */
            else if(data.action === "assign" || data.action === "unassign"){
                
                adventurersDAO.missionParty(data, function(result) {
                    adventurersDAO.refresh(result, function(err, finish) {
                        if (err) {
                            console.error("Unable to edit item. Error JSON:", JSON.stringify(err, null, 2));
                        } else {
                            console.log("Edit Item succeeded:");
                            delete data.Count;
                            delete data.ScannedCount;
                            res.json(finish);
                        }
                    })
                })
            }
            
            // ------------------------------------------------------------------------------------------
            //                                  FINISH MISSION
            
            /*  data: {
                    id: <integer> (adventurer)
                    mission: Mission(Json),
                    action: 'finishMission'
                }
                
                IMPORTANT: in front end this action needs to be executed 
                together the finish action of missions route. Also, gainExp
                needs to be called too.
            */
            else if(data.action === "finishMission") {
                delete data.action;
                
                adventurersDAO.finishMission(data, function(result) {
                    adventurersDAO.refresh(result, function(err, finish) {
                        if (err) {
                            console.error("Unable to edit item. Error JSON:", JSON.stringify(err, null, 2));
                        } else {
                            console.log("Edit Item succeeded:");
                            delete data.Count;
                            delete data.ScannedCount;
                            res.json(finish);
                        }
                    })
                })
            }
            
            // ------------------------------------------------------------------------------------------
            //                              MISSIONXPREWARD
            
            /*  data: {
                    id: <integer> (adventurer)
                    amount: <integer>,
                    action: 'missionXpReward'
                }
                
                IMPORTANT: in front end use this action together the edit or add 
                actions of missions route, to update the exp gained by finishing
                that mission.
            */
            else if(data.action === "missionXpReward") {
                delete data.action;
                
                adventurersDAO.useExpCharges(data, function(result) {
                    adventurersDAO.refresh(result, function(err, finish) {
                        if (err) {
                            console.error("Unable to edit item. Error JSON:", JSON.stringify(err, null, 2));
                        } else {
                            console.log("Edit Item succeeded:");
                            delete data.Count;
                            delete data.ScannedCount;
                            res.json(finish);
                        }
                    })
                })
            }
            
            // ------------------------------------------------------------------------------------------
            //                              GAINACHIEVEMENT
            
            /*  data: {
                    id: <integer> (adventurer)
                    achievement: Achievement(Json),
                    action: gainAchievement
                }
            */
            else if(data.action === "gainAchievement") {
                delete data.action;
                
                adventurersDAO.gainAchievement(data, function(result) {
                    adventurersDAO.refresh(result, function(err, finish) {
                        if (err) {
                            console.error("Unable to edit item. Error JSON:", JSON.stringify(err, null, 2));
                        } else {
                            console.log("Edit Item succeeded:");
                            delete data.Count;
                            delete data.ScannedCount;
                            res.json(finish);
                        }
                    })
                })
            }
            // ------------------------------------------------------------------------------------------
        }
        else {
            console.error("Unable to take an action!");
        }
    });
}