

var assert = require('assert');
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://172.17.0.2:27017/db';
var myMongo;
var db;

MongoClient.connect(url,{ useNewUrlParser: true }, function(err, mongo) {
    assert.equal(null, err);
    console.log('Successfully connected');
    db = mongo.db("SSR-DB");
    myMongo = mongo;
});

function createCollection(coll,options){
        db.createCollection(coll, options,function(err, res) {
          if (err) throw err;
          console.log("Warriors collection created!");
          });
}

function closeConnection(){
    myMongo.close();
    console.log('Successfully disconnected');
}

module.exports = {
    db:db,
    createCollection:createCollection,
    closeConnection:closeConnection
}