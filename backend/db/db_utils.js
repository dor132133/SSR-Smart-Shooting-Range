
var assert = require('assert');
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://172.17.0.2:27017/db';
var SSR_DB = "SSR-DB"

 function getCollection(req,res){
    var coll = req.params.coll;
    MongoClient.connect(url,{useNewUrlParser:true},function(err, mongo) {
        assert.equal(null, err);
        var db = mongo.db(SSR_DB);
        //context:
        db.collection(coll).find().toArray(function(err,data){
          mongo.close(); 
          res.end(JSON.stringify(data));
         });
      }); 
}

module.exports = {
    getCollection : getCollection,
    
};