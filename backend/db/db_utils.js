
var assert = require('assert');
var MongoClient = require('mongodb').MongoClient;
var url = require('../mongo_init').MONGO_URL;
var SSR_DB = require('../mongo_init').MONGO_DB_NAME;

function getCollections(req,res){
    MongoClient.connect(url,{useNewUrlParser:true},function(err, mongo) {
        assert.equal(null, err);
        //var db = mongo.db(SSR_DB);
        //db.runCommand( { listCollections: 1.0, authorizedCollections: true, nameOnly: true } ).find().toArray(function(err,data){
            mongo.close(); 
            //res.end(JSON.stringify(data));
            res.end('Deprecated method');
        //});
      }); 
}

 function getCollection(req,res){
    //var coll = req.params.coll;
    MongoClient.connect(url,{useNewUrlParser:true},function(err, mongo) {
        assert.equal(null, err);
        // var db = mongo.db(SSR_DB);
        // //context:
        // db.collection(coll).find().toArray(function(err,data){
        //   mongo.close(); 
        //   res.end(JSON.stringify(data));
        //  });
        res.end('200' + '\n');
      }); 
}

module.exports = {
    getCollection : getCollection,
    getCollections : getCollections,
    
};


