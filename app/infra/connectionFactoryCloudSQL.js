var mysql = require('mysql');

function createDBConnection() {
    var con = mysql.createConnection({
        host : '35.185.64.135',
        user : 'root',
        password : 'NewtonAdmin',
        database : 'contatos'
    });
    con.connect(function(err){
        if(err){
            console.log('Error connecting to Db');
            //return con;
        } else{
            console.log('Connection established with Database');
            
        }
        
    });
    return con;
} 

// wrapper
module.exports = function(){
    return createDBConnection;
}