var assert = require('assert');
var MongoClient = require('mongodb').MongoClient;

const MONGO_URL = 'mongodb://172.17.0.1:27017/data/db';
const MONGO_DB_NAME = 'SSR';


var dbHealthCheck = function(){
    MongoClient.connect(MONGO_URL,{useNewUrlParser:true},function(err, mongo) {
        assert.equal(null, err);
        var db = mongo.db(MONGO_DB_NAME);
        assert.equal(db.s.databaseName,MONGO_DB_NAME ,MONGO_DB_NAME + ' not exist!');
        console.log('Mongo database is ready to rumble...:)')
        mongo.close();
     });     
}

var createCollection = function(name,options){
    MongoClient.connect(MONGO_URL,{useNewUrlParser:true},function(err, mongo) {
        assert.equal(null, err);
        var db = mongo.db(MONGO_DB_NAME);
        db.createCollection(name, options,function(err, res) {
            if (err) throw err;
            console.log( name +' collection created!');
            });
        mongo.close();
     });   

}

 module.exports = {
    MONGO_DB_NAME : MONGO_DB_NAME,
    MONGO_URL : MONGO_URL,
    dbHealthCheck:dbHealthCheck,
    createCollection:createCollection
 }