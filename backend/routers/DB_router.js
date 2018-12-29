

var express = require('express');
var router = express.Router();
var db = require('../db/db_utils');


router.get('/collections',db.getCollections);
router.get('/collection/:coll',db.getCollection);
router.post('/document',db.getDocument);
router.post('/add/document',db.addDocument);
router.post('/add/collection',db.addCollection);
router.put('/delete/document',db.deleteDocument);
router.put('/delete/collection',db.deleteCollection);
router.put('/update/document',db.updateDocument);
router.put('/update/collection',db.updateCollection);

 
module.exports = router;