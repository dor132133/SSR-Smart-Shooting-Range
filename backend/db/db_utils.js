
var assert = require('assert');
var MongoClient = require('mongodb').MongoClient;
var url = require('../mongo_init').MONGO_URL;
var SSR_DB = require('../mongo_init').MONGO_DB_NAME;
const bodyParser = require('body-parser')

 /*
 *return: db collection's names in JSON array formate
 *params: none
 */
 function getCollections(req,res){
    MongoClient.connect(url,{useNewUrlParser:true},function(err, mongo) {
        if(err){
            res.status(500).end(err);
            return;
        }
        var db = mongo.db(SSR_DB);
        db.listCollections().toArray(function(error, colls) {
            if(error){
                console.log(error)
                res.status(500).end(error);
                mongo.close();
                return;
            }
            var collNames = colls.map(element =>{
                return element.name;
            })
            console.log(collNames)
            res.end(JSON.stringify(collNames));
            mongo.close();
            return;
        });
      }); 
 }

 /*
 *return: collection's documets in JSON formate
 *params:string GET param: <collection-name>:
 */
function getCollection(req,res){
    var coll = req.params.coll;
    MongoClient.connect(url,{useNewUrlParser:true},function(err, mongo) {
        if(err){
            res.status(500).end(error);
            return;
        }
        var db = mongo.db(SSR_DB);
        db.collection(coll).find({}).toArray(function(error, result) {
            if (error || result.length === 0) {
                res.status(404).end('Error: 404 Not Found, '+ error);
                return;
            }
            console.log(result);
            mongo.close();
            res.end(JSON.stringify(result),'Document find successfully');
          });
      }); 
}

 /*
 *return: list of document-JSON objects matching to query,
 *        sending through request's body.
 *params: JSON query POST request's body.
 *        JSON structure:{collection: "name", data:{field1:"value",field2:"value"...}}
 */
function getDocument(req,res){
    var query = req.body;
    console.log(query);
    if(typeof(query.collection) != 'string' || typeof(query.data) != 'object'){
        res.status(400).end('Error: 400 Bad Request, '+ error);
        console.log('Error: 400 Bad Request');
        return;
    }
    MongoClient.connect(url,{useNewUrlParser:true},function(err, mongo) {
        if(err){
            res.status(500).end(error);
            return;
        }
        var db = mongo.db(SSR_DB);
        db.collection(query.collection).find(query.data).toArray(function(err, result) {
            if (err || result.length === 0) {
                res.status(404).end('Error: 404 Not Found, '+ error);
                return;
            }
            console.log(result);
            mongo.close();
            res.end(JSON.stringify(result),'Document find successfully');
          });
      }); 
}

 /*
 *return: approve/reject of adding document to db.
 *params: JSON document(structure) POST request's body.
 *        JSON structure:{collection: "name", data:{field1:"value",field2:"value"...}}
 */
function addDocument(req,res){
    const doc = req.body;
    console.log(doc)
    if(typeof(doc.collection) != 'string' || typeof(doc.data) != 'object'){
        res.status(400).end('Error: 400 Bad Request, '+ error);
        console.log('params are not strings'); 
        return;
    }
    MongoClient.connect(url,{useNewUrlParser:true},function(err, mongo) {
        if(err){
            res.status(500).end(error);
            return;
        }
        var db = mongo.db(SSR_DB);
        db.listCollections({name: doc.collection}).next(function(err, collinfo) {
            if (!collinfo) {//if collection exist
                console.log('Cannot added document, ' + doc.collection +' collection not found')
                res.status(404).end('Error: Not Found, Cannot added document, ' + doc.collection +' collection not found');
                mongo.close();
                return;
            }
            db.collection(doc.collection).find(doc.data).toArray(function(er, result) {
                if (er) {
                    res.status(500).end(er);
                    return;
                }
                if(result.length !== 0){//if document already exist
                    console.log('Cannot create, document already exist')
                    res.status(409).end('Conflict error: document already exist');
                    mongo.close();
                    return;
                }
                db.collection(doc.collection).insertOne(doc.data, function(error) {
                    if (error) {
                        res.status(400).end('Error: 400 Bad Request, '+ error);
                        mongo.close();
                        return;
                    }
                    console.log("1 document inserted to " + doc.collection);
                    mongo.close(); 
                    res.end('Document added successfully to ' + doc.collection);
                });
            }); 
        })
    }); 
} 

 /*
 *return: approve/reject of creating collection in db.
 *        if collection exist return: "conflict 409"
 *params: JSON POST request's body.
 *        JSON structure:{collection: "name", schema:{field1:"value",field2:"value"...}}
 */
function addCollection(req,res){
    const collName = req.body.collection;
    var schema = req.body.schema;
    console.log(collName);
    console.log(schema);
    // try {
    //     JSON.parse(schema);
    // } catch (err) {
    //     res.jsonp(400, {'Error: 400 Bad Request, invalid collection structure': JSON.stringify(err) });
    //     return;
    // }
    MongoClient.connect(url,{useNewUrlParser:true},function(err, mongo) {
        if(err){
            res.status(500).end(error);
            return;
        }
        var db = mongo.db(SSR_DB);
        db.listCollections({name: collName}).next(function(err, collinfo) {
            if (collinfo) {//if collection exist
                console.log('Cannot create, collection already exist')
                res.status(409).end('Conflict error: collection already exist');
                mongo.close();
                return;
            }
            db.createCollection(collName, function(err) {
                if (err) {
                    res.status(500).end(err);
                    mongo.close();
                    return;
                }
                //add first document - prevent future errors
                db.collection(collName).insertOne({empty : ""}, function(error) {
                    if (error) {
                        res.status(400).end('Error: 400 Bad Request, '+ error);
                        mongo.close();
                        return;
                    }
                    console.log(collName + " collection created!");
                    mongo.close(); 
                    res.end(collName + ' collection created successfully');
                }); 
            }); 
        });
    }); 
}

 /*
 *return: approve/reject of deleting the first match by query.
 *params: JSON POST request's body.
 *        JSON structure:{collection: "name", data:{field1:"value",field2:"value"...}}
 */
function deleteDocument(req,res){
    var doc = req.body;
    console.log(req.body)
    MongoClient.connect(url,{useNewUrlParser:true},function(err, mongo) {
        if(err){
            res.status(500).end(err);
            return;
        }
        var db = mongo.db(SSR_DB);
        db.collection(doc.collection).find(doc.data).toArray(function(er, result) {
            if (er) {
                res.status(500).end(er);
                return;
            }
            if(result.length === 0){//if document already exist
                console.log('Cannot delete, document doesn\'t exist')
                res.status(404).end('Error: 404 Not Found, '+ er);
                mongo.close();
                return;
            }
            db.collection(doc.collection).deleteOne(doc.data, function(error, obj) {
                if(error){
                    res.status(404).end('Error: 404 Not Found, '+ error);
                    return;
                } 
                console.log("1 document deleted");
                mongo.close();
                res.end('Document deleted successfully');
            });
        });
    });
    
}

 /*
 *return: approve/reject of delete existing collection.
 *params: JSON POST request's body.
 *        JSON structure:{collection: "name"}
 */
function deleteCollection(req,res){
    var coll = req.body.collection;
    console.log(coll)
    if(typeof(coll) != 'string'){
        rres.status(400).end('Error: 400 Bad Request, '+ error);
        console.log('Error: 400 Bad Request');
        return;
    }
    MongoClient.connect(url,{useNewUrlParser:true},function(err, mongo) {
        if(err){
            res.status(500).end(error);
            return;
        }
        var db = mongo.db(SSR_DB);
        db.collection(coll).drop(function(error, delOK) {
            if(error || !delOK){
                res.status(404).end('Error: 404 Not Found, '+ error);
                return;
            } 
            console.log("Collection deleted");
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


