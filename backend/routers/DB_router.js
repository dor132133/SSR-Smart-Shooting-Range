

var express = require('express');
var router = express.Router();
var db = require('../db/db_utils');


router.get('/collection/:coll',db.getCollection);
router.get('/collections',db.getCollections);
router.get('/document/:coll:doc',db.addDocument);
router.post('/document',db.addDocument);
// router.get('/document',db.getPersonsByAge);
// router.post('/addDocument/',db.addPerson);



module.exports = router;