var http = require('http');

var userExample = {

    "email" : 'uniquest@uniquest.com',
    "password" : '57n92s'

};

// Para cadastrar mudar rota para /signup
var configPOST = {
    hostname: 'sample-env.qru9afb9qm.sa-east-1.elasticbeanstalk.com',
    port: 80,
    path: '/login',
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'Connection': 'keep-alive'
    }
};

var configGET2 = {
    hostname: 'lowcost-env.v9mpr7bkgz.us-west-2.elasticbeanstalk.com',
    port: 80,
    path: '/profile',
    method: 'GET',
    headers: {
        'Accept' : 'application/json',
        'Content-type' : 'application/json',
        'Cookie' : 'connect.sid=s%3ARhekzlIE4S12cOJ-_BihC9p3xyCaE-y_.tSc5Z9VklU%2FAoq5IUopwflIiDDfzjuL5HetLOFSquJw; Path=/; HttpOnly',
        'Connection' : 'keep-alive'
    }
};

var configGET3 = {
    hostname: 'localhost',
    port: 8080,
    path: '/profile',
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'Cookie': 'connect.sid=s%3AIyp7lDtkfyysEnKTDzEW6yU7VzlEFfZq.7%2BwtRSOck6bBWo4aYV78Ua7dXxkUkMwI0BPDA%2FfZmDM; Path=/; HttpOnly',
        'Connection': 'keep-alive'
    }
};

var configGET = {
    hostname: 'localhost',
    port: 8080,
    path: '/profile',
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        //'Cookie': cookie,
        'Connection': 'keep-alive'
    }
};

// A requisição é feita pelo arquivo de configuração, se for um post vc usa metodo write para enviar um json(do que vc quer "postar").
// Para pegar o cookie(enviado após o login ou signup) use res.headers["set-cookie"]. Ele fica no header da resposta, campo set-cookie.
// Após isso, nos jsons de configuraçoes, vc seta o esse mesmo cookie para que ele possa ser autenticado.

/*var reqClient = http.request(configGET2, function(res) {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
        console.log('BODY: ' + chunk);
    });
    res.on('end', function () {
        console.log(res.headers["set-cookie"]);
    });
});

reqClient.on('error', (e) => {
    console.error('problem with request: ' + e.message);
});

// Execute that if the request is a post ***DESATIVE QUANDO FOR GET***
//reqClient.write(JSON.stringify(jailson));
//reqClient.write(JSON.stringify(userExample));
//reqClient.write(JSON.stringify(achievementExample));

reqClient.end();*/

var configPOSTAdventurer = {
    hostname: 'localhost',
    port: 8080,
    path: '/adventurers',
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'Connection': 'keep-alive'
    }
};

var dataAdd = {
    id: 0,

    localNR: {
        password: '123456',
        email: 'ex@example.com'
    },
    
    frontendInfo: {
        name: 'Example',
        photo_id: 1,
        description: 'Sample user for add test.',
        skills: 'NodeJs, ExpressJs, Web Development.'
    },
    
    action : 'add'
}

var dataGet = {
    id: 0,
    action: 'get'
}

var dataEdit = {
    id: 0,
    
    frontendInfo:
    {
        name: 'Example New',
        photo_id: 2,
        description: 'Sample user for add test.',
        skills: 'NodeJs, ExpressJs, Web Development.'
    },
    
    action: 'edit'
}

var dataDelete = {
    id: 0,
    action: 'delete'
}

var dataGainXp = {
    id: 0,
    xp_gain: 5,
    action: 'gainExp'
}

var sampleMission = {
    id: 0,

    membersAssigned: 0,
    finished: 0,

    frontEndInfo: {
        name: 'Emanuel Final Ultimate Challenge',
        photoId: 1,
        description: 'Show the final work for Emanuel. No regrets allowed',
        requires: 'Too much skills.',
        exp: 9999999,
        rewards: 'Aprovation!',
    
        missionStatus: {
            expirationDate: '2017/07/03 12:00:00',
            partyLimit: 5
        }
    }
}

var dataAssign = {
    id: 0,
    mission: sampleMission,
    action: 'assign'
}

var dataUnassign = {
    id: 0,
    mission: sampleMission,
    action: 'unassign'
}

var dataFinishMission = {
    id: 0,
    mission: sampleMission,
    action: 'finishMission'
}

var dataMissionXpReward = {
    id: 0,
    amount: 2,
    action: 'missionXpReward'
}
    
var reqClient = http.request(configPOSTAdventurer, function(res) {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
        console.log('BODY: ' + chunk);
      });
});

reqClient.on('error', (e) => {
    console.error('problem with request: ' + e.message);
});



//reqClient.write(JSON.stringify(dataAdd));
reqClient.write(JSON.stringify(dataGet));
//reqClient.write(JSON.stringify(dataEdit));
//reqClient.write(JSON.stringify(dataDelete));
//reqClient.write(JSON.stringify(dataGainXp));

//----- not working because array problem ----------
//reqClient.write(JSON.stringify(dataAssign));
//reqClient.write(JSON.stringify(dataUnassign));
//reqClient.write(JSON.stringify(dataFinishMission));
//reqClient.write(JSON.stringify(dataMissionXpReward));
//reqClient.write(JSON.stringify(userExample));

reqClient.end();

var configPOSTMission = {
    hostname: 'sample-env.qru9afb9qm.sa-east-1.elasticbeanstalk.com',
    port: 80,
    path: '/missions',
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'Connection': 'keep-alive'
    }
};

var sampleMissionFrontEndInfo = {

    name: 'Emanuel Final Ultimate Challenge',
    photoId: 1,
    description: 'Show the final work for Emanuel. No regrets allowed',
    requires: 'Too much skills.',
    exp: 9999999,
    rewards: 'Aprovation!',

    missionStatus: {
        expirationDate: '2017/07/03 12:00:00',
        partyLimit: 5
    },

    action: 'add'
}

var dataMissionGet = {
    name: 'Emanuel Final Ultimate Challenge',
    action: 'get'
}

var dataMissionDelete = {
    name: 'Emanuel Final Ultimate Challenge',
    action: 'delete'
}


var dataMissionEdit = {
    frontEndInfo : {
        name: 'Emanuel Final Ultimate Challenge Ultra End No Survior Chance',
        photoId: 1,
        description: 'You can run from AF?',
        requires: 'Cry... a lot',
        exp: 9999999999999999999,
        rewards: 'Glory!!!',
        
        missionStatus: {
            expirationDate: '2017/08/03 12:00:00',
            partyLimit: 80
        },
        
        nameOld: 'Emanuel Final Ultimate Challenge',
    },
    
    action: 'edit'
}

/*var reqClient2 = http.request(configPOSTMission, function(res) {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
        console.log('BODY: ' + chunk);
      });
});

reqClient2.on('error', (e) => {
    console.error('problem with request: ' + e.message);
});

//reqClient2.write(JSON.stringify(sampleMissionFrontEndInfo));
//reqClient2.write(JSON.stringify(dataMissionGet));
//reqClient2.write(JSON.stringify(dataMissionDelete));
//reqClient2.write(JSON.stringify(dataMissionEdit));        //not working

reqClient2.end();*/