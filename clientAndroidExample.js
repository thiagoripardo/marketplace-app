var http = require('http');

/*var configGET = {
    hostname: 'localhost',
    port: 8080,
    path: '/adventurers',
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
    }
};

var configPOST = {
    hostname: 'localhost',
    port: 8080,
    path: '/adventurers',
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
    }
};

var jailson = {
    name : 'Jailson6',
    photo_id : 'null',
    description : 'ahhhhh, que delicia',
    skills : 'Mestre do suco de laranja',
    email : 'jojoilson@jailsonmail.com',
    action : 'add'
}

var jailsonGet = {
    email : 'jojoilson@jailsonmail.com',
    action : 'get'
}

var jailsonDel = {
    email : 'jojoilson@jailsonmail.com',
    action : 'delete'
}

var faustao = {
    name : 'Faustao',
    photo_id : 'null',
    description : 'Oloko Bixo',
    skills : 'Shingeki no Faustao',
    email : 'faustao@faustoterra.com',
    action : 'add'
}

var faustaoGet = {
    email : 'faustao@faustoterra.com',
    action : 'get'
}

var faustaoDel = {
    email : 'faustao@faustoterra.com',
    action : 'delete'
}

var reqClient = http.request(configPOST, function(res) {
  console.log('STATUS: ' + res.statusCode);
  //console.log('HEADERS: ' + JSON.stringify(res.headers));
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
    console.log('BODY: ' + chunk);
  });
});

// Execute that if the request is a post
//reqClient.write(JSON.stringify(jailson));
reqClient.write(JSON.stringify(faustaoGet));

reqClient.end();*/

var configPOST = {
    hostname: 'localhost',
    port: 8080,
    path: '/missions',
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
    }
};

var missionExample = {
    "name" : 'mission 2',
    "photoId" : 213213,
    "ownerEmail" : 'tmripardo@gmail.com',
    "description" : 'another test 2',
    "requires" : 'none',
    "client" : 'none',
    "membersCount" : 0,
    "exp" : 9000,
    "rewards" : 'none',
    "action" : 'edit'
}

var reqClient = http.request(configPOST, function(res) {
  console.log('STATUS: ' + res.statusCode);
  //console.log('HEADERS: ' + JSON.stringify(res.headers));
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
    console.log('BODY: ' + chunk);
  });
});

// Execute that if the request is a post
//reqClient.write(JSON.stringify(jailson));
reqClient.write(JSON.stringify(missionExample));

reqClient.end();