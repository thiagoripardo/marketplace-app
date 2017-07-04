/*
                            README
                            
    The Json format for a Mission is:
    
    {
        id: <integer>         #p_key

        membersAssigned: <int>
        finished: <boolean>
    
        frontEndInfo: {
            name: <string>
            photoId: <integer>
            ownerEmail: <string>
            description: <string>
            requires: <string>
            client: <string>
            exp: <integer>
            rewards: <string>
            
            owner: Adventurer
            
            missionStatus: {
                expirationDate: <string>
                partyLimit: <int>
            }
        }
    }
    
*/

var hash = require('string-hash');
var toDatetime = require('./mySqlDatetime.js');
var sumDateTime = require('./datetimeSum.js');

function MissionsDAO(connection){
    this._connection = connection;
}

/*  frontEndInfo: {
            name: <string>
            photoId: <integer>
            ownerEmail: <string>
            description: <string>
            requires: <string>
            client: <string>
            exp: <integer>
            rewards: <string>
            
            owner: Adventurer
            
            missionStatus: {
                expirationDate: <string>
                partyLimit: <int>
            }
        }
*/

MissionsDAO.prototype.add = function(frontEndInfo, callback){
    
    var missionId = hash(frontEndInfo.name);
    
    var missionAdd = {
        id: missionId,
        membersAssigned: 0,
        finished: 0,
        info: frontEndInfo
    };
        
    //--------------- DYNAMO DB VERSION --------------------------
    //Change code bellow if you want to use another cloud server
    
    var client = this._connection;
    
    var table = "Missions";
    
    var addDynamo = {
        TableName: table,
        Item: missionAdd
    };
        
    client.put(addDynamo, callback);
    //-------------------------------------------------------------------
}

/*  frontEndInfo: {
            name: <string>          #generate key
            photoId: <integer>
            ownerEmail: <string>
            description: <string>
            requires: <string>
            client: <string>
            exp: <integer>
            rewards: <string>
            
            owner: Adventurer
            
            missionStatus: {
                expirationDate: <string>
                partyLimit: <int>
            }
            
            nameOld: <string>       #need to be deleted
        }
*/

MissionsDAO.prototype.edit = function(data, callback) {
    var missionId;
    
    if(data.frontEndInfo.nameOld != undefined) {
        missionId = hash(data.frontEndInfo.nameOld);
        delete data.frontEndInfo.name_old;
    } else {
        missionId = hash(data.frontEndInfo.name);
    }
    
    var newId = hash(data.frontEndInfo.name);

    //--------------- DYNAMO DB VERSION --------------------------
    //Change code bellow if you want to use another cloud server
    
    var client = this._connection;
    var table = "Missions";
    
    var editDynamo= {
        TableName: table,
        Key: {
            id: missionId
        },
        UpdateExpression: "set id = :id, info = :info",
        ExpressionAttributeValues: {
            ":id" : newId,
            ":info" : data.frontEndInfo
        },
        
        ReturnValues:"UPDATED_NEW"
    };
        
    client.update(editDynamo, callback);
}

MissionsDAO.prototype.delete = function(data, callback){
    var missionId = hash(data.name);
    
    //--------------- DYNAMO DB VERSION --------------------------
    //Change code bellow if you want to use another cloud server
    
    var client = this._connection;
    var table = "Missions";
    
    var delDynamo = {
        TableName: table,
        Key: {
            id: missionId
        }
    };
        
    client.delete(delDynamo, callback);
}

MissionsDAO.prototype.get = function(data, callback){
    var missionId = hash(data.name);
    
    //--------------- DYNAMO DB VERSION --------------------------
    //Change code bellow if you want to use another cloud server
    
    var client = this._connection;
    var table = "Missions";
    
    var getDynamo = {
        TableName : table,
        KeyConditionExpression: "#id = :id",
        ExpressionAttributeNames:{
            "#id": "id"
        },
        ExpressionAttributeValues: {
            ":id": missionId
        }
    };

    client.query(getDynamo, callback);
}

/*  data: {
        name: <string>
        action: <string>
    }
*/

MissionsDAO.prototype.party = function(data, callback) {

    //var missionId = hash(missionBasicInfo.name);
    var result = false;
    
    this.get(data.name, function(err, mission) {
        if (!err) {
            var expirationDateSum = sumDateTime(mission.info.missionStatus.expirationDate);
            var now = new Date(); 
            var actualDateSum = sumDateTime(now);
            
            if(actualDateSum < expirationDateSum) {
                if(data.action === "assign") {
                    if(mission.membersAssigned < mission.info.missionStatus.partyLimit) {
                        mission.membersAssigned += 1;
                        result = true;
                    }
                }
                if(data.action === "unassign") {
                    if(mission.membersAssigned < mission.info.missionStatus.partyLimit) {
                        mission.membersAssigned -= 1;
                        result = true;
                    }
                }
            }
        }
    });
    
    callback(result);
}
    
    /*//--------------- DYNAMO DB VERSION --------------------------
    //Change code bellow if you want to use another cloud server

    var client = this._connection;
    var table = "Missions";
    
    var assignDynamo= {
        TableName: table,
        Key: {
            id: missionId
        },
        UpdateExpression: "set info.membersAssigned = :membersAssigned",
        ExpressionAttributeValues: {
            "membersAssigned": assigned
        },
        ReturnValues:"UPDATED_NEW"
    };
        
    client.update(assignDynamo, callback);
}*/

/*  data: {
        name: <string>
    }
*/

MissionsDAO.prototype.finish = function(data, callback) {
    //var missionId = hash(data.name);
    var result = false;
    
    this.get(data.name, function(err, mission) {
        if (!err) {
            mission.finished = 1;
            result = true;
        }
    })
    
    callback(result)

    //--------------- DYNAMO DB VERSION --------------------------
    //Change code bellow if you want to use another cloud server
    
    /*var client = this._connection;
    var table = "Missions";
    
    var editDynamo= {
        TableName: table,
        Key: {
            id: missionId
        },
        
        UpdateExpression: "set finished = :finished",
        ExpressionAttributeValues: {
            ":finished" : 1
        },
        
        ReturnValues:"UPDATED_NEW"
    };
        
    client.update(editDynamo, callback);*/
}
/*  data: {
        name: <string>
    }
*/

MissionsDAO.prototype.isFinished = function(data, callback) {
    this.get(data.name, function(err, mission) {
        if(!err) {
            if (mission.finished == 0) {
                callback(false);
            } else {
                callback(true);
            }
        }
    });
}

/*
    data: {
        adventurerId: <integer>
    }
*/

MissionsDAO.prototype.getFromUser = function(data, callback) {
    //--------------- DYNAMO DB VERSION --------------------------
    //Change code bellow if you want to use another cloud server
    
    var client = this._connection;
    var table = "Missions";
    
    var getDynamo = {
        TableName : table,
        KeyConditionExpression: "#owner.id = :id",
        ExpressionAttributeNames:{
            "#owner.id": "id"
        },
        ExpressionAttributeValues: {
            ":id": data.adventurerId
        }
    };
    
    var result = [];

    client.scan(getDynamo, onScan);
    
    function onScan(err, missions) {
        if(!err) {
            result.concat(missions.Items);
        }
        
        // continue scanning if we have more movies, because
        // scan can retrieve a maximum of 1MB of data
        
        if (typeof missions.LastEvaluatedKey != "undefined") {
            missions.ExclusiveStartKey = missions.LastEvaluatedKey;
            client.scan(getDynamo, onScan);
        }
    }
    
    callback(result);
}

MissionsDAO.prototype.getAll = function(callback) {
    //--------------- DYNAMO DB VERSION --------------------------
    //Change code bellow if you want to use another cloud server
    
    var client = this._connection;
    var table = "Missions";
    
    var getDynamo = {
        TableName : table
    };
    
    var result = [];

    client.scan(getDynamo, onScan);
    
    function onScan(err, missions) {
        if(!err) {
            result.concat(missions.Items);
        }
        
        // continue scanning if we have more movies, because
        // scan can retrieve a maximum of 1MB of data
        
        if (typeof missions.LastEvaluatedKey != "undefined") {
            missions.ExclusiveStartKey = missions.LastEvaluatedKey;
            client.scan(getDynamo, onScan);
        }
    }
    
    callback(result);
}

module.exports = function(){
    return MissionsDAO;
}