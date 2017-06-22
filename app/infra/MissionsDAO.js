/*
                            README
                            
    The Json format for a Mission is:
    
    {
        id: <integer>         #p_key
        
        #TO GENERATE KEY
        Hash(name + ownerEmail)

        info: {
            name: <string>
            photoId: <integer>
            ownerEmail: <string>
            description: <string>
            requires: <string>
            client: <string>
            members_count: <integer>
            exp: <integer>
            rewards: <string>
        }
    }
    
*/

var hash = require('string-hash');

function MissionsDAO(connection){
    this._connection = connection;
}

/*  In the method bellow, the mobile application will send a json file has
    information by post command. The format send by mobile needs to be
    completed to turn in a Adventurer json.
*/

MissionsDAO.prototype.add = function(missionBasicInfo, callback){
    
    var info = missionBasicInfo;
    var missionId = hash(info.name+info.ownerEmail);
    console.log(missionId);
    //delete info.email;
    
    var mission = {
        id: missionId,
        info: info
    };
        
    //--------------- DYNAMO DB VERSION --------------------------
    //Change code bellow if you want to use another cloud server
    
    var client = this._connection;
    
    var table = "Missions";
    
    var params = {
        TableName: table,
        Item: mission
    };
        
    client.put(params, callback);
    //-------------------------------------------------------------------
}

/*  Basic info:
    {
        "name": <string>
        "photo_id": <integer>
        "descript": <string>
        "skills": <string>
    }
*/

MissionsDAO.prototype.edit = function(missionBasicInfo, callback){
    var info = missionBasicInfo;
    
    var name = info.name;
    var photoId = info.photoId;
    var description = info.descript;
    var ownerEmail = info.ownerEmail;
    var requires = info.requires;
    var client = info.client;
    var membersCount = info.membersCount;
    var exp = info.exp;
    var rewards = info.rewards;
    
    var missionId = hash(info.name+info.ownerEmail);
    
    //--------------- DYNAMO DB VERSION --------------------------
    //Change code bellow if you want to use another cloud server
    
    var client = this._connection;
    var table = "Missions";
    
    var params= {
        TableName: table,
        Key: {
            id: missionId
        },
        UpdateExpression: "set info.name = :name, info.photoId = :photoId, info.descript = :description, info.requires = :requires, info.client = :client, info.membersCount = :membersCount, info.exp = :exp, info.rewards = :rewards",
        ExpressionAttributeValues: {
            "name" : name,
            "photoId" : photoId,
            "description" : description,
            "requires" : requires,
            "client" : client,
            "membersCount" : membersCount,
            "exp" : exp,
            "rewards" : rewards
        },
        ReturnValues:"UPDATED_NEW"
    };
        
    client.update(params, callback);
}

MissionsDAO.prototype.delete = function(missionBasicInfo, callback){
    var info = missionBasicInfo;
    var missionId = hash(info.name+info.ownerEmail);
    
    //--------------- DYNAMO DB VERSION --------------------------
    //Change code bellow if you want to use another cloud server
    
    var client = this._connection;
    var table = "Missions";
    
    var params = {
        TableName: table,
        Key: {
            id: missionId
        }
    };
        
    client.update.delete(params, callback);
}

MissionsDAO.prototype.get = function(missionBasicInfo, callback){
    var info = missionBasicInfo;
    var missionId = hash(info.name+info.ownerEmail);
    
    //--------------- DYNAMO DB VERSION --------------------------
    //Change code bellow if you want to use another cloud server
    
    var client = this._connection;
    var table = "Missions";
    
    var params = {
        TableName : table,
        KeyConditionExpression: "#id = :id",
        ExpressionAttributeNames:{
            "#id": "id"
        },
        ExpressionAttributeValues: {
            ":id": missionId
        }
    };

    client.query(params, callback);
}

module.exports = function(){
    return MissionsDAO;
}