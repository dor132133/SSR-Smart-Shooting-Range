

var express = require('express');
var app = express();
var server = require('http').createServer(app);

var io = require('socket.io')(server);

//to fix the issue of : No 'Access-Control-Allow-Origin'
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
    next();
});


io = io.listen(server, {log:false, origins:'*:*'});

//start server
var server = app.listen(8081, function () {
   console.log("Server is listening at http://127.0.0.1:8081/")
});  
app.get('/', function (req, res){
    res.end('Hello, I\'m SSR-Cluster' + '\n' + 'try again with specific api');
  });

var HARouter = require('./routers/Hybrid-App/HA_router');
var MCRouter = require('./routers/Micro-Controller/MC_router');
app.use('/HA', HARouter);
app.use('/MC', MCRouter);

process.stdin.resume();//so the program will not close instantly

function exitHandler(options, exitCode) {
    if (options.cleanup) console.log('clean');
    if (exitCode || exitCode === 0) console.log(exitCode);
    if (options.exit) process.exit();
}

module.exports = app;
