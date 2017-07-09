
var hash = require('string-hash');
var table = "Shop";

function ShopDAO(connection){
    this._connection = connection;
}

ShopDAO.prototype.add = function(info, callback) {

    var shop = {
        id : hash(info.ownerid+Date.now()),
        ownerid : info.ownerid,
        info : {
            name : info.info.name,
            phone : info.info.phone,
            address : info.info.address
        }
        
    };
        
    //--------------- DYNAMO DB VERSION --------------------------
    //Change code bellow if you want to use another cloud server

    var addDynamo = {
        TableName: table,
        Item: shop
    };

    this._connection.put(addDynamo, callback);
    //-------------------------------------------------------------------
}

ShopDAO.prototype.edit = function(info, callback){
    
    //--------------- DYNAMO DB VERSION --------------------------
    //Change code bellow if you want to use another cloud server
    
    var updateDynamo = {
        TableName: table,
        Key: {
            id : info.id,
            ownerid : info.ownerid
        },
        UpdateExpression: "set info = :info",
        ExpressionAttributeValues:{
            ":info": info.info
        },
        ReturnValues:"UPDATED_NEW"
    };
        
    this._connection.update(updateDynamo, callback);
}

ShopDAO.prototype.delete = function(info, callback){
    //--------------- DYNAMO DB VERSION --------------------------
    //Change code bellow if you want to use another cloud server
    
    var delDynamo = {
        TableName: table,
        Key: {
            id : info.id,
            ownerid : info.ownerid
        }
    };
        
    this._connection.delete(delDynamo, callback);
}

ShopDAO.prototype.get = function(info, callback){
    //--------------- DYNAMO DB VERSION --------------------------
    //Change code bellow if you want to use another cloud server
    var getDynamo = {
        TableName : table,
        KeyConditionExpression: "#id = :id",
        ExpressionAttributeNames:{
            "#id": "id"
        },
        ExpressionAttributeValues: {
            ":id": info.id
        }
    };

    this._connection.query(getDynamo, callback);
}

ShopDAO.prototype.scan = function(info, callback){
    //--------------- DYNAMO DB VERSION --------------------------
    //Change code bellow if you want to use another cloud server
    console.log(info);
    var getDynamo = {
        TableName: table,
        ProjectionExpression: "id, ownerid, info",
        FilterExpression: "#own = :from",
        ExpressionAttributeNames: {
            "#own": "ownerid",
        },
        ExpressionAttributeValues: {
            ":from" : info.ownerid
        }
    };
    //console.log(getDynamo);
    this._connection.scan(getDynamo, callback);
}

ShopDAO.prototype.scanAll = function(callback){
    //--------------- DYNAMO DB VERSION --------------------------
    //Change code bellow if you want to use another cloud server

    var getDynamo = {
        TableName: table,
        ProjectionExpression: "id, ownerid, info"
    };
    //console.log(getDynamo);
    this._connection.scan(getDynamo, callback);
}

module.exports = function(){
    return ShopDAO;
}