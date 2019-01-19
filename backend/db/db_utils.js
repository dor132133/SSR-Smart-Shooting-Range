
var MongoClient = require('mongodb').MongoClient;
var url = require('../mongo_init').MONGO_URL;
var SSR_DB = require('../mongo_init').MONGO_DB_NAME;
var ObjectId = require('mongodb').ObjectID;

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
            res.status(500).end(err);
            return;
        }
        var db = mongo.db(SSR_DB);
        db.collection(coll).find({}).toArray(function(error, result) {
            if (error || result.length === 0) {
                res.status(404).end('Error: 404 Not Found Or Collection its Empty, '+ error);
                return;
            }
            console.log(coll + ': ')
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
        res.status(400).end('Error: 400 Bad Request');
        console.log('Error: 400 Bad Request');
        return;
    }
    MongoClient.connect(url,{useNewUrlParser:true},function(err, mongo) {
        if(err){
            res.status(500).end(err);
            return;
        }
        var db = mongo.db(SSR_DB);
        //console.log(query.data._id)
        if(query.data._id !== undefined){//fix comparing string to ObjectId string
            query.data._id = ObjectId(query.data._id)
        }
        db.collection(query.collection).findOne(query.data, function(err, result) {
            if (err) {
                res.status(404).end('Error: 404 Not Found, '+ err);
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
        res.status(400).end('Error: 400 Bad Request');
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
        // if(doc.data._id !== undefined){//fix comparing string to ObjectId string
        //     doc.data = { _id:ObjectId(doc.data._id)}
        // }
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
        rres.status(400).end('Error: 400 Bad Request');
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

 /*
 *return: approve/reject of update existing document.
 *params: JSON POST request's body.
 *        JSON structure:{collection: "name" 
 *                        data: {origin :{field1:"value",field2:"value"...},
 *                               new: {field1:"value",field2:"value"...}
 *                              }
 *                       }
 */
function updateDocument(req,res){
    const doc = req.body;
    console.log(doc)
    if(typeof(doc.collection) != 'string' || typeof(doc.data) != 'object'){
        res.status(400).end('Error: 400 Bad Request');
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
            if(doc.data.origin._id !== undefined && doc.data.new._id !== undefined){//fix comparing string to ObjectId string
                doc.data.origin._id = ObjectId(doc.data.origin._id)
                doc.data.new._id = ObjectId(doc.data.new._id)
            }
            db.collection(doc.collection).find(doc.data.origin).toArray(function(er, result) {
                if (er) {
                    res.status(500).end(er);
                    return;
                }
                if(result.length == 0){//if document doesn't exist
                    console.log('Cannot update, document does not exist')
                    res.status(409).end('Conflict error: document does not exist');
                    mongo.close();
                    return;
                }
                update = { $set : doc.data.new}
                db.collection(doc.collection).updateOne(doc.data.origin,update, function(error) {
                    if (error) {
                        res.status(400).end('Error: 400 Bad Request, '+ error);
                        mongo.close();
                        return;
                    }
                    console.log("1 document updated in " + doc.collection);
                    mongo.close(); 
                    res.end('Document successfully updated in ' + doc.collection);
                });
            }); 
        })
    }); 
}


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


