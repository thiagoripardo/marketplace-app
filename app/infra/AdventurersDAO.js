/*
                            README
                            
    The Json format for a Adventurer is:
    
    {
        id: <integer>         #p_key
        level: <integer>
        exp: <integer>
        missions:
            {
                finished: [ <integer> ]   #id of mission
                doing: [ <integer> ]   #id of mission
            }
        achievements: [ <integer> ]   #id of achievements
        
        frontend_info:
            {
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
    be store in frontend_info field:
    
    {
        name: <string>
        photo_id: <integer>
        descript: <string>
        skills: <string>
        
        #for generate id
        email: <string>
    }
*/

var hash = require('string-hash');

function AdventurersDAO(connection)
{
    this._connection = connection;
}

/*  In the method bellow, the mobile application will send a json file has
    information by post command. The format send by mobile needs to be
    completed to turn in a Adventurer json.
*/

AdventurersDAO.prototype.add = function(adventurer_basic_info, callback)
{
    var info = adventurer_basic_info;

    var adventurer_id = hash(info.email);
    console.log(adventurer_id);
    delete info.email;
    
    var adventurer =
        {
            id: adventurer_id,
            level: 1,
            exp: 0,
            missions:
                {
                    finished: [],  
                    doing: []
                },
            achievements: [],
            
            frontend_info: info
        };
        
    //--------------- DYNAMO DB VERSION --------------------------
    //Change code bellow if you want to use another cloud server
    
    var client = this._connection;
    
    var table = "Adventurers";
    
    var dynamodb_json_format =
        {
            TableName: table,
            Item: adventurer
        };
    
    client.put(dynamodb_json_format, callback);
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

AdventurersDAO.prototype.edit = function(adventurer_basic_info, callback)
{
    var info = adventurer_basic_info;
    
    var name = info.name;
    var photo_id = info.photo_id;
    var description = info.descript;
    var skills = info.skills;
    
    var adventurer_id = hash(info.email);
    
    //--------------- DYNAMO DB VERSION --------------------------
    //Change code bellow if you want to use another cloud server
    
    var client = this._connection;
    var table = "Adventurers";
    
    var dynamodb_json_upd =
        {
            TableName: table,
            Key: 
            {
                id: adventurer_id
            },
            UpdateExpression: "set frontend_info.name = :name, frontend_info.photo_id = :photo_id, frontend_info.descript = :description, frontend_info.skills = :skills",
            ExpressionAttributeValues:
            {
                ":name": name,
                ":photo_id": photo_id,
                ":description": description,
                ":skills": skills
            },
            ReturnValues:"UPDATED_NEW"
        };
        
    client.update(dynamodb_json_upd, callback);
}

AdventurersDAO.prototype.delete = function(adventurer_basic_info, callback)
{
    var info = adventurer_basic_info;
    var adventurer_id = hash(info.email);
    
    //--------------- DYNAMO DB VERSION --------------------------
    //Change code bellow if you want to use another cloud server
    
    var client = this._connection;
    var table = "Adventurers";
    
    var dynamodb_json_del =
        {
            TableName: table,
            Key: 
            {
                id: adventurer_id
            }
        };
        
    client.delete(dynamodb_json_del, callback);
}

AdventurersDAO.prototype.get = function(adventurer_basic_info, callback)
{
    var info = adventurer_basic_info;
    var adventurer_id = hash(info.email);
    console.log(adventurer_id);
    
    //--------------- DYNAMO DB VERSION --------------------------
    //Change code bellow if you want to use another cloud server
    
    var client = this._connection;
    var table = "Adventurers";
    
    var params = 
    {
        TableName : table,
        KeyConditionExpression: "#id = :id",
        ExpressionAttributeNames:{
            "#id": "id"
        },
        ExpressionAttributeValues: {
            ":id": adventurer_id
        }
    };

    client.query(params, callback);
}

module.exports = function(){
    return AdventurersDAO;
}

