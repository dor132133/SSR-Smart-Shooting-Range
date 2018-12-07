 
 

//import required module
var mongodb = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://localhost:27017/db';
var express = require('express');
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var app = express();


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

//implement a rest services
//RESTFUL methods  
//build our restful service
  app.get('/', function (req, res){
    res.end('Hello World');
  });

 app.get('/getWarriors', function (req, res) {   
    MongoClient.connect(url, function(err, db) {
     assert.equal(null, err);
     findWarriors(db, function(data){ db.close(); res.end(JSON.stringify(data));});
   }); 
  
 });   
 app.get('/addWarrior', function (req, res) {   
    MongoClient.connect(url, function(err, db) {
    //to process other instructions we check if err != null
     assert.equal(null, err);
     //get parameter from url request
     var obj = req.query.obj;
      insertWarrior(db, JSON.parse(obj), function(){
        db.close();
        res.end("true");
     }); 
   }); 
 });
 app.get('/updateWarrior', function (req, res) { 
   
   MongoClient.connect(url, function(err, db) {
     //to process other instructions we check if err != null
     assert.equal(null, err);
     //get parameter from url request
     var obj = req.query.obj; 
      updateWarriors(db, obj, function(){
      db.close();
      res.end("true");
     }); 
   });
 });
 app.get('/removeWarrior', function (req, res) {    
   MongoClient.connect(url, function(err, db) {
     //to process other instructions we check if no error occurred
     assert.equal(null, err);
     //get id parameter from url request
    var key = req.query.id;
        removeWarriors(db, key, function(){
      db.close();
      res.end("true");
     }); 
   });
 });

//implement crud methods by using Mongodb client 
//insert a new warrior
 var insertWarrior = function(db, obj, callback) {
    db.collection('warriors').insertOne(  obj, function(err, result) {
    assert.equal(err, null);
    console.log("Inserted a new warrior into the warriors collection.");
    callback();
    }); 
  };
//get all warriors 
 var findWarriors = function(db, callback) {
  var cursor = db.collection('warrior').find();
     cursor.toArray(function(err, items) {
    console.log(items);
    callback(items);
    });
  };
//update an existing warrior in warriors collection
 var updateWarriors = function(db, arg, callback) {
    var  obj = JSON.parse(arg);
    var key =  obj["_id"];
    db.collection('warriors').updateOne(
    {"_id": new mongodb.ObjectID(""+key)},
    {
    $set: { "firstname": obj.firstname, "lastname": obj.lastname, 
    "team":  obj.team, "age": obj.age, "job": obj.job, 'rate': obj.rate, 'picture': obj.pic}
    }, function(err, results) {
     console.log(results);
     callback();
    }); 
 };
//remove existing warrior from warriors collection
 var removeWarrior = function(db, key, callback) {
      db.collection('warriors').deleteMany(
    { "_id": new mongodb.ObjectID(key)},
     function(err, results) {
     console.log(results);
     callback();
    }
    );
 };