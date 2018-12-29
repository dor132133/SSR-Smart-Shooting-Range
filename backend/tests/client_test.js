


var request = require('request');
const fs = require('fs');



var options = {
    url : 'http://127.0.0.1:8081/DB/document',
    port : '8081',
    method : 'POST',
    body : fs.createReadStream('./document.json')
}

request(options, function (err, res, body){
    if(err){
        //console.log(err);
        throw err;
    }
    console.log(res.statusCode)
    //console.log(res)
})