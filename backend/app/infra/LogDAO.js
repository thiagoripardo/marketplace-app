function LogDAO(connection){
    this._connection = connection;
}

LogDAO.prototype.addLog = function(operationType, timeStart, timeElapsed, contato, callback){

    const kind = 'Operation';
    var name, type;

    if(operationType == "add"){         name = "CAD-"+contato.name+'-'+timeStart;  type = "CAD";} 
    else if(operationType == "update"){ name = "ALT-"+contato.name+'-'+timeStart;  type = "ALT";}
    else if(operationType == "delete"){ name = "EXC-"+contato.name+'-'+timeStart;  type = "EXC";}
    else if(operationType == "search"){ name = "BUS-"+contato.name+'-'+timeStart;  type = "BUS";}
    else if(operationType == "list"){   name = "LIST-"+contato.name+'-'+timeStart; type = "LIST";}
    else if(operationType == "filter"){ name = "FILT-"+contato.name+'-'+timeStart; type = "FILT";}

    const taskKey = this._connection.key([kind, name]);

    const task = {
        key : taskKey,
        data : {
            type : type,
            timeStarted : timeStart,
            timeElapsed : timeElapsed
        }
    }

    this._connection.save(task).then(() => {
        console.log(`Saved ${task.key.name}: ${task.data.type} `);
    });
}

LogDAO.prototype.list = function(callback){
    const query = this._connection.createQuery('Operation');

    //console.log(query);
    this._connection.runQuery(query).then((results) => {
        // Task entities found.
        const tasks = results[0];

        //console.log('Tasks:');
    
        /*tasks.forEach((task) => {
            //console.log(task);
            const taskKey = task[this._connection.KEY];
            console.log(taskKey.name, task);
            //console.log(task);
        });*/

        return callback(tasks);

    });
}

module.exports = function(){
    return LogDAO;
}

