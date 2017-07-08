
var hash = require('string-hash');
var table = "Order";

function OrderDAO(connection){
    this._connection = connection;
}

OrderDAO.prototype.add = function(info, callback) {
    
    var order = {
        id : hash(info.ownerstore+Date.now()),
        ownerstore : info.ownerstore,
        itens : [info.itens]
        
    };
        
    //--------------- DYNAMO DB VERSION --------------------------
    //Change code bellow if you want to use another cloud server

    var addDynamo = {
        TableName: table,
        Item: order
    };

    this._connection.put(addDynamo, callback);
    //-------------------------------------------------------------------
}

OrderDAO.prototype.edit = function(info, callback){
    
    //--------------- DYNAMO DB VERSION --------------------------
    //Change code bellow if you want to use another cloud server
    
    var updateDynamo = {
        TableName: table,
        Key: {
            id : info.id,
            ownerstore : info.ownerstore
        },
        UpdateExpression: "set itens = :itens",
        ExpressionAttributeValues:{
            ":itens": info.itens
        },
        ReturnValues:"UPDATED_NEW"
    };
        
    this._connection.update(updateDynamo, callback);
}

OrderDAO.prototype.delete = function(info, callback){
    //--------------- DYNAMO DB VERSION --------------------------
    //Change code bellow if you want to use another cloud server
    
    var delDynamo = {
        TableName: table,
        Key: {
            id : info.id,
            ownerstore : info.ownerstore
        }
    };
        
    this._connection.delete(delDynamo, callback);
}

OrderDAO.prototype.get = function(info, callback){
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

OrderDAO.prototype.scan = function(info, callback){
    //--------------- DYNAMO DB VERSION --------------------------
    //Change code bellow if you want to use another cloud server
    console.log(info);
    var getDynamo = {
        TableName: table,
        ProjectionExpression: "id, ownerstore, itens",
        FilterExpression: "#own = :from",
        ExpressionAttributeNames: {
            "#own": "ownerstore",
        },
        ExpressionAttributeValues: {
            ":from" : info.ownerstore
        }
    };
    //console.log(getDynamo);
    this._connection.scan(getDynamo, callback);
}

OrderDAO.prototype.scanAll = function(info, callback){
    //--------------- DYNAMO DB VERSION --------------------------
    //Change code bellow if you want to use another cloud server
    console.log(info);
    var getDynamo = {
        TableName: table,
        ProjectionExpression: "id, ownerstore, itens"
    };
    //console.log(getDynamo);
    this._connection.scan(getDynamo, callback);
}

module.exports = function(){
    return OrderDAO;
}