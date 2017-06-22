var AWS = require('aws-sdk');
AWS.config.loadFromPath('./config/config.json');

// Documentação (FUNCIONA)
// http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html

function createDynamoConnection(){
    var documentClient = new AWS.DynamoDB.DocumentClient();

    return documentClient;
    
    /*var dynamodb = new AWS.DynamoDB();
    return dynamodb;*/
}

module.exports = function(){
    return createDynamoConnection;
}