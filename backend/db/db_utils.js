
var assert = require('assert');
var MongoClient = require('mongodb').MongoClient;
var url = require('../mongo_init').MONGO_URL;
var SSR_DB = require('../mongo_init').MONGO_DB_NAME;
const bodyParser = require('body-parser')

function getCollections(req,res){
    MongoClient.connect(url,{useNewUrlParser:true},function(err, mongo) {
        if(err){
            res.jsonp(500, {'error': JSON.stringify(err) });
            return;
        }
        //var db = mongo.db(SSR_DB);
        //db.runCommand( { listCollections: 1.0, authorizedCollections: true, nameOnly: true } ).find().toArray(function(err,data){
            mongo.close(); 
            //res.end(JSON.stringify(data));
            res.end('Deprecated method');
        //});
      }); 
}

function getCollection(req,res){
    var coll = req.params.coll;
    MongoClient.connect(url,{useNewUrlParser:true},function(err, mongo) {
        if(err){
            res.jsonp(500, {'error': JSON.stringify(err) });
            return;
        }
        var db = mongo.db(SSR_DB);
        db.collection(coll).find({}).toArray(function(err, result) {
            if (err) {
                res.jsonp(404, {'error': JSON.stringify(err) });
                throw err;
            }
            console.log(result);
            mongo.close();
            res.end(JSON.stringify(result),'Document find successfully');
          });
      }); 
}

//get doc by first name
function getDocument(req,res){
    var coll = req.params.coll;
    var doc = req.params.doc;
    MongoClient.connect(url,{useNewUrlParser:true},function(err, mongo) {
        if(err){
            res.jsonp(500, {'error': JSON.stringify(err) });
            return;
        }
        var db = mongo.db(SSR_DB);
        var query = { firstname: doc };
        db.collection(coll).find(query).toArray(function(err, result) {
            if (err) {
                res.jsonp(404, {'error': JSON.stringify(err) });
                throw err;
            }
            console.log(result);
            mongo.close();
            res.end(JSON.stringify(result),'Document find successfully');
          });
      }); 
}


function addDocument(req,res){
    const doc = req.body;
    console.log(doc)
    MongoClient.connect(url,{useNewUrlParser:true},function(err, mongo) {
        if(err){
            res.jsonp(500, {'error': JSON.stringify(err) });
            return;
        }
        var db = mongo.db(SSR_DB);
        db.collection(doc.collection).insertOne(doc.data, function(err) {
            if (err) {
                res.jsonp(500, {'error': JSON.stringify(err) });
                mongo.close();
                throw err;
            }
            console.log("1 document inserted");
            mongo.close(); 
            res.end('Document added successfully');
          }); 
    }); 
}

function addCollection(req,res){
    const coll = req.body.collection;
    console.log(coll)
    MongoClient.connect(url,{useNewUrlParser:true},function(err, mongo) {
        if(err){
            res.jsonp(500, {'error': JSON.stringify(err) });
            return;
        }
        var db = mongo.db(SSR_DB);
        db.createCollection(coll, function(err) {
            if (err) {
                res.jsonp(500, {'error': JSON.stringify(err) });
                mongo.close();
                throw err;
            }
            console.log("Collection created!");
            mongo.close(); 
            res.end('Collection created successfully');
          }); 
    }); 
}

function deleteDocument(req,res){
    var coll = req.body.collection;
    var query = JSON.parse(req.body.query);
    MongoClient.connect(url,{useNewUrlParser:true},function(err, mongo) {
        if(err){
            res.jsonp(500, {'error': JSON.stringify(err) });
            return;
        }
        var db = mongo.db(SSR_DB);
        db.collection(coll).deleteOne(query, function(err, obj) {
            if(err){
                res.jsonp(404, {'error': JSON.stringify(err) });
                throw err;
            } 
          console.log("1 document deleted");
          mongo.close();
           res.end('Document deleted successfully');
        });
    });
}

function deleteCollection(req,res){
    var coll = req.body.collection;
    MongoClient.connect(url,{useNewUrlParser:true},function(err, mongo) {
        if(err){
            res.jsonp(500, {'error': JSON.stringify(err) });
            return;
        }
        var db = mongo.db(SSR_DB);
        db.collection(coll).drop(function(err, delOK) {
            if(err){
                res.jsonp(404, {'error': JSON.stringify(err) });
                throw err;
            } 
            if (delOK) console.log("Collection deleted");
            mongo.close();
            res.end('Collection deleted successfully');
        });
    });
}



function updateDocument(req,res){}
function updateCollection (req,res){}

module.exports = {
    getDocument : getDocument,
    getCollection : getCollection,
    getCollections : getCollections,
    addDocument : addDocument,
    addCollection:addCollection,
    deleteDocument : deleteDocument,
    deleteCollection : deleteCollection,
    updateDocument : updateDocument, 
    updateCollection : updateCollection   
};


