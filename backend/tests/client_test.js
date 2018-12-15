


var request = require('request');
var assert = require('assert');
var Warrior = require('../classes/Warrior');


var w1 = new Warrior('Dor','BY', 26, 'UDI');

var options = {
    url : 'http://127.0.0.1:8081/DB/document',
    port : '8081',
    method : 'POST',
    body : '{"firstname" : "dor", "lastname" : "by"}'
}

request(options, function (err, res, body){
    if(err){
        //console.log(err);
        throw err;
    }
    console.log(res.statusCode)
    console.log(res)
})