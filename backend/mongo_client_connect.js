

// module database.js


// var db;
// var error;
// var waiting = []; // Callbacks waiting for the connection to be made
//MongoClient.connect(url, { useNewUrlParser: true })
// MongoClient.connect(url,{ useNewUrlParser: true },function(err,database){
//   error = err;
//   db = database;

//   waiting.forEach(function(callback) {
//     callback(err, database);
//   });
// });

// module.exports = function(callback) {
//   if (db || error) {
//     callback(error, db);
//   } else {
//     console.log('MongoClient successfully connect!')
//     waiting.push(callback);
//   }
// }

// (async function() {
//   try {

//     const client = await MongoClient.connect(url,{ useNewUrlParser: true },function(err,db){
//       for (var i = 1; i <= 15; i++) {
//           MongoClient.db.testData.insert( { x : i } )
//       }
//     });
//     // ... anything

//     client.close();
//   } catch(e) {
//     console.error(e)
//   }

// })()

// MongoClient.connect(url,{ useNewUrlParser: true }, function(err, db) {
//   assert.equal(null, err);
//   findWarriors(db, function(data){ 
//     db.close(); 
//     res.end(JSON.stringify(data));
//    });
// }); 

// //get all warriors 
// var findWarriors = function(db, callback) {
//   var cursor = db.collection('warrior').find();
//      cursor.toArray(function(err, items) {
//     console.log(items);
//     callback(items);
//     });
//   };
