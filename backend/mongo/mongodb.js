

var assert = require('assert');
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://172.17.0.2:27017/db';
var myMongo;


function connect(callback){
    MongoClient.connect(url,{ useNewUrlParser: true },function(err, mongo) {
        assert.equal(null, err);
        var db = mongo.db("SSR-DB");
        myMongo = mongo;
        console.log('Successfully connected mongo');
        callback(db)
    });    
}

function disConnection(callback){
    myMongo.close((err)=>{
        assert.equal(null, err);
        console.log('Successfully disconnected mongo');
        callback();
    });
}

function createCollection(coll,options){
        db.createCollection(coll, options,function(err, res) {
          if (err) throw err;
          console.log("Warriors collection created!");
          });
}


module.exports = {
    createCollection:createCollection,
    connect:connect,
    disConnection:disConnection
}