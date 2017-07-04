/*
                            README
                            
    The Json format for a Achievement is:
    
    {
        id: <integer>         #p_key
        rank: [ <integer> ]   #id of achievements/ size 10
        
        frontend_info:
            {
                name: <string> #generate key
                photo_id: <integer>
                description: <string>
                tier: <string>
            }
    }
    
    PS: For creating an object of type Achievement in mobile aplication Ionic,
    the programer must only send these informations separated by tabulation.
    (name, description, photo_id and skills). The other informations will be made by 
    this script.
    PS2: Edit command in Ionic can only change name, description, photo_id and skills.
    
    PS3: The client Ionic will send this json format by adding an achievement, and it'll
    be store in frontend_info field:
    
    {
        name: <string>          #generate key
        photo_id: <integer>
        description: <string>
        tier: <string>
    }
*/

var hash = require('string-hash');

function AchievementsDAO(connection){
    this._connection = connection;
}

/*  In the method bellow, the mobile application will send a json file has
    information by post command. The format send by mobile needs to be
    completed to turn in a achievement json.
*/

AchievementsDAO.prototype.add = function(frontEndInfo, callback){
    
    var achievement =
        {
            id: hash(frontEndInfo.name),
            rank: [],
            info: frontEndInfo
        };
        
    //--------------- DYNAMO DB VERSION --------------------------
    //Change code bellow if you want to use another cloud server
    
    var client = this._connection;
    
    var table = "Achievements";
    
    var addDynamo =
        {
            TableName: table,
            Item: achievement
        };
        
    client.put(addDynamo, callback);
    //-------------------------------------------------------------------
};

/*  Basic info:
    {
        name: <string> #to generate key -> new name
        photo_id: <integer>
        description: <string>
        tier: <string>
        
        nameOld: <string>  #need to be deleted
    }
*/

AchievementsDAO.prototype.edit = function(frontEndInfo, callback){
    //var info = frontEndInfo;
    
    /*var name = info.name_old;
    var new_name = info.name;
    var photo_id = info.photo_id;
    var description = info.descript;
    var tier = info.tier;*/
    
    var achievement_id;
    
    if(frontEndInfo.nameOld != undefined) {
        achievement_id = hash(frontEndInfo.nameOld);
        delete frontEndInfo.name_old;
    } else {
        achievement_id = hash(frontEndInfo.name);
    }
    
    var new_id = hash(frontEndInfo.name);
    
    //--------------- DYNAMO DB VERSION --------------------------
    //Change code bellow if you want to use another cloud server
    
    var client = this._connection;
    var table = "Achievements";
    
    var editDynamo =
        {
            TableName: table,
            Key: 
            {
                id: achievement_id
            },
            /*UpdateExpression: "set id = :id, frontend_info.name = :name, frontend_info.photo_id = :photo_id, frontend_info.descript = :description, frontend_info.tier = :tier",
            ExpressionAttributeValues:
            {
                ":id": new_id,
                
                ":name": new_name,
                ":photo_id": photo_id,
                ":description": description,
                ":tier": tier
            },*/
            UpdateExpression: "set id = :id, info = :info",
            ExpressionAttributeValues:
            {
                ":id": new_id,
                ":info": frontEndInfo
            },
            ReturnValues:"UPDATED_NEW"
        };
        
    client.update(editDynamo, callback);
};

AchievementsDAO.prototype.delete = function(frontEndInfo, callback){
    var achievement_id = hash(frontEndInfo.name);
    
    //--------------- DYNAMO DB VERSION --------------------------
    //Change code bellow if you want to use another cloud server
    
    var client = this._connection;
    var table = "Achievements";
    
    var delDynamo =
        {
            TableName: table,
            Key: 
            {
                id: achievement_id
            }
        };
        
    client.update.delete(delDynamo, callback);
};

AchievementsDAO.prototype.get = function(frontEndInfo, callback){
    var achievement_id = hash(frontEndInfo.name);
    
    //--------------- DYNAMO DB VERSION --------------------------
    //Change code bellow if you want to use another cloud server
    
    var client = this._connection;
    var table = "Achievements";
    
    var getDynamo = 
    {
        TableName : table,
        KeyConditionExpression: "#id = :id",
        ExpressionAttributeNames:{
            "#id": "id"
        },
        ExpressionAttributeValues: {
            ":id": achievement_id
        }
    };

    client.query(getDynamo, callback);
};

module.exports = function(){
    return AchievementsDAO;
};

