
var hash = require('string-hash');
var table = "Product";

function ProductDAO(connection){
    this._connection = connection;
}

ProductDAO.prototype.add = function(info, callback) {

    var product = {
        id : hash(info.ownerstore+Date.now()),
        ownerstore : info.ownerstore,
        info : {
            name : info.info.name,
            description : info.info.description,
            price : info.info.price
        }
        
    };
        
    //--------------- DYNAMO DB VERSION --------------------------
    //Change code bellow if you want to use another cloud server

    var addDynamo = {
        TableName: table,
        Item: product
    };

    this._connection.put(addDynamo, callback);
    //-------------------------------------------------------------------
}

ProductDAO.prototype.edit = function(info, callback){
    
    //--------------- DYNAMO DB VERSION --------------------------
    //Change code bellow if you want to use another cloud server
    
    var updateDynamo = {
        TableName: table,
        Key: {
            id : info.id,
            ownerstore : info.ownerstore
        },
        UpdateExpression: "set info = :info",
        ExpressionAttributeValues:{
            ":info": info.info
        },
        ReturnValues:"UPDATED_NEW"
    };
        
    this._connection.update(updateDynamo, callback);
}

ProductDAO.prototype.delete = function(info, callback){
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

ProductDAO.prototype.get = function(info, callback){
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

ProductDAO.prototype.scan = function(info, callback){
    //--------------- DYNAMO DB VERSION --------------------------
    //Change code bellow if you want to use another cloud server
    console.log(info);
    var getDynamo = {
        TableName: table,
        ProjectionExpression: "id, ownerstore, info",
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

ProductDAO.prototype.scanAll = function(info, callback){
    //--------------- DYNAMO DB VERSION --------------------------
    //Change code bellow if you want to use another cloud server
    console.log(info);
    var getDynamo = {
        TableName: table,
        ProjectionExpression: "id, ownerstore, info"
    };
    //console.log(getDynamo);
    this._connection.scan(getDynamo, callback);
}

module.exports = function(){
    return ProductDAO;
}