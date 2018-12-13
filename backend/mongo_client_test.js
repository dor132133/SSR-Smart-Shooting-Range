




var assert = require('assert');
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://172.17.0.2:27017/db';
warriorsCollectionFields = { 
    capped: true,
    size: 5242880, //maximum size of 5 megabytes
    max: 70000, //maximum of 5000 documents
    // validator: { $jsonSchema: {
    //                 bsonType: "object",
    //                 required: [ "firstName","lastname"], //required mean a must given field.
    //                 properties: {
    //                     firstName: {
    //                         bsonType: "string",
    //                         description: "must be a string and is required"
    //                     },
    //                     lastName: {
    //                         bsonType: "string",
    //                         description: "must be a string and is required"
    //                     },
    //                     age: {
    //                         bsonType: "double",
    //                         description: "must be a double"
    //                     },
    //                     jobType: {
    //                         enum: require('./enum').JOB_TYPES_ENUM,
    //                         description: "can only be one of the enum values"
    //                     },
    //                     team: {
    //                         enum: require('./enum').TEAMS_ENUM,
    //                         description: "can only be one of the enum values"
    //                     },
    //                     picture: {
    //                         jobType: 'object',
    //                         description: "must be an object"
    //                     },
    //                     rate: {
    //                         bsonType: "int",
    //                         minimum: 1,
    //                         maximum: 10,
    //                         description: "must be an integer in [ 1, 10 ]"
    //                     }

    //                 }
    //         //for more information : https://docs.mongodb.com/manual/core/schema-validation/
    //         }
    //    }
    //storageEngine: <document>,
    //validationLevel: <string>,
    //validationAction: <string>,
    //indexOptionDefaults: <document>,
    //viewOn: <string>,
    //pipeline: <pipeline>,
   // collation: <document>,
    //writeConcern: <document>
} 

MongoClient.connect(url,{ useNewUrlParser: true }, function(err, _db) {
  assert.equal(null, err);
  console.log('Successfully connected');
  var db = _db.db("mydb");
  db.createCollection('warriorsCollenction', warriorsCollectionFields,function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
    _db.close();
    });
});
//   for (var i = 1; i <= 15; i++) {
//     db.collection('testCollection').insertOne( { x : i } )
//   }

