/*
                            README
                            
    The Json format for a Adventurer is:
    
    {
        id: <integer>         #p_key
        
        local: {
            password: <string>
            email: <string>
        }
        
        level: <integer>
        exp: <integer>
        expCharge: <integer>
        
        missionFinished: [ Mission(Json) ]
        missionDoing: [ Mission(Json) ]
                
        achievements: [ Achievement(Json) ]   #id of achievements
        
        frontendInfo: {
                name: <string>
                photo_id: <integer>
                description: <string>
                skills: <string>
        }
    }
    
    PS: For creating an object of type Adventurer in mobile aplication Ionic,
    the programer must only send these informations separated by tabulation.
    (name, description, photo_id and skills). The other informations will be made by 
    this script.
    PS2: Edit command in Ionic can only change name, description, photo_id and skills.
    
    PS3: The client Ionic will send this json format by adding an Adventurer, and it'll
    be store in frontendInfo field:
    
    {
        name: <string>
        photo_id: <integer>
        descript: <string>
        skills: <string>
    }
*/

var hash = require('string-hash');

function AdventurersDAO(connection){
    this._connection = connection;
}

/*  In the methods bellow, the mobile application will send a json file has
    information by post command. The format send by mobile needs to be
    completed to turn in a Adventurer json. Above each method, the json
    structure used with the info parameter is described. Please use exactly
    that structure with the methods.
*/

/*  info: {
        id: <integer>,
        
        local: {
            password: <string>,
            email: <string>
        }
        
        frontendInfo: {
            name: <string>,
            photo_id: <integer>,
            description: <string>,
            skills: <string>
        }
    }
    
*/

AdventurersDAO.prototype.add = function(info, callback) {
    
    var missionF = new Array();
    var missionD = new Array();
    var achievements = new Array();
    
    var adventurer =
        {
            id: info.id,
            localNR: info.localNR,
            levelNR: 0,
            exp: 0,
            expCharge: 10,
            missionFinished: missionF,
            missionDoing: missionD,
            achievements: achievements,
            
            frontendInfo: info.frontendInfo
        };
        
    //--------------- DYNAMO DB VERSION --------------------------
    //Change code bellow if you want to use another cloud server
    
    var client = this._connection;
    
    var table = "Adventurers";
    
    var addDynamo =
        {
            TableName: table,
            Item: adventurer
        };
    
    client.put(addDynamo, callback);
    //-------------------------------------------------------------------
}

/*  info: {
        id: <integer>,
        
        frontendInfo:
        {
            name: <string>
            photo_id: <integer>
            descript: <string>
            skills: <string>
        }
    }
*/

AdventurersDAO.prototype.edit = function(info, callback){
    /*var name = info.name;
    var photo_id = info.photo_id;
    var description = info.descript;
    var skills = info.skills;*/
    
    //var adventurer_id = request.id;
    
    //--------------- DYNAMO DB VERSION --------------------------
    //Change code bellow if you want to use another cloud server
    
    var client = this._connection;
    var table = "Adventurers";
    
    var updateDynamo =
        {
            TableName: table,
            Key: 
            {
                id: info.id
            },
            UpdateExpression: "set frontendInfo = :info",
            ExpressionAttributeValues:
            {
                ":info": info.frontendInfo
            },
            ReturnValues:"UPDATED_NEW"
        };
        
    client.update(updateDynamo, callback);
}

AdventurersDAO.prototype.refresh = function(adventurer, callback){
    //--------------- DYNAMO DB VERSION --------------------------
    //Change code bellow if you want to use another cloud server
    
    var client = this._connection;
    var table = "Adventurers";
    
    var updateDynamo =
        {
            TableName: table,
            Key: 
            {
                id: adventurer.id
            },
            UpdateExpression: "set localNR = :localNR, levelNR = :levelNR, exp = :exp, expCharge = :expCharge, missionFinished = :missionFinished, missionDoing = :missionDoing , achievements = :achievements, frontendInfo = :frontendInfo",
            ExpressionAttributeValues:
            {
                ":localNR": adventurer.localNR,
                ":levelNR": adventurer.levelNR,
                ":exp": adventurer.exp,
                ":expCharge": adventurer.expCharge,
                ":missionFinished": adventurer.missionFinished,
                ":missionDoing": adventurer.missionDoing,
                ":achievements": adventurer.achievements,
                ":frontendInfo": adventurer.frontendInfo
            },
            ReturnValues:"UPDATED_NEW"
        };
        
    client.update(updateDynamo, callback);
}

/*  info: {
        id: <integer>
    }
*/

AdventurersDAO.prototype.delete = function(info, callback){
    //--------------- DYNAMO DB VERSION --------------------------
    //Change code bellow if you want to use another cloud server
    
    var client = this._connection;
    var table = "Adventurers";
    
    var delDynamo =
        {
            TableName: table,
            Key: 
            {
                id: info.id
            }
        };
        
    client.delete(delDynamo, callback);
}

AdventurersDAO.prototype.get = function(info, callback){
    //--------------- DYNAMO DB VERSION --------------------------
    //Change code bellow if you want to use another cloud server
    
    var client = this._connection;
    var table = "Adventurers";
    
    var getDynamo = 
    {
        TableName : table,
        KeyConditionExpression: "#id = :id",
        ExpressionAttributeNames:{
            "#id": "id"
        },
        ExpressionAttributeValues: {
            ":id": info.id
        }
    };

    client.query(getDynamo, callback);
}

/*  LevelUp function: round( 1/5 * (5 * level + level^2 ))  -> to level 1: 1 ; to level 99: 2059
*/

/*  info: {
        id,
        xp_gain
    }
*/

AdventurersDAO.prototype.gainExp = function(info, callback) {
    var xp_gain = info.xp_gain;
    var xp_gain_mem = xp_gain;
    delete info.xp_gain;
    
    var exp;
    var level;
    var result;
    
    this.get(info, function(err, adventurers) {
        if(!err) {
            var adventurer = adventurers.Items[0];
            
            exp = adventurer.exp;
            level = adventurer.levelNR;
            var to_next = Math.round( 1/5 * (5 * level + level^2 ));
            
            while(true) {
                if(exp + xp_gain < to_next) {
                    exp += xp_gain;
                    break;
                }
                else {
                    exp = to_next;
                    xp_gain -= to_next;
                    
                    if(level < 99) {
                        level += 1;
                        to_next = Math.round( 1/5 * (5 * level + level^2 ));
                    }
                    else {
                        to_next = 999999;
                    }
                }
            }
            
            adventurer.exp += xp_gain_mem;
            adventurer.levelNR = level;
            result = adventurer;
        }
        
        callback(result);
    });
        
        /*
    //--------------- DYNAMO DB VERSION --------------------------
    //Change code bellow if you want to use another cloud server
    
    var client = this._connection;
    var table = "Adventurers";
    
    var dynamodb_json_upd =
        {
            TableName: table,
            Key: 
            {
                id: adventurerId
            },
            UpdateExpression: "set exp = :exp, level = :level",
            ExpressionAttributeValues:
            {
                ":exp": exp,
                ":level": level
            },
            ReturnValues:"UPDATED_NEW"
        };
    
    client.update(dynamodb_json_upd, callback);*/
}

/*
    missionInfo: {
        adventurerId: <integer>
        
        nameOld: <string>
        name: <string>
        
        finished: <boolean> (0 or 1)
    }
    
    
    missions:
    {
        finished: [ <integer> ]  
        doing: [ <integer> ]    
    }
*/

/*AdventurersDAO.prototype.changeMissionId = function(missionInfo, callback)
{
    var missionId = hash(missionInfo.nameOld);
    var missionIdNew = hash(missionInfo.name);
    var err =true;
    
    if(missionInfo.finished === 0) {
        this.getFromMission(missionInfo.adventurerId, function(adventurer) {
            adventurer.missions.finished.forEach(function(mission) {
                if(mission.id === missionId) {
                    mission.id = missionIdNew;
                    err = false;
                }
            })
        });
    } else {
        this.getFromMission(missionInfo.adventurerId, function(adventurer) {
            adventurer.missions.doing.forEach(function(mission) {
                if(mission.id === missionId) {
                    mission.id = missionIdNew;
                    err = false;
                }
            })
        });
    }
    
    callback(err);
}*/

/*AdventurersDAO.prototype.flushMissions = function(adventurerId, callback)
{
    var affected=false;
    
    this.get(adventurerId, function(err, adventurer) {
        if(!err) {
            adventurer.missions.finished.forEach(function(missionFinished) {
                if(missionFinished === undefined) {
                    adventurer.missions.finished.pop(missionFinished);
                    affected = true;
                }
            })
            
            adventurer.missions.doing.forEach(function(missionDoing) {
                if(missionDoing === undefined) {
                    adventurer.missions.doing.pop(missionDoing);
                    affected = true;
                }
            })
        }
    })
    
    callback(affected);
}*/

/*  info: {
        id: <integer> (adventurer)
        mission: Mission(Json)
        action: <string> (assign or unassign)
    }
*/

AdventurersDAO.prototype.missionParty = function(info, callback) {
    var result;
    
    this.get(info, function(err, adventurer) {
        //console.log( JSON.stringify(adventurer.missions, null, 2));
        
        if(!err) {
            if(info.action === "assign") {
                adventurer.missionDoing.push(info.mission);
            }
            if(info.action === "unassign") {
                var index = adventurer.missionDoing.indexOf(info.mission)
                adventurer.missionDoing.splice(index, 1);
            }
        }
        
        result = adventurer;
        
        callback(result);
    })
}

/*  info: {
        id: <integer> (adventurer)
        mission: Mission(Json)
    }
*/

AdventurersDAO.prototype.finishMission = function(info, callback) {
    var result;
    
    this.get(info, function(err, adventurer) {
        if(!err) {
            var index = adventurer.missionDoing.indexOf(info.mission)
            adventurer.missionDoing.splice(index, 1);
            
            adventurer.missionFinished.push(info.mission);
        }
        result = adventurer;
        callback(result);
    })
}

/*  info: {
        id: <integer> (adventurer)
        amount: <integer>
    }
*/
AdventurersDAO.prototype.useExpCharges = function(info, callback) {
    var amount = info.amount;
    var result;
    
    this.get(info, function(err, adventurer) {
        if(!err) {
            if(adventurer.expCharge >= amount) {
                adventurer.expCharge -= amount;
            }
        }
        
        result = adventurer;
        callback(result);
    });
}
    /*    
    //--------------- DYNAMO DB VERSION --------------------------
    //Change code bellow if you want to use another cloud server
    
    if(changed) {
        var client = this._connection;
        var table = "Adventurers";
        
        var dynamodb_json_upd =
            {
                TableName: table,
                Key: 
                {
                    id: adventurerId
                },
                UpdateExpression: "set expCharge = :expCharge",
                ExpressionAttributeValues:
                {
                    ":expCharge": expCharges
                },
                ReturnValues:"UPDATED_NEW"
            };
        
        client.update(dynamodb_json_upd, function(err, result) {
            if(err) {
                changed = false;
            }
        });
    }
    
    callback(changed);
}*/

/*  info: {
        id: <integer> (adventurer)
        achievement: Achievement(Json)
    }
*/

AdventurersDAO.prototype.gainAchievement = function(info, callback) {
    var result;
    
    this.get(info, function(err, adventurer) {
        if(!err) {
            adventurer.achievement.push(info.achievement);
        }
        result = adventurer;
        
        callback(result);
    })
}

module.exports = function(){
    return AdventurersDAO;
}

