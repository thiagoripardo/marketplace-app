function ContatosDAO(connection){
    this._connection = connection;
}

ContatosDAO.prototype.list = function(callback){
    this._connection.query('select * from contatos', callback);
}

ContatosDAO.prototype.save = function(contato, callback){
    this._connection.query('insert into contatos set ?', contato, callback);
}

ContatosDAO.prototype.update = function(contato, callback){
    this._connection.query('update contatos set ? where id = '+contato.id, contato, callback);
}

ContatosDAO.prototype.delete = function(contato, callback){
    this._connection.query('delete from contatos where name = ?', contato.name, callback);
}

ContatosDAO.prototype.listByName = function(contato, callback){
    if(contato.name != ''){
        this._connection.query('select * from contatos where name = ?', contato.name, callback);
    } 
    else if(contato.nickname != ''){
        this._connection.query('select * from contatos where nickname = ?', contato.nickname, callback);
    }
    else{
        this._connection.query('select * from contatos', callback);
    }
}

module.exports = function(){
    return ContatosDAO;
}
