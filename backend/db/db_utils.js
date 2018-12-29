
var assert = require('assert');
var MongoClient = require('mongodb').MongoClient;
var url = require('../mongo_init').MONGO_URL;
var SSR_DB = require('../mongo_init').MONGO_DB_NAME;
const bodyParser = require('body-parser')

 function getCollections(req,res){
//     MongoClient.connect(url,{useNewUrlParser:true},function(err, mongo) {
//         if(err){
//             res.jsonp(500, {'error': JSON.stringify(err) });
//             return;
//         }
//         //var db = mongo.db(SSR_DB);
//         //db.runCommand( { listCollections: 1.0, authorizedCollections: true, nameOnly: true } ).find().toArray(function(err,data){
//             mongo.close(); 
//             //res.end(JSON.stringify(data));
//             res.end('Deprecated method');
//         //});
//       }); 
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
            if (err || result.length === 0) {
                res.jsonp(404, {'Error: 404 Not Found': JSON.stringify(err) });
                return;
            }
            console.log(result);
            mongo.close();
            res.end(JSON.stringify(result),'Document find successfully');
          });
      }); 
}

//get doc by first name
function getDocument(req,res){
    var query = req.body;
    console.log(query);
    if(typeof(query.collection) != 'string' || typeof(query.data) != 'object'){
        res.end('Error: 400 Bad Request');
        console.log('Error: 400 Bad Request');
        return;
    }
    MongoClient.connect(url,{useNewUrlParser:true},function(err, mongo) {
        if(err){
            res.jsonp(500, {'error': JSON.stringify(err) });
            return;
        }
        var db = mongo.db(SSR_DB);
        db.collection(query.collection).find(query.data).toArray(function(err, result) {
            if (err || result.length === 0) {
                res.jsonp(404, {'Error: 404 Not Found': JSON.stringify(err) });
                return;
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
    if(typeof(doc.collection) != 'string' || typeof(doc.data) != 'object'){
        res.end('Error: 400 Bad Request');
        console.log('Error: 400 Bad Request');
        return;
    }
    MongoClient.connect(url,{useNewUrlParser:true},function(err, mongo) {
        if(err){
            res.jsonp(500, {'error': JSON.stringify(err) });
            return;
        }
        var db = mongo.db(SSR_DB);
        db.collection(doc.collection).insertOne(doc.data, function(error) {
            if (error) {
                res.jsonp(400, {'Error: 400 Bad Request': JSON.stringify(error) });
                mongo.close();
                return;
            }
            console.log("1 document inserted");
            mongo.close(); 
            res.end('Document added successfully');
          }); 
    }); 
} 

function addCollection(req,res){
    const coll = req.body.collection;
    var schema = req.body.schema;
    console.log(coll);
    console.log(schema);
    // try {
    //     JSON.parse(schema);
    // } catch (err) {
    //     res.jsonp(400, {'Error: 400 Bad Request, invalid collection structure': JSON.stringify(err) });
    //     return;
    // }
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
                return;
            }
            //add first document - prevent future errors
            db.collection(coll).insertOne({empty : ""}, function(error) {
                if (error) {
                    res.jsonp(400, {'Error: 400 Bad Request': JSON.stringify(error) });
                    mongo.close();
                    return;
                }
                console.log("Collection created!");
                mongo.close(); 
                res.end('Collection created successfully');
            }); 
          }); 
    }); 
}

function deleteDocument(req,res){
    var coll = req.body.collection;
    var query = req.body.data;
    console.log(req.body)
    MongoClient.connect(url,{useNewUrlParser:true},function(err, mongo) {
        if(err){
            res.jsonp(500, {'error': JSON.stringify(err) });
            return;
        }
        var db = mongo.db(SSR_DB);
        db.collection(coll).deleteOne(query, function(err, obj) {
            if(err){
                res.jsonp(404, {'error': JSON.stringify(err) });
                return;
            } 
          console.log("1 document deleted");
          mongo.close();
           res.end('Document deleted successfully');
        });
    });
    
}

function deleteCollection(req,res){
    var coll = req.body.collection;
    console.log(coll)
    if(typeof(coll) != 'string'){
        res.end('Error: 400 Bad Request');
        console.log('Error: 400 Bad Request');
        return;
    }
    MongoClient.connect(url,{useNewUrlParser:true},function(err, mongo) {
        if(err){
            res.jsonp(500, {'error': JSON.stringify(err) });
            return;
        }
        var db = mongo.db(SSR_DB);
        db.collection(coll).drop(function(err, delOK) {
            if(err){
                res.jsonp(404, {'error': JSON.stringify(err) });
                return;
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


