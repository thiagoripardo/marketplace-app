/*
                            README
                            
    The Json format for a Achievement is:
    
    {
        id: <integer>         #p_key
        rank: [ <integer> ]   #id of achievements/ size 10
        
        #TO GENERATE KEY
        creation_date: <string>
        
        frontend_info:
            {
                name: <string>
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
        name: <string>
        photo_id: <integer>
        description: <string>
        tier: <string>
    }
*/

var hash = require('string-hash');

function AchievementsDAO(connection)
{
    this._connection = connection;
}

/*  In the method bellow, the mobile application will send a json file has
    information by post command. The format send by mobile needs to be
    completed to turn in a achievement json.
*/

AchievementsDAO.prototype.add = function(achievement_basic_info, callback)
{
    var info = achievement_basic_info;

    var actual_date = require("./mySqlDatetime");
    info.creation_date = actual_date;
    
    var achievement =
        {
            id: hash(actual_date),
            rank: [],
            
            frontend_info: info
        };
        
    //--------------- DYNAMO DB VERSION --------------------------
    //Change code bellow if you want to use another cloud server
    
    var client = this._connection;
    
    var table = "Achievements";
    
    var dynamodb_json_format =
        {
            TableName: table,
            Item: achievement
        };
        
    client.put(dynamodb_json_format, callback);
    //-------------------------------------------------------------------
}

/*  Basic info:
    {
        name: <string>
        photo_id: <integer>
        description: <string>
        tier: <string>
    }
*/

AchievementsDAO.prototype.edit = function(achievement_basic_info, callback)
{
    var info = achievement_basic_info;
    
    var name = info.name;
    var photo_id = info.photo_id;
    var description = info.descript;
    var tier = info.tier;
    
    var achievement_id = hash(info.creation_date);
    
    //--------------- DYNAMO DB VERSION --------------------------
    //Change code bellow if you want to use another cloud server
    
    var client = this._connection;
    var table = "Achievements";
    
    var dynamodb_json_upd =
        {
            TableName: table,
            Key: 
            {
                id: achievement_id
            },
            UpdateExpression: "set frontend_info.name = :name, frontend_info.photo_id = :photo_id, frontend_info.descript = :description, frontend_info.tier = :tier",
            ExpressionAttributeValues:
            {
                ":name": name,
                ":photo_id": photo_id,
                ":description": description,
                ":tier": tier
            },
            ReturnValues:"UPDATED_NEW"
        };
        
    client.update(dynamodb_json_upd, callback);
}

AchievementsDAO.prototype.delete = function(achievement_basic_info, callback)
{
    var info = achievement_basic_info;
    var achievement_id = hash(info.creation_date);
    
    //--------------- DYNAMO DB VERSION --------------------------
    //Change code bellow if you want to use another cloud server
    
    var client = this._connection;
    var table = "Achievements";
    
    var dynamodb_json_del =
        {
            TableName: table,
            Key: 
            {
                id: achievement_id
            }
        };
        
    client.update.delete(dynamodb_json_del, callback);
}

AchievementsDAO.prototype.get = function(achievement_basic_info, callback)
{
    var info = achievement_basic_info;
    var achievement_id = hash(info.creation_date);
    
    //--------------- DYNAMO DB VERSION --------------------------
    //Change code bellow if you want to use another cloud server
    
    var client = this._connection;
    var table = "Achievements";
    
    var params = 
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

    client.query(params, callback);
}

module.exports = function(){
    return AchievementsDAO;
}

