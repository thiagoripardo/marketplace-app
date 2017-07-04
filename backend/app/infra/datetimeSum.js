 /*
    This function convert mySqlDatetime to numbers
 */

function getDateTimeSum(dateTime) {
    var tokens = dateTime.split(' ');
    var dateTokens = tokens.split('/');
    var timeTokens = tokens.split(':');
    
    var year    = Number(dateTokens[0]);
    var month   = Number(dateTokens[1]);
    var day     = Number(dateTokens[2]);
    
    var hour    = Number(timeTokens[0]);
    var minute  = Number(timeTokens[1]);
    var second  = Number(timeTokens[2]);
     
    var dateTimeSum = year + month + day + hour + minute + second;
    return dateTimeSum;
}

/*module.exports = function(){
    return getDateTimeSum();
}*/

module.exports = {
    getDateTimeSum
}