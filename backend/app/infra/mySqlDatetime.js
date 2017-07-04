 /*
    This function works with UTC, so to view date on specificated
    timeZone, you need to convert the result string to your timezone
 */
 
 function getDateTime() {
    var now     = new Date(); 
    var year    = now.getUTCFullYear();
    var month   = now.getUTCMonth()+1; 
    var day     = now.getUTCDate();
    var hour    = now.getUTCHours();
    var minute  = now.getUTCMinutes();
    var second  = now.getUTCSeconds(); 
    if(month.toString().length == 1) {
        var month = '0'+month;
    }
    if(day.toString().length == 1) {
        var day = '0'+day;
    }   
    if(hour.toString().length == 1) {
        var hour = '0'+hour;
    }
    if(minute.toString().length == 1) {
        var minute = '0'+minute;
    }
    if(second.toString().length == 1) {
        var second = '0'+second;
    }   
    var dateTime = year+'/'+month+'/'+day+' '+hour+':'+minute+':'+second;   
     return dateTime;
}

module.exports = function()
{
    return getDateTime();
}