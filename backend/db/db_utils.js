
var assert = require('assert');
var config = require('../config');
var MongoClient = require('mongodb').MongoClient;
var url = config.MONGO_URL;
var SSR_DB = config.MONGO_URL;

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
    
};


